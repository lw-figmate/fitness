/**
 * Figma ↔ Code Component Manifest
 * 
 * Each entry declares which Figma component set maps to which source file,
 * and maps Figma variant property names → code prop names + value aliases.
 *
 * When Figma renames a variant or adds a new value, running `npm run drift`
 * will surface the mismatch. Running `npm run drift:fix` patches the source.
 */

export interface PropMapping {
  /** The property key as it appears in Figma's component set */
  figmaProp: string
  /** The TypeScript prop name in the React component */
  codeProp: string
  /**
   * Any value aliases where Figma name ≠ code name.
   * E.g. Figma uses "filled" but code uses "solid".
   * Keys are Figma values, values are code-side values.
   * Omit if names match 1:1 (case-insensitive).
   */
  aliases?: Record<string, string>
  /** TypeScript type name that lists all valid values (for auto-patching) */
  codeTypeName?: string
  /** File that defines the TypeScript type */
  codeTypeFile?: string
}

export interface ComponentManifestEntry {
  /** Human-readable component name */
  name: string
  /** Figma component set node ID */
  figmaNodeId: string
  /** Path to the React source component (relative to project root) */
  codeFile: string
  /** Prop mappings between Figma ↔ code */
  props: PropMapping[]
}

const FILE_KEY = 'E8jkfAtko959z87GfJQN4Y'
const figmaUrl = (nodeId: string) =>
  `https://www.figma.com/design/${FILE_KEY}/FitTrack-DS?node-id=${nodeId.replace(':', '-')}`

