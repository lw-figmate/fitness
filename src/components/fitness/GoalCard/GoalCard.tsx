import React from 'react'
import { format, parseISO, differenceInDays } from 'date-fns'
import Card from '../../ui/Card/Card'
import Badge from '../../ui/Badge/Badge'
import Progress from '../../ui/Progress/Progress'
import styles from './GoalCard.module.css'
import type { Goal } from '../../../types'
import { IconTarget, IconCheckCircle } from '../../icons'

interface GoalCardProps {
  goal: Goal
}

const categoryColorMap: Record<string, string> = {
  strength:    'var(--color-cat-strength)',
  cardio:      'var(--color-cat-cardio)',
  flexibility: 'var(--color-cat-flexibility)',
  hiit:        'var(--color-cat-hiit)',
  rest:        'var(--color-cat-rest)',
  custom:      'var(--color-brand)',
}

const categoryProgressColor: Record<string, 'strength' | 'cardio' | 'flexibility' | 'hiit' | 'brand'> = {
  strength:    'strength',
  cardio:      'cardio',
  flexibility: 'flexibility',
  hiit:        'hiit',
  custom:      'brand',
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const color = categoryColorMap[goal.category] ?? 'var(--color-brand)'
  const progressColor = categoryProgressColor[goal.category] ?? 'brand'

  const daysLeft = goal.deadline
    ? differenceInDays(parseISO(goal.deadline), new Date())
    : null

  const urgency =
    daysLeft !== null && daysLeft <= 7
      ? 'danger'
      : daysLeft !== null && daysLeft <= 14
      ? 'warning'
      : undefined

  return (
    <Card variant="elevated" padding="lg" accentColor={color}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <div
              className={styles.iconWrap}
              style={{ backgroundColor: `${color}22` }}
            >
              {goal.completed ? (
                <IconCheckCircle size={20} color={color} />
              ) : (
                <IconTarget size={20} color={color} />
              )}
            </div>
            <div>
              <div className={styles.title}>{goal.title}</div>
              {goal.description && (
                <div className={styles.subtitle}>{goal.description}</div>
              )}
            </div>
          </div>
          <div className={styles.meta}>
            <div className={styles.valueGroup}>
              <span className={styles.value}>{goal.currentValue}</span>
              <span className={styles.unit}>/ {goal.targetValue} {goal.unit}</span>
            </div>
            {daysLeft !== null && !goal.completed && (
              <Badge variant={urgency ?? 'neutral'} size="sm" appearance="subtle">
                {daysLeft > 0 ? `${daysLeft}d left` : 'Overdue'}
              </Badge>
            )}
          </div>
        </div>

        <Progress
          value={goal.currentValue}
          max={goal.targetValue}
          color={progressColor}
          size="md"
          animated={!goal.completed}
          showValue
        />

        {goal.deadline && (
          <div className={styles.deadline}>
            Target: {format(parseISO(goal.deadline), 'MMM d, yyyy')}
          </div>
        )}

        {goal.completed && (
          <div className={styles.completedBadge}>
            <Badge variant="success" size="sm" dot>
              Completed
            </Badge>
          </div>
        )}
      </div>
    </Card>
  )
}

export default GoalCard
