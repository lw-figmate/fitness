import React from 'react'
import { format, parseISO } from 'date-fns'
import Card, { CardHeader } from '../../components/ui/Card/Card'
import Avatar from '../../components/ui/Avatar/Avatar'
import Badge from '../../components/ui/Badge/Badge'
import Button from '../../components/ui/Button/Button'
import Progress from '../../components/ui/Progress/Progress'
import { useApp } from '../../context/AppContext'
import { IconEdit, IconDumbbell, IconTarget, IconTrophy } from '../../components/icons'

const ProfilePage: React.FC = () => {
  const { user, workouts, prs } = useApp()
  const totalWorkouts = workouts.length
  const totalMinutes = workouts.reduce((s, w) => s + w.durationMinutes, 0)
  const totalCalories = workouts.reduce((s, w) => s + (w.caloriesBurned ?? 0), 0)

  const bmi =
    user.weightKg && user.heightCm
      ? (user.weightKg / (user.heightCm / 100) ** 2).toFixed(1)
      : null

  const levelColor = {
    beginner:     'var(--color-success)',
    intermediate: 'var(--color-warning)',
    advanced:     'var(--color-danger)',
  }[user.fitnessLevel]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Profile hero */}
      <Card variant="elevated" padding="xl">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
          <Avatar
            name={user.name}
            src={user.avatarUrl}
            size="xxl"
            status="online"
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, margin: 0, marginBottom: 'var(--space-1)' }}>
              {user.name}
            </h2>
            <p style={{ color: 'var(--color-fg-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>
              {user.email}
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <Badge
                variant="neutral"
                size="md"
                style={{ borderColor: levelColor, color: levelColor } as React.CSSProperties}
              >
                {user.fitnessLevel.charAt(0).toUpperCase() + user.fitnessLevel.slice(1)}
              </Badge>
              <Badge variant="neutral" size="md">
                Member since {format(parseISO(user.joinedAt), 'MMM yyyy')}
              </Badge>
              <Badge variant="brand" size="md">
                {user.weeklyGoalDays}x / week goal
              </Badge>
            </div>
          </div>
          <Button variant="secondary" size="md" startIcon={<IconEdit size={16} />}>
            Edit Profile
          </Button>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
        {/* Stats */}
        <Card variant="elevated" padding="lg">
          <CardHeader>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, margin: 0 }}>
              Lifetime Stats
            </h3>
          </CardHeader>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            {[
              { icon: <IconDumbbell size={20} color="var(--color-brand)" />, label: 'Workouts', value: totalWorkouts },
              { icon: <IconTarget size={20} color="var(--color-cat-cardio)" />, label: 'Hours', value: Math.round(totalMinutes / 60) },
              { icon: <IconTrophy size={20} color="var(--color-cat-strength)" />, label: 'PRs', value: prs.length },
            ].map((s) => (
              <div key={s.label} style={{
                textAlign: 'center',
                padding: 'var(--space-4)',
                background: 'var(--color-bg-elevated)',
                borderRadius: 'var(--radius-xl)',
              }}>
                <div style={{ marginBottom: 'var(--space-2)', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-fg-default)', lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-fg-subtle)', marginTop: 'var(--space-1)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'var(--space-4)' }}>
            <Progress
              value={totalCalories}
              max={100000}
              color="cardio"
              label="Total Calories Burned"
              showValue
              formatValue={(v) => `${v.toLocaleString()} kcal`}
              animated
            />
          </div>
        </Card>

        {/* Body stats */}
        <Card variant="elevated" padding="lg">
          <CardHeader>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, margin: 0 }}>
              Body Stats
            </h3>
          </CardHeader>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            {[
              { label: 'Weight',   value: `${user.weightKg} kg` },
              { label: 'Height',   value: `${user.heightCm} cm` },
              { label: 'BMI',      value: bmi ?? '—' },
              { label: 'Age',      value: user.birthDate ? `${new Date().getFullYear() - parseISO(user.birthDate).getFullYear()} yrs` : '—' },
            ].map((row) => (
              <div key={row.label} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'var(--space-3) var(--space-4)',
                background: 'var(--color-bg-elevated)',
                borderRadius: 'var(--radius-xl)',
              }}>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-fg-muted)', fontWeight: 500 }}>{row.label}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-fg-default)' }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ProfilePage
