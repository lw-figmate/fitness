/**
 * Color Design Tokens
 *
 * Organized as:
 *   - Primitives (raw palette — not used directly in components)
 *   - Semantic aliases (purpose-driven names consumed by components)
 *
 * Naming convention: category.scale or category.variant
 */

// ─── Primitive palette ───────────────────────────────────────────────────────

export const colorPrimitives = {
  // Indigo (primary brand)
  indigo50: '#EEF2FF',
  indigo100: '#E0E7FF',
  indigo200: '#C7D2FE',
  indigo300: '#A5B4FC',
  indigo400: '#818CF8',
  indigo500: '#6366F1',
  indigo600: '#4F46E5',
  indigo700: '#4338CA',
  indigo800: '#3730A3',
  indigo900: '#312E81',
  indigo950: '#1E1B4B',

  // Violet (accent)
  violet400: '#A78BFA',
  violet500: '#8B5CF6',
  violet600: '#7C3AED',

  // Emerald (success / cardio)
  emerald50: '#ECFDF5',
  emerald100: '#D1FAE5',
  emerald400: '#34D399',
  emerald500: '#10B981',
  emerald600: '#059669',
  emerald700: '#047857',

  // Amber (warning / strength)
  amber50: '#FFFBEB',
  amber100: '#FEF3C7',
  amber400: '#FBBF24',
  amber500: '#F59E0B',
  amber600: '#D97706',

  // Rose (danger / rest)
  rose50: '#FFF1F2',
  rose100: '#FFE4E6',
  rose400: '#FB7185',
  rose500: '#F43F5E',
  rose600: '#E11D48',

  // Sky (info / flexibility)
  sky50: '#F0F9FF',
  sky100: '#E0F2FE',
  sky400: '#38BDF8',
  sky500: '#0EA5E9',
  sky600: '#0284C7',

  // Neutral
  white: '#FFFFFF',
  neutral50: '#FAFAFA',
  neutral100: '#F4F4F5',
  neutral150: '#EFEFEF',
  neutral200: '#E4E4E7',
  neutral300: '#D4D4D8',
  neutral400: '#A1A1AA',
  neutral500: '#71717A',
  neutral600: '#52525B',
  neutral700: '#3F3F46',
  neutral800: '#27272A',
  neutral850: '#1F1F22',
  neutral900: '#18181B',
  neutral950: '#09090B',
  black: '#000000',
} as const

// ─── Semantic aliases ─────────────────────────────────────────────────────────

export const colorTokens = {
  // Brand
  brand: {
    default: colorPrimitives.indigo500,
    hover: colorPrimitives.indigo600,
    active: colorPrimitives.indigo700,
    subtle: colorPrimitives.indigo50,
    muted: colorPrimitives.indigo100,
    emphasis: colorPrimitives.indigo800,
    foreground: colorPrimitives.white,
  },

  // Accent
  accent: {
    default: colorPrimitives.violet500,
    hover: colorPrimitives.violet600,
    subtle: colorPrimitives.indigo50,
    foreground: colorPrimitives.white,
  },

  // Success
  success: {
    default: colorPrimitives.emerald500,
    hover: colorPrimitives.emerald600,
    subtle: colorPrimitives.emerald50,
    muted: colorPrimitives.emerald100,
    foreground: colorPrimitives.white,
    text: colorPrimitives.emerald700,
  },

  // Warning
  warning: {
    default: colorPrimitives.amber500,
    hover: colorPrimitives.amber600,
    subtle: colorPrimitives.amber50,
    muted: colorPrimitives.amber100,
    foreground: colorPrimitives.white,
    text: colorPrimitives.amber600,
  },

  // Danger
  danger: {
    default: colorPrimitives.rose500,
    hover: colorPrimitives.rose600,
    subtle: colorPrimitives.rose50,
    muted: colorPrimitives.rose100,
    foreground: colorPrimitives.white,
    text: colorPrimitives.rose600,
  },

  // Info
  info: {
    default: colorPrimitives.sky500,
    hover: colorPrimitives.sky600,
    subtle: colorPrimitives.sky50,
    muted: colorPrimitives.sky100,
    foreground: colorPrimitives.white,
    text: colorPrimitives.sky600,
  },

  // Background
  bg: {
    base: colorPrimitives.neutral950,
    surface: colorPrimitives.neutral900,
    elevated: colorPrimitives.neutral850,
    overlay: colorPrimitives.neutral800,
    muted: colorPrimitives.neutral800,
    subtle: colorPrimitives.neutral700,
    inverse: colorPrimitives.white,
  },

  // Foreground / Text
  fg: {
    default: colorPrimitives.neutral50,
    muted: colorPrimitives.neutral400,
    subtle: colorPrimitives.neutral500,
    disabled: colorPrimitives.neutral600,
    inverse: colorPrimitives.neutral950,
    onBrand: colorPrimitives.white,
  },

  // Border
  border: {
    default: colorPrimitives.neutral800,
    muted: colorPrimitives.neutral700,
    subtle: colorPrimitives.neutral850,
    emphasis: colorPrimitives.neutral600,
    focus: colorPrimitives.indigo500,
  },

  // Fitness category colors
  category: {
    strength: colorPrimitives.amber500,
    cardio: colorPrimitives.emerald500,
    flexibility: colorPrimitives.sky500,
    hiit: colorPrimitives.rose500,
    rest: colorPrimitives.violet500,
    custom: colorPrimitives.neutral400,
  },
} as const

export type ColorToken = typeof colorTokens
