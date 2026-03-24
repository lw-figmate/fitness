/**
 * Shadow Design Tokens
 *
 * Dark-mode tuned shadows using semi-transparent black layers.
 */
export const shadow = {
  none:  'none',
  xs:    '0 1px 2px 0 rgba(0,0,0,0.40)',
  sm:    '0 1px 3px 0 rgba(0,0,0,0.50), 0 1px 2px -1px rgba(0,0,0,0.40)',
  md:    '0 4px 6px -1px rgba(0,0,0,0.50), 0 2px 4px -2px rgba(0,0,0,0.40)',
  lg:    '0 10px 15px -3px rgba(0,0,0,0.55), 0 4px 6px -4px rgba(0,0,0,0.40)',
  xl:    '0 20px 25px -5px rgba(0,0,0,0.60), 0 8px 10px -6px rgba(0,0,0,0.40)',
  '2xl': '0 25px 50px -12px rgba(0,0,0,0.70)',
  inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.40)',
  // Brand glow
  brandGlow:   '0 0 0 3px rgba(99,102,241,0.35)',
  successGlow: '0 0 0 3px rgba(16,185,129,0.30)',
  dangerGlow:  '0 0 0 3px rgba(244,63,94,0.30)',
} as const
