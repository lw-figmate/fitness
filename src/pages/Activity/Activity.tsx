import React from 'react'
import { format, parseISO } from 'date-fns'
import Card, { CardHeader } from '../../components/ui/Card/Card'
import Badge from '../../components/ui/Badge/Badge'
import { useApp } from '../../context/AppContext'
import { IconActivity, IconFlame, IconHeart, IconClock } from '../../components/icons'

const categoryColor: Record<string, string> = {
  strength:    'var(--color-cat-strength)',
  cardio:      'var(--color-cat-cardio)',
  hiit:        'var(--color-cat-hiit)',
  flexibility: 'var(--color-cat-flexibility)',
  rest:        'var(--color-cat-rest)',
  custom:      'var(--color-brand)',
}

const ActivityPage: React.FC = () => {
  const { dailyActivity, workouts } = useApp()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
        {[
          {
            label: 'Total Steps (7d)',
            value: dailyActivity.reduce((s, a) => s + (a.steps ?? 0), 0).toLocaleString(),
            icon: <IconActivity size={20} color="var(--color-brand)" />,
            color: 'var(--color-brand)',
          },
          {
            label: 'Calories (7d)',
            value: dailyActivity.reduce((s, a) => s + (a.caloriesBurned ?? 0), 0).toLocaleString(),
            icon: <IconFlame size={20} color="var(--color-cat-hiit)" />,
            color: 'var(--color-cat-hiit)',
          },
          {
            label: 'Active Minutes (7d)',
            value: dailyActivity.reduce((s, a) => s + (a.activeMinutes ?? 0), 0),
            icon: <IconClock size={20} color="var(--color-cat-cardio)" />,
            color: 'var(--color-cat-cardio)',
          },
          {
            label: 'Workout Days (7d)',
            value: dailyActivity.filter((a) => a.workoutId).length,
            icon: <IconHeart size={20} color="var(--color-cat-strength)" />,
            color: 'var(--color-cat-strength)',
          },
        ].map((s) => (
          <Card key={s.label} variant="elevated" padding="lg">
            <div style={{ marginBottom: 'var(--space-2)' }}>{s.icon}</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-fg-muted)', fontWeight: 500, marginBottom: 'var(--space-1)' }}>
              {s.label}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, color: s.color, lineHeight: 1 }}>
              {s.value}
            </div>
          </Card>
        ))}
      </div>

      {/* Daily activity log */}
      <Card variant="elevated" padding="lg">
        <CardHeader>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, margin: 0 }}>
            Daily Activity Log
          </h3>
        </CardHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
          {dailyActivity.map((day) => {
            const workout = day.workoutId
              ? workouts.find((w) => w.id === day.workoutId)
              : null

            return (
              <div
                key={day.date}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  padding: 'var(--space-3) var(--space-4)',
                  background: 'var(--color-bg-elevated)',
                  borderRadius: 'var(--radius-xl)',
                  borderLeft: workout ? `3px solid ${categoryColor[workout.category]}` : '3px solid var(--color-border)',
                }}
              >
                <div style={{ minWidth: 72 }}>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-fg-default)' }}>
                    {format(parseISO(day.date), 'EEE, MMM d')}
                  </div>
                </div>

                {workout && (
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-fg-default)' }}>
                      {workout.name}
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-fg-subtle)', marginTop: 2 }}>
                      {workout.durationMinutes} min · {workout.exercises.length} exercises
                    </div>
                  </div>
                )}

                {!workout && (
                  <div style={{ flex: 1, fontSize: 'var(--text-sm)', color: 'var(--color-fg-subtle)' }}>
                    Rest / Active Recovery
                  </div>
                )}

                <div style={{ display: 'flex', gap: 'var(--space-4)', flexShrink: 0 }}>
                  {day.steps && (
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                        {day.steps.toLocaleString()}
                      </div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-fg-subtle)' }}>steps</div>
                    </div>
                  )}
                  {day.caloriesBurned && (
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                        {day.caloriesBurned}
                      </div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-fg-subtle)' }}>kcal</div>
                    </div>
                  )}
                  {day.activeMinutes && (
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                        {day.activeMinutes}
                      </div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-fg-subtle)' }}>min</div>
                    </div>
                  )}
                </div>

                {workout && (
                  <Badge
                    variant={workout.category as 'strength' | 'cardio' | 'hiit' | 'flexibility'}
                    size="sm"
                  >
                    {workout.category}
                  </Badge>
                )}
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

export default ActivityPage
