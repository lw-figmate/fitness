import React from 'react'
import styles from './Badge.module.css'

export type BadgeVariant =
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'brand'
  | 'neutral'
  | 'strength'
  | 'cardio'
  | 'flexibility'
  | 'hiit'
  | 'rest'

export type BadgeSize = 'sm' | 'md' | 'lg'
export type BadgeAppearance = 'solid' | 'subtle'

export interface BadgeProps {
  variant?: BadgeVariant
  size?: BadgeSize
  appearance?: BadgeAppearance
  /** Prepend status dot */
  dot?: boolean
  icon?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  appearance = 'solid',
  dot = false,
  icon,
  className,
  style,
  children,
}) => {
  const classes = [
    styles.badge,
    styles[variant],
    styles[size],
    appearance === 'subtle' ? styles.subtle : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} style={style}>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </span>
  )
}

export default Badge
