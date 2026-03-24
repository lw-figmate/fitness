import React from 'react'
import styles from './Card.module.css'

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'ghost' | 'filled'
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  padding?: CardPadding
  /** Make card clickable with hover/active states */
  interactive?: boolean
  /** Top accent bar color (any CSS color value) */
  accentColor?: string
}

const paddingMap: Record<CardPadding, string> = {
  none: styles.noPadding,
  sm:   styles.sm,
  md:   styles.md,
  lg:   styles.lg,
  xl:   styles.xl,
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      interactive = false,
      accentColor,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      styles.card,
      styles[variant],
      paddingMap[padding],
      interactive ? styles.interactive : '',
      accentColor ? styles.accentBar : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div
        ref={ref}
        className={classes}
        style={accentColor ? { ...style, '--accent-color': accentColor } as React.CSSProperties : style}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

Card.displayName = 'Card'

// ─── Sub-components ───────────────────────────────────────────────────────────

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...rest
}) => (
  <div className={[styles.header, className].filter(Boolean).join(' ')} {...rest}>
    {children}
  </div>
)

export const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...rest
}) => (
  <div className={[styles.body, className].filter(Boolean).join(' ')} {...rest}>
    {children}
  </div>
)

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...rest
}) => (
  <div className={[styles.footer, className].filter(Boolean).join(' ')} {...rest}>
    {children}
  </div>
)

CardHeader.displayName = 'CardHeader'
CardBody.displayName = 'CardBody'
CardFooter.displayName = 'CardFooter'

export default Card
