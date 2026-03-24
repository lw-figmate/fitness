import React from 'react'
import Card from '../../ui/Card/Card'
import styles from './StatCard.module.css'

interface StatCardProps {
  label: string
  value: string | number
  unit?: string
  icon?: React.ReactNode
  iconColor?: string
  delta?: number        // percentage change, positive = up
  subtitle?: string
  size?: 'sm' | 'md' | 'lg'
  accentColor?: string
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  unit,
  icon,
  iconColor = 'var(--color-brand)',
  delta,
  subtitle,
  size = 'md',
  accentColor,
}) => {
  const deltaDir = delta == null ? null : delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat'

  return (
    <Card
      variant="elevated"
      padding="lg"
      className={styles.card}
      style={{ '--stat-color': iconColor } as React.CSSProperties}
      accentColor={accentColor}
    >
      <div className={styles.iconRow}>
        {icon && (
          <div
            className={styles.iconWrap}
            style={{ backgroundColor: `${iconColor}22` }}
          >
            {React.cloneElement(icon as React.ReactElement, {
              size: 20,
              color: iconColor,
            })}
          </div>
        )}
        {delta != null && deltaDir && (
          <div className={`${styles.delta} ${styles[deltaDir]}`}>
            {deltaDir === 'up' ? '↑' : deltaDir === 'down' ? '↓' : '→'}
            {Math.abs(delta)}%
          </div>
        )}
      </div>

      <div className={styles.label}>{label}</div>

      <div className={styles.valueRow}>
        <span
          className={`${styles.value} ${styles[size]}`}
          style={{ color: iconColor }}
        >
          {value}
        </span>
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>

      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
    </Card>
  )
}

export default StatCard
