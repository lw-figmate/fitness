import React from 'react'
import styles from './Progress.module.css'

export type ProgressColor =
  | 'brand'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'strength'
  | 'cardio'
  | 'flexibility'
  | 'hiit'
  | 'gradient'

export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface ProgressProps {
  /** Current value (0 – max) */
  value: number
  /** Maximum value */
  max?: number
  /** Bar color variant */
  color?: ProgressColor
  /** Track height */
  size?: ProgressSize
  /** Field label (shown above left) */
  label?: string
  /** Value label (shown above right, e.g. "72%") */
  showValue?: boolean
  /** Custom value formatter */
  formatValue?: (value: number, max: number) => string
  /** Shimmer animation */
  animated?: boolean
  /** Striped texture */
  striped?: boolean
  className?: string
}

const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  color = 'brand',
  size = 'md',
  label,
  showValue = false,
  formatValue,
  animated = false,
  striped = false,
  className,
}) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const displayValue = formatValue
    ? formatValue(value, max)
    : `${Math.round(pct)}%`

  const fillClasses = [
    styles.fill,
    styles[color],
    animated ? styles.animated : '',
    striped ? styles.striped : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={[styles.wrapper, styles[size], className].filter(Boolean).join(' ')}
      role="group"
    >
      {(label || showValue) && (
        <div className={styles.header}>
          {label && <span className={styles.label}>{label}</span>}
          {showValue && <span className={styles.value}>{displayValue}</span>}
        </div>
      )}
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div className={fillClasses} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default Progress
