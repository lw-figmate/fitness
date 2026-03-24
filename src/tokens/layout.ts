/**
 * Breakpoint / Responsive Design Tokens
 */
export const breakpoint = {
  sm:  '640px',
  md:  '768px',
  lg:  '1024px',
  xl:  '1280px',
  '2xl': '1536px',
} as const

/**
 * Z-Index Scale
 */
export const zIndex = {
  base:    0,
  raised:  10,
  dropdown:100,
  sticky:  200,
  overlay: 300,
  modal:   400,
  toast:   500,
  tooltip: 600,
} as const

/**
 * Sizing / Layout Tokens
 */
export const sizing = {
  // Sidebar widths
  sidebar: {
    collapsed: '64px',
    expanded:  '256px',
  },
  // Content max-widths
  container: {
    sm:  '640px',
    md:  '768px',
    lg:  '1024px',
    xl:  '1280px',
    '2xl': '1440px',
  },
  // Icon sizes
  icon: {
    xs:  '12px',
    sm:  '16px',
    md:  '20px',
    lg:  '24px',
    xl:  '32px',
    '2xl': '48px',
  },
  // Avatar sizes
  avatar: {
    xs:  '24px',
    sm:  '32px',
    md:  '40px',
    lg:  '48px',
    xl:  '64px',
    '2xl': '96px',
  },
} as const
