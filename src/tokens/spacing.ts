/**
 * Spacing Design Tokens
 *
 * Based on a 4px base unit (0.25rem).
 * Follows a geometric scale with common stops for all use cases.
 */

// ─── Base unit ────────────────────────────────────────────────────────────────

export const spaceBase = 4

/**
 * Spacing scale (rem values)
 * px value = name × 4px
 */
export const space = {
  0:    '0',          //  0px
  px:   '1px',        //  1px
  0.5:  '0.125rem',   //  2px
  1:    '0.25rem',    //  4px
  1.5:  '0.375rem',   //  6px
  2:    '0.5rem',     //  8px
  2.5:  '0.625rem',   //  10px
  3:    '0.75rem',    //  12px
  3.5:  '0.875rem',   //  14px
  4:    '1rem',       //  16px
  5:    '1.25rem',    //  20px
  6:    '1.5rem',     //  24px
  7:    '1.75rem',    //  28px
  8:    '2rem',       //  32px
  9:    '2.25rem',    //  36px
  10:   '2.5rem',     //  40px
  11:   '2.75rem',    //  44px
  12:   '3rem',       //  48px
  14:   '3.5rem',     //  56px
  16:   '4rem',       //  64px
  18:   '4.5rem',     //  72px
  20:   '5rem',       //  80px
  24:   '6rem',       //  96px
  28:   '7rem',       //  112px
  32:   '8rem',       //  128px
  36:   '9rem',       //  144px
  40:   '10rem',      //  160px
  48:   '12rem',      //  192px
  56:   '14rem',      //  224px
  64:   '16rem',      //  256px
} as const

// ─── Semantic spacing ─────────────────────────────────────────────────────────

export const spacing = {
  // Component internal padding
  component: {
    xs:  space[2],    //  8px
    sm:  space[3],    //  12px
    md:  space[4],    //  16px
    lg:  space[5],    //  20px
    xl:  space[6],    //  24px
  },
  // Layout gaps / gutters
  layout: {
    xs:  space[4],    //  16px
    sm:  space[6],    //  24px
    md:  space[8],    //  32px
    lg:  space[12],   //  48px
    xl:  space[16],   //  64px
    '2xl': space[24], //  96px
  },
  // Page margins / container padding
  page: {
    sm:  space[4],    //  16px
    md:  space[6],    //  24px
    lg:  space[8],    //  32px
  },
} as const
