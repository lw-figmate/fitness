#!/usr/bin/env node
/**
 * figma-drift.ts
 *
 * Detects drift between Figma component variants and TypeScript prop types.
 *
 * Usage:
 *   npm run drift              — report only
 *   npm run drift:fix          — report + auto-patch TypeScript types
 *
 * How it works:
 *   1. Parses every figma/*.figma.tsx Code Connect file for:
 *        - Figma file key + node ID (from the connect URL)
 *        - Prop name mappings (from figma.enum('Prop', { figmaVal: 'codeVal' }))
 *        - Value aliases (wherever figmaVal !== codeVal)
 *   2. Fetches live variant options from the Figma REST API
 *   3. Reads TypeScript source files to parse union type values
 *   4. Reports anything that diverges after applying aliases
 *   5. With --fix: patches the TypeScript type to add missing values
 *
 * The only file outside the .figma.tsx files that needs updating when a new
 * component is added is figma-type-map.ts — which holds the TypeScript type
 * names used by --fix mode (the one thing Code Connect doesn't encode).
 */

import fs from 'fs'
import path from 'path'
import https from 'https'
import { typeMap } from './figma-type-map.js'

const FIGMA_TOKEN = process.env.FIGMA_TOKEN
if (!FIGMA_TOKEN) {
  console.error('Error: FIGMA_TOKEN environment variable is not set.')
  console.error('Usage: FIGMA_TOKEN=<your-token> npm run drift')
  process.exit(1)
}
const ROOT        = path.resolve(import.meta.dirname, '..')
const FIGMA_DIR   = path.join(ROOT, 'figma')
const FIX_MODE    = process.argv.includes('--fix')

// ─── Code Connect file parser ─────────────────────────────────────────────────

interface EnumProp {
  /** The React prop name (key in the `props: {}` block) */
  codeProp: string
  /** The Figma variant property name (first arg to figma.enum()) */
  figmaProp: string
  /**
   * Only entries where figmaValue !== codeValue.
   * Keys are Figma variant values; values are code-side values.
   * Entries with undefined or numeric code values are excluded (not string enums).
   */
  aliases: Record<string, string>
}

interface ParsedComponent {
  name: string          // Component name (default export)
  sourceFile: string    // Relative to project root, with .tsx extension
  fileKey: string       // Figma file key extracted from the connect URL
  figmaNodeId: string   // e.g. '36:58'
  enumProps: EnumProp[]
}

function parseFigmaConnectFile(filePath: string): ParsedComponent | null {
  const src = fs.readFileSync(filePath, 'utf8')

  // Default import: component name and source file path
  const importMatch = src.match(/^import (\w+) from '(\.\.\/src\/[^']+)'/m)
  if (!importMatch) return null
  const name = importMatch[1]
  const sourceFile = importMatch[2].replace('../', '') + '.tsx'

  // Figma file key and node ID from the figma.connect() URL
  const urlMatch = src.match(/figma\.com\/design\/([^/]+)\/[^?]+\?node-id=([\d]+-[\d]+)/)
  if (!urlMatch) return null
  const fileKey     = urlMatch[1]
  const figmaNodeId = urlMatch[2].replace('-', ':')

  // figma.enum('FigmaPropName', { ... }) calls inside the props block
  // [^}]+ safely matches newlines since it's a negated character class, not .
  const enumRegex = /(\w+):\s*figma\.enum\(\s*'([^']+)'\s*,\s*\{([^}]+)\}\s*\)/g
  const enumProps: EnumProp[] = []

  for (const match of src.matchAll(enumRegex)) {
    const [, codeProp, figmaProp, body] = match

    const aliases: Record<string, string> = {}
    // Parse each `key: 'value'` pair — skip undefined and numeric values
    for (const vm of body.matchAll(/(\w+):\s*(?:'([^']*)'|(undefined)|(-?\d+))/g)) {
      const [, figmaVal, codeStr, isUndef, isNum] = vm
      if (isNum !== undefined || isUndef !== undefined) continue
      if (figmaVal !== codeStr) aliases[figmaVal] = codeStr
    }

    enumProps.push({ codeProp, figmaProp, aliases })
  }

  return { name, sourceFile, fileKey, figmaNodeId, enumProps }
}

function loadAllComponents(): ParsedComponent[] {
  return fs.readdirSync(FIGMA_DIR)
    .filter(f => f.endsWith('.figma.tsx'))
    .map(f => parseFigmaConnectFile(path.join(FIGMA_DIR, f)))
    .filter((c): c is ParsedComponent => c !== null)
}

