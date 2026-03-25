import React from 'react'
import { format, parseISO } from 'date-fns'
import styles from './PRList.module.css'
import type { PersonalRecord } from '../../../types'

interface PRListProps {
  records: PersonalRecord[]
  maxItems?: number
}

const rankClass = (i: number) =>
  i === 0 ? styles.gold : i === 1 ? styles.silver : i === 2 ? styles.bronze : ''

const PRList: React.FC<PRListProps> = ({ records, maxItems = 5 }) => {
  const displayed = records.slice(0, maxItems)

  return (
    <div>
      {displayed.map((pr, i) => {
        const improvement =
          pr.previousValue != null && pr.previousValue > 0
            ? ((pr.value - pr.previousValue) / pr.previousValue) * 100
            : null

        return (
          <div key={pr.id} className={styles.item} tabIndex={0}>
            <div className={`${styles.rank} ${rankClass(i)}`}>
              {i + 1}
            </div>
            <div className={styles.info}>
              <div className={styles.name}>{pr.exerciseName}</div>
              <div className={styles.meta}>
                {format(parseISO(pr.date), 'MMM d, yyyy')}
              </div>
            </div>
            <div className={styles.recordGroup}>
              <div className={styles.recordValue}>{pr.value}</div>
              <div className={styles.recordUnit}>{pr.unit}</div>
              {improvement != null && improvement > 0 && (
                <div className={styles.improvement}>
                  +{improvement.toFixed(1)}%
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PRList