export const manifest: ComponentManifestEntry[] = [
  {
    name: 'Button',
    figmaNodeId: '36:58',
    codeFile: 'src/components/ui/Button/Button.tsx',
    props: [
      {
        figmaProp: 'Variant',
        codeProp: 'variant',
        codeTypeName: 'ButtonVariant',
        codeTypeFile: 'src/components/ui/Button/Button.tsx',
        // Figma 'warning' maps to code 'primary' (no warning variant exists) — intentional alias
        aliases: { warning: 'primary' },
      },
      {
        figmaProp: 'Size',
        codeProp: 'size',
        codeTypeName: 'ButtonSize',
        codeTypeFile: 'src/components/ui/Button/Button.tsx',
        // Figma 'xs' maps to code 'sm' — intentional collapse
        aliases: { xs: 'sm' },
      },
    ],
  },
  {
    name: 'Badge',
    figmaNodeId: '38:134',
    codeFile: 'src/components/ui/Badge/Badge.tsx',
    props: [
      {
        figmaProp: 'Variant',
        codeProp: 'variant',
        codeTypeName: 'BadgeVariant',
        codeTypeFile: 'src/components/ui/Badge/Badge.tsx',
      },
      {
        figmaProp: 'Size',
        codeProp: 'size',
        codeTypeName: 'BadgeSize',
        codeTypeFile: 'src/components/ui/Badge/Badge.tsx',
      },
      {
        figmaProp: 'Appearance',
        codeProp: 'appearance',
        codeTypeName: 'BadgeAppearance',
        codeTypeFile: 'src/components/ui/Badge/Badge.tsx',
        // DRIFT: Figma uses 'filled'/'outline', code uses 'solid'/'subtle'
        // These are semantic aliases — intentional design/code naming divergence
        aliases: { filled: 'solid', outline: 'subtle' },
      },
    ],
  },
  {
    name: 'Avatar',
    figmaNodeId: '41:68',
    codeFile: 'src/components/ui/Avatar/Avatar.tsx',
    props: [
      {
        figmaProp: 'Size',
        codeProp: 'size',
        codeTypeName: 'AvatarSize',
        codeTypeFile: 'src/components/ui/Avatar/Avatar.tsx',
        // Figma uses '2xl', code uses 'xxl' — alias
        aliases: { '2xl': 'xxl' },
      },
      {
        figmaProp: 'Status',
        codeProp: 'status',
        codeTypeName: 'AvatarStatus',
        codeTypeFile: 'src/components/ui/Avatar/Avatar.tsx',
        // Figma has 'none' (no status indicator), code omits the prop instead
        aliases: { none: '' },
      },
    ],
  },
  {
    name: 'Progress',
    figmaNodeId: '40:102',
    codeFile: 'src/components/ui/Progress/Progress.tsx',
    props: [
      {
        figmaProp: 'Color',
        codeProp: 'color',
        codeTypeName: 'ProgressColor',
        codeTypeFile: 'src/components/ui/Progress/Progress.tsx',
      },
      {
        figmaProp: 'Size',
        codeProp: 'size',
        codeTypeName: 'ProgressSize',
        codeTypeFile: 'src/components/ui/Progress/Progress.tsx',
      },
    ],
  },
  {
    name: 'Card',
    figmaNodeId: '42:52',
    codeFile: 'src/components/ui/Card/Card.tsx',
    props: [
      {
        figmaProp: 'Variant',
        codeProp: 'variant',
        codeTypeName: 'CardVariant',
        codeTypeFile: 'src/components/ui/Card/Card.tsx',
        // Figma uses 'muted'/'brand', code uses 'ghost'/'filled' — REAL DRIFT
        // No intentional alias — these need to be reconciled
        aliases: { muted: 'ghost', brand: 'filled' },
      },
    ],
  },
  {
    name: 'Input',
    figmaNodeId: '43:41',
    codeFile: 'src/components/ui/Input/Input.tsx',
    props: [
      {
        figmaProp: 'Size',
        codeProp: 'size',
        codeTypeName: 'InputSize',
        codeTypeFile: 'src/components/ui/Input/Input.tsx',
      },
      {
        figmaProp: 'State',
        codeProp: 'state',
        codeTypeName: 'InputState',
        codeTypeFile: 'src/components/ui/Input/Input.tsx',
        // Figma has 'focus' interactive state; code uses 'success' for validation
        // REAL DRIFT: code is missing 'focus' state; Figma is missing 'success'
        aliases: { focus: 'default' },
      },
    ],
  },
  {
    name: 'Modal',
    figmaNodeId: '44:72',
    codeFile: 'src/components/ui/Modal/Modal.tsx',
    props: [
      {
        figmaProp: 'Size',
        codeProp: 'size',
        codeTypeName: 'ModalSize',
        codeTypeFile: 'src/components/ui/Modal/Modal.tsx',
        // Figma has 'xs', code has 'fullscreen' — REAL DRIFT on both ends
        aliases: { xs: 'sm' },
      },
    ],
  },
  {
    name: 'WorkoutCard',
    figmaNodeId: '45:74',
    codeFile: 'src/components/fitness/WorkoutCard/WorkoutCard.tsx',
    props: [
      {
        figmaProp: 'Category',
        codeProp: 'workout.category',
        codeTypeName: 'WorkoutCategory',
        codeTypeFile: 'src/types/fitness.ts',
      },
    ],
  },
  {
    name: 'GoalCard',
    figmaNodeId: '46:182',
    codeFile: 'src/components/fitness/GoalCard/GoalCard.tsx',
    props: [
      {
        figmaProp: 'Category',
        codeProp: 'goal.category',
        codeTypeName: 'WorkoutCategory',
        codeTypeFile: 'src/types/fitness.ts',
      },
    ],
  },
  {
    name: 'StatCard',
    figmaNodeId: '47:56',
    codeFile: 'src/components/fitness/StatCard/StatCard.tsx',
    props: [
      {
        figmaProp: 'Size',
        codeProp: 'size',
        // Inline union in StatCard — no exported type name
      },
      {
        figmaProp: 'Delta',
        codeProp: 'deltaDir',
        // Derived internally, not a direct prop
      },
    ],
  },
  {
    name: 'PRList',
    figmaNodeId: '47:88',
    codeFile: 'src/components/fitness/PRList/PRList.tsx',
    props: [
      {
        figmaProp: 'Rank',
        codeProp: 'rank',
        // Derived internally from array index — not a direct prop
      },
    ],
  },
]