// ─── Figma REST helper ────────────────────────────────────────────────────────

function figmaGet(endpoint: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.figma.com',
      path: `/v1/${endpoint}`,
      headers: { 'X-Figma-Token': FIGMA_TOKEN },
    }
    https.get(options, (res) => {
      let data = ''
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => {
        try { resolve(JSON.parse(data)) }
        catch (e) { reject(e) }
      })
    }).on('error', reject)
  })
}

// ─── TypeScript source parser ─────────────────────────────────────────────────

/**
 * Extracts the member values from a TypeScript union type declaration.
 * Handles both single-line and multi-line formats:
 *   export type Foo = 'a' | 'b' | 'c'
 *   export type Foo =
 *     | 'a'
 *     | 'b'
 */
function parseTypeValues(filePath: string, typeName: string): string[] | null {
  const src = fs.readFileSync(filePath, 'utf8')

  // Match the type declaration through to the end of the union
  const pattern = new RegExp(
    `export type ${typeName}\\s*=[\\s\\S]*?(?=\\n\\nexport|\\n[^\\/\\s'|]|$)`,
    'g'
  )
  const match = src.match(pattern)
  if (!match) return null

  // Extract all single-quoted values
  const values = [...match[0].matchAll(/'([^']+)'/g)].map(m => m[1])
  return values.length ? values : null
}

// ─── Figma component node fetcher ────────────────────────────────────────────

interface FigmaVariantProp {
  type: string
  variantOptions?: string[]
}

async function getFigmaVariantProps(
  fileKey: string,
  nodeId: string
): Promise<Record<string, FigmaVariantProp>> {
  const id = nodeId.replace(':', '-')
  const data = await figmaGet(`files/${fileKey}/nodes?ids=${id}&depth=1`) as {
    nodes: Record<string, { document: { componentPropertyDefinitions?: Record<string, FigmaVariantProp> } }>
  }
  const node = data.nodes[nodeId] ?? data.nodes[id]
  return node?.document?.componentPropertyDefinitions ?? {}
}

// ─── Drift report types ───────────────────────────────────────────────────────

type Severity = 'drift' | 'alias' | 'code-only'

