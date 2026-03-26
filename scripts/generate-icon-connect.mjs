import * as lucide from '../node_modules/lucide-react/dist/esm/lucide-react.js'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Read Figma metadata from cached file
const metadataPath = '/Users/lwiggins/Library/Application Support/Code/User/workspaceStorage/a3433c882e2937fef3771997ecafb2b4/GitHub.copilot-chat/chat-session-resources/c2c3e0b6-b1c7-4326-a8a8-f047dc29f417/toolu_bdrk_01Nw9Ss4NKQMxWN3wxVySroT__vscode-1774535430396/content.txt'
const metadata = readFileSync(metadataPath, 'utf8')

// Extract all symbol id + name pairs
const symbolRe = /<symbol id="([^"]+)" name="([^"]+)"/g
const icons = []
let m
while ((m = symbolRe.exec(metadata)) !== null) {
  icons.push({ id: m[1], name: m[2] })
}

console.error(`Found ${icons.length} icons in Figma metadata`)

// Convert kebab-case to PascalCase
function toPascal(name) {
  return name.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('')
}

// Partition into found/missing
const found = []
const missing = []
for (const icon of icons) {
  const pascal = toPascal(icon.name)
  if (lucide[pascal]) {
    found.push({ ...icon, pascal })
  } else {
    missing.push({ ...icon, pascal })
  }
}

console.error(`Matched: ${found.length} | Missing from lucide-react: ${missing.length}`)
if (missing.length > 0) {
  console.error('Missing:', missing.map(i => i.name).join(', '))
}

const FILE_KEY = 'E8jkfAtko959z87GfJQN4Y'
const BASE = `https://www.figma.com/design/${FILE_KEY}/FitTrack-DS`

const CHUNK_SIZE = 200

// Split found icons into chunks and write separate files
const chunks = []
for (let i = 0; i < found.length; i += CHUNK_SIZE) {
  chunks.push(found.slice(i, i + CHUNK_SIZE))
}

// Remove old single file if it exists
import { existsSync, unlinkSync } from 'fs'
const oldPath = join(__dirname, '../figma/Icons.figma.tsx')
if (existsSync(oldPath)) unlinkSync(oldPath)

for (let ci = 0; ci < chunks.length; ci++) {
  const chunk = chunks[ci]
  const chunkPascals = [...new Set(chunk.map(i => i.pascal))].sort()

  const imports = `import figma from '@figma/code-connect'\nimport {\n${chunkPascals.map(p => `  ${p},`).join('\n')}\n} from 'lucide-react'\n`

  const connects = chunk.map(({ id, pascal }) => {
    const nodeId = id.replace(':', '-')
    return `figma.connect(${pascal}, '${BASE}?node-id=${nodeId}', { example: () => <${pascal} /> })`
  }).join('\n')

  const output = `${imports}\n${connects}\n`
  const outPath = join(__dirname, `../figma/Icons.${String(ci + 1).padStart(2, '0')}.figma.tsx`)
  writeFileSync(outPath, output)
  console.error(`Written chunk ${ci + 1}/${chunks.length} (${chunk.length} icons) → ${outPath}`)
}
