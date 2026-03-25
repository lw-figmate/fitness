/**
 * figma-type-map.ts
 *
 * The ONLY data that cannot be derived from the .figma.tsx Code Connect files:
 * which TypeScript union type backs each component's enum prop.
 *
 * Used exclusively by figma-drift.ts in --fix mode to auto-patch TypeScript types.
 * Everything else (node IDs, prop names, value aliases) is parsed from the
 * .figma.tsx files directly.
 */

export interface TypeInfo {
  /** TypeScript union type name, e.g. 'ButtonVariant' */
  typeName: string
  /** Source file containing the type, relative to project root */
  file: string
}

/**
 * Keys: component name matching the default export in each .figma.tsx file.
 * Values: map of React prop name → TypeInfo.
 *
 * Omit a component entirely if none of its props have patchable string union types.
 * Omit individual props that are numeric (e.g. StatCard.deltaDir) or
 * have no exported type (e.g. StatCard.size is an internal interface prop).
 */
export const typeMap: Record<string, Record<string, TypeInfo>> = {
  Button: {
    variant: { typeName: 'ButtonVariant', file: 'src/components/ui/Button/Button.tsx' },
    size:    { typeName: 'ButtonSize',    file: 'src/components/ui/Button/Button.tsx' },
  },
  Badge: {
    variant:    { typeName: 'BadgeVariant',    file: 'src/components/ui/Badge/Badge.tsx'   },
    size:       { typeName: 'BadgeSize',       file: 'src/components/ui/Badge/Badge.tsx'   },
    appearance: { typeName: 'BadgeAppearance', file: 'src/components/ui/Badge/Badge.tsx'   },
  },
  Avatar: {
    size:   { typeName: 'AvatarSize',   file: 'src/components/ui/Avatar/Avatar.tsx'   },
    status: { typeName: 'AvatarStatus', file: 'src/components/ui/Avatar/Avatar.tsx'   },
  },
  Progress: {
    color: { typeName: 'ProgressColor', file: 'src/components/ui/Progress/Progress.tsx' },
    size:  { typeName: 'ProgressSize',  file: 'src/components/ui/Progress/Progress.tsx' },
  },
  Card: {
    variant: { typeName: 'CardVariant', file: 'src/components/ui/Card/Card.tsx' },
  },
  Input: {
    size:  { typeName: 'InputSize',  file: 'src/components/ui/Input/Input.tsx' },
    state: { typeName: 'InputState', file: 'src/components/ui/Input/Input.tsx' },
  },
  Modal: {
    size: { typeName: 'ModalSize', file: 'src/components/ui/Modal/Modal.tsx' },
  },
  WorkoutCard: {
    category: { typeName: 'WorkoutCategory', file: 'src/types/fitness.ts' },
  },
  GoalCard: {
    category: { typeName: 'WorkoutCategory', file: 'src/types/fitness.ts' },
  },
  // StatCard: size is an internal interface prop (not an exported type);
  //           deltaDir is numeric — neither is string-union-patchable.
  // PRList:   rank is numeric — not a string union.
}
