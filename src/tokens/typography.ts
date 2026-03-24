/**
 * Typography Design Tokens
 *
 * Scales follow a modular type system with consistent ratios.
 * Font sizes use a 1.250 (Major Third) scale.
 */

// ─── Font families ────────────────────────────────────────────────────────────

export const fontFamily = {
  sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  display: "'Space Grotesk', 'Inter', sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
} as const

// ─── Font sizes (rem) ─────────────────────────────────────────────────────────

export const fontSize = {
  '2xs': '0.625rem',   //  10px
  xs:   '0.75rem',    //  12px
  sm:   '0.875rem',   //  14px
  md:   '1rem',       //  16px  (base)
  lg:   '1.125rem',   //  18px
  xl:   '1.25rem',    //  20px
  '2xl': '1.5rem',    //  24px
  '3xl': '1.875rem',  //  30px
  '4xl': '2.25rem',   //  36px
  '5xl': '3rem',      //  48px
  '6xl': '3.75rem',   //  60px
} as const

// ─── Font weights ─────────────────────────────────────────────────────────────

export const fontWeight = {
  light:    300,
  regular:  400,
  medium:   500,
  semibold: 600,
  bold:     700,
  extrabold:800,
} as const

// ─── Line heights ─────────────────────────────────────────────────────────────

export const lineHeight = {
  none:    1,
  tight:   1.25,
  snug:    1.375,
  normal:  1.5,
  relaxed: 1.625,
  loose:   2,
} as const

// ─── Letter spacing ───────────────────────────────────────────────────────────

export const letterSpacing = {
  tighter:  '-0.05em',
  tight:    '-0.025em',
  normal:   '0em',
  wide:     '0.025em',
  wider:    '0.05em',
  widest:   '0.1em',
} as const

// ─── Semantic text styles ─────────────────────────────────────────────────────

export const textStyle = {
  display1: {
    fontFamily: fontFamily.display,
    fontSize: fontSize['5xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  display2: {
    fontFamily: fontFamily.display,
    fontSize: fontSize['4xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h1: {
    fontFamily: fontFamily.display,
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontFamily: fontFamily.display,
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontFamily: fontFamily.display,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.normal,
  },
  h4: {
    fontFamily: fontFamily.display,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.normal,
  },
  bodyLg: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.relaxed,
  },
  body: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.md,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.relaxed,
  },
  bodySm: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
  },
  caption: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.wide,
  },
  label: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
  },
  overline: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.widest,
    textTransform: 'uppercase' as const,
  },
  stat: {
    fontFamily: fontFamily.display,
    fontSize: fontSize['4xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.none,
    letterSpacing: letterSpacing.tighter,
  },
} as const
