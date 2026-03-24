import React from 'react'
import { format, parseISO } from 'date-fns'
import Card from '../../ui/Card/Card'
import Badge from '../../ui/Badge/Badge'
import styles from './WorkoutCard.module.css'
import type { Workout } from '../../../types'
import {
  IconDumbbell,
  IconRun,
  IconZap,
  IconHeart,
} from '../../icons'

interface WorkoutCardProps {
  workout: Workout
  onClick?: (workout: Workout) => void
}

const categoryConfig = {
  strength:    { label: 'Strength',    color: 'var(--color-cat-strength)',    Icon: IconDumbbell },
  cardio:      { label: 'Cardio',      color: 'var(--color-cat-cardio)',      Icon: IconRun },
  hiit:        { label: 'HIIT',        color: 'var(--color-cat-hiit)',        Icon: IconZap },
  flexibility: { label: 'Flexibility', color: 'var(--color-cat-flexibility)', Icon: IconHeart },
  rest:        { label: 'Rest',        color: 'var(--color-cat-rest)',        Icon: IconHeart },
  custom:      { label: 'Custom',      color: 'var(--color-cat-custom)',      Icon: IconDumbbell },
} as const

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onClick }) => {
  const cfg = categoryConfig[workout.category]
  const { Icon } = cfg

  const totalSets = workout.exercises.reduce((sum, e) => sum + e.sets.length, 0)

  return (
    <Card
      variant="elevated"
      padding="lg"
      interactive
      accentColor={cfg.color}
      className={styles.card}
      onClick={() => onClick?.(workout)}
    >
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.name}>{workout.name}</span>
          <span className={styles.date}>
            {format(parseISO(workout.date), 'MMM d, yyyy')}
            {workout.startTime && ` · ${workout.startTime}`}
          </span>
        </div>
        <div
          className={styles.categoryDot}
          style={{ backgroundColor: cfg.color }}
        >
          <Icon size={18} color="#fff" />
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statValue}>{workout.durationMinutes}</div>
          <div className={styles.statLabel}>min</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{workout.caloriesBurned ?? '—'}</div>
          <div className={styles.statLabel}>kcal</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{workout.exercises.length}</div>
          <div className={styles.statLabel}>exercises</div>
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.exercises}>{totalSets} total sets</span>
        <div className={styles.moodRow}>
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className={[
                styles.moodDot,
                workout.mood && n <= workout.mood ? styles.active : '',
              ]
                .filter(Boolean)
                .join(' ')}
            />
          ))}
        </div>
      </div>

      {workout.notes && <p className={styles.notes}>"{workout.notes}"</p>}

      <Badge
        variant={workout.category as 'strength' | 'cardio' | 'hiit' | 'flexibility'}
        size="sm"
      >
        {cfg.label}
      </Badge>
    </Card>
  )
}

export default WorkoutCard