interface DriftItem {
  component: string
  figmaProp: string
  codeProp: string
  severity: Severity
  description: string
  figmaValues?: string[]
  codeValues?: string[]
  missingInCode?: string[]
  missingInFigma?: string[]
  aliases?: Record<string, string>
  patch?: { file: string; typeName: string; addValues: string[] }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function run() {
  console.log('\n🔍  FitTrack DS — Figma ↔ Code Drift Analysis')
  console.log('═'.repeat(56))
  if (FIX_MODE) console.log('⚙️   FIX MODE: TypeScript types will be patched\n')
  else console.log('   (run with --fix to auto-patch TypeScript types)\n')

  const components = loadAllComponents()
  const allDrift: DriftItem[] = []
  const clean: string[] = []

  for (const comp of components) {
    const figmaProps = await getFigmaVariantProps(comp.fileKey, comp.figmaNodeId)

    for (const ep of comp.enumProps) {
      const figmaDef = figmaProps[ep.figmaProp]
      if (!figmaDef || figmaDef.type !== 'VARIANT') continue

      const figmaValues = figmaDef.variantOptions ?? []

      // Look up the TypeScript type for this prop (needed for parsing + patching)
      const typeInfo = typeMap[comp.name]?.[ep.codeProp]
      if (!typeInfo) continue  // no patchable type registered — skip

      const codeFile   = path.join(ROOT, typeInfo.file)
      const codeValues = parseTypeValues(codeFile, typeInfo.typeName)
      if (!codeValues) {
        allDrift.push({
          component: comp.name, figmaProp: ep.figmaProp, codeProp: ep.codeProp,
          severity: 'code-only',
          description: `Could not parse type "${typeInfo.typeName}" from ${typeInfo.file}`,
        })
        continue
      }

      // Apply aliases: map Figma values to code-side equivalents, deduplicating
      const resolvedSet    = new Set(figmaValues.map(v => ep.aliases[v] ?? v).filter(Boolean))
      const codeSet        = new Set(codeValues)
      const missingInCode  = [...resolvedSet].filter(v => !codeSet.has(v))
      const missingInFigma = [...codeSet].filter(v => !resolvedSet.has(v))
      const hasAliases     = Object.keys(ep.aliases).length > 0

      if (missingInCode.length === 0 && missingInFigma.length === 0) {
        clean.push(`${comp.name}.${ep.codeProp}`)
        continue
      }

      const item: DriftItem = {
        component: comp.name,
        figmaProp: ep.figmaProp,
        codeProp:  ep.codeProp,
        severity:  hasAliases && missingInCode.length === 0 ? 'alias' : 'drift',
        description: '',
        figmaValues,
        codeValues,
        missingInCode,
        missingInFigma,
        aliases: ep.aliases,
      }

      if (missingInCode.length > 0) {
        item.patch = { file: typeInfo.file, typeName: typeInfo.typeName, addValues: missingInCode }
      }

      allDrift.push(item)
    }
  }

  // ─── Output ──────────────────────────────────────────────────────────────────

  if (clean.length > 0) {
    console.log(`✅  In sync (${clean.length}):`)
    clean.forEach(c => console.log(`    ${c}`))
    console.log()
  }

  if (allDrift.length === 0) {
    console.log('🎉  No drift detected — Figma and code are fully in sync!\n')
    return
  }

  const driftItems = allDrift.filter(d => d.severity === 'drift')
  const aliasItems = allDrift.filter(d => d.severity === 'alias')
  const onlyItems  = allDrift.filter(d => d.severity === 'code-only')

  if (driftItems.length > 0) {
    console.log(`❌  Real drift (${driftItems.length} props need attention):`)
    for (const d of driftItems) {
      console.log(`\n    ${d.component}.${d.codeProp}`)
      if (d.missingInCode?.length)  console.log(`      In Figma but not code : ${d.missingInCode.join(', ')}`)
      if (d.missingInFigma?.length) console.log(`      In code but not Figma : ${d.missingInFigma.join(', ')}`)
      if (d.patch) console.log(`      → Auto-patchable: add [${d.patch.addValues.join(', ')}] to ${d.patch.typeName}`)
    }
    console.log()
  }

  if (aliasItems.length > 0) {
    console.log(`⚠️   Intentional aliases (${aliasItems.length}) — Figma name ≠ code name:`)
    for (const d of aliasItems) {
      const aliasStr = Object.entries(d.aliases ?? {}).map(([f, c]) => `"${f}" → "${c}"`).join(', ')
      console.log(`    ${d.component}.${d.codeProp}: ${aliasStr}`)
    }
    console.log()
  }

  if (onlyItems.length > 0) {
    console.log(`ℹ️   Other notes (${onlyItems.length}):`)
    onlyItems.forEach(d => console.log(`    ${d.component}.${d.codeProp}: ${d.description}`))
    console.log()
  }

  // ─── Auto-patch mode ─────────────────────────────────────────────────────

  if (FIX_MODE) {
    const patchable = driftItems.filter(d => d.patch)
    if (patchable.length === 0) {
      console.log('ℹ️   Nothing to auto-patch (all drift requires manual reconciliation).\n')
      return
    }

    console.log(`🔧  Patching ${patchable.length} TypeScript type(s)…\n`)

    for (const d of patchable) {
      const { file, typeName, addValues } = d.patch!
      const filePath = path.join(ROOT, file)
      let src = fs.readFileSync(filePath, 'utf8')

      // Find the type declaration and append the new values
      const pattern = new RegExp(`(export type ${typeName}\\s*=[\\s\\S]*?)(?=\\n\\nexport|\\nconst|\\ninterface|$)`)
      const typeMatch = src.match(pattern)
      if (!typeMatch) {
        console.log(`  ⚠  Could not locate type "${typeName}" in ${file} — skipping`)
        continue
      }

      const original = typeMatch[1]
      const newValues = addValues.map(v => `  | '${v}'`).join('\n')

      // Check if type is single-line or multi-line and format accordingly
      const isSingleLine = !original.includes('\n  |')
      let patched: string

      if (isSingleLine) {
        // 'a' | 'b' → 'a' | 'b' | 'new'
        patched = original.trimEnd() + addValues.map(v => ` | '${v}'`).join('')
      } else {
        // Multi-line: append before closing newline
        patched = original.trimEnd() + '\n' + newValues
      }

      src = src.replace(original, patched)
      fs.writeFileSync(filePath, src)
      console.log(`  ✅  ${typeName} in ${file}`)
      console.log(`      Added: ${addValues.map(v => `'${v}'`).join(', ')}`)
    }

    console.log('\n  Run `npx tsc --noEmit` to verify the patches compile correctly.\n')
  }
}

run().catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})
