import React from 'react'
import { format, parseISO, isThisWeek, subDays } from 'date-fns'
import { Link } from 'react-router-dom'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts'
import styles from './Dashboard.module.css'
import StatCard from '../../components/fitness/StatCard/StatCard'
import WorkoutCard from '../../components/fitness/WorkoutCard/WorkoutCard'
import GoalCard from '../../components/fitness/GoalCard/GoalCard'
import PRList from '../../components/fitness/PRList/PRList'
import Card, { CardHeader } from '../../components/ui/Card/Card'
import {
  IconDumbbell,
  IconClock,
  IconFlame,
  IconTrendUp,
} from '../../components/icons'
import { useApp } from '../../context/AppContext'
import type { Workout } from '../../types'

const DashboardPage: React.FC = () => {
  const { workouts, goals, prs, weeklyStats, dailyActivity, user } = useApp()
  const [_selectedWorkout, setSelectedWorkout] = React.useState<Workout | null>(null)

  // Derived stats computed inside component so they stay reactive
  const thisWeekWorkouts = workouts.filter((w) =>
    isThisWeek(parseISO(w.date), { weekStartsOn: 1 }),
  )
  const totalMinutes = thisWeekWorkouts.reduce((s, w) => s + w.durationMinutes, 0)
  const totalCalories = thisWeekWorkouts.reduce((s, w) => s + (w.caloriesBurned ?? 0), 0)
  const chartData = weeklyStats.slice(-8)
  const recentActivity = Array.from({ length: 7 }, (_, i) => {
    const d = subDays(new Date(), 6 - i)
    const dateStr = format(d, 'yyyy-MM-dd')
    const activity = dailyActivity.find((a) => a.date === dateStr)
    return { date: d, dateStr, activity }
  })

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className={styles.hero}>
        <p className={styles.greeting}>{greeting()}, {user.name.split(' ')[0]} 👋</p>
        <h2 className={styles.heroTitle}>
          Ready to <span>crush</span> today's workout?
        </h2>
      </div>

      {/* ── 7-day activity strip ──────────────────────────── */}
      <div className={styles.activityRow}>
        {recentActivity.map(({ date, activity }) => {
          const hasWorkout = !!activity?.workoutId
          return (
            <div
              key={format(date, 'yyyy-MM-dd')}
              className={[styles.activityChip, hasWorkout ? styles.hasWorkout : ''].filter(Boolean).join(' ')}
            >
              <span className={styles.chipDay}>{format(date, 'EEE')}</span>
              <span className={styles.chipDate}>{format(date, 'd')}</span>
              {hasWorkout ? (
                <span className={styles.chipDot} />
              ) : (
                <span className={styles.chipDotEmpty} />
              )}
            </div>
          )
        })}
      </div>

      {/* ── Stats Grid ───────────────────────────────────── */}
      <div className={styles.statsGrid}>
        <StatCard
          label="Workouts This Week"
          value={thisWeekWorkouts.length}
          unit={`/ ${user.weeklyGoalDays}`}
          icon={<IconDumbbell />}
          iconColor="var(--color-brand)"
          delta={12}
          subtitle={`Goal: ${user.weeklyGoalDays} sessions`}
          accentColor="var(--color-brand)"
        />
        <StatCard
          label="Active Minutes"
          value={totalMinutes}
          unit="min"
          icon={<IconClock />}
          iconColor="var(--color-cat-cardio)"
          delta={8}
          subtitle="This week"
          accentColor="var(--color-cat-cardio)"
        />
        <StatCard
          label="Calories Burned"
          value={totalCalories.toLocaleString()}
          unit="kcal"
          icon={<IconFlame />}
          iconColor="var(--color-cat-hiit)"
          delta={-3}
          subtitle="This week"
          accentColor="var(--color-cat-hiit)"
        />
        <StatCard
          label="All-Time Workouts"
          value={workouts.length}
          icon={<IconTrendUp />}
          iconColor="var(--color-cat-strength)"
          subtitle={`Since ${format(parseISO(user.joinedAt), 'MMM yyyy')}`}
          accentColor="var(--color-cat-strength)"
        />
      </div>

      {/* ── Charts row ───────────────────────────────────── */}
      <div className={styles.twoCol}>
        {/* Weekly volume chart */}
        <Card variant="elevated" padding="lg" className={styles.chartCard}>
          <CardHeader>
            <h3 className={styles.sectionTitle}>Weekly Volume</h3>
          </CardHeader>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366F1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="weekLabel"
                tick={{ fill: 'var(--color-fg-subtle)', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fill: 'var(--color-fg-subtle)', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-bg-elevated)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'var(--color-fg-default)' }}
                itemStyle={{ color: 'var(--color-fg-muted)' }}
              />
              <Area
                type="monotone"
                dataKey="minutes"
                stroke="#6366F1"
                strokeWidth={2.5}
                fill="url(#volGrad)"
                dot={false}
                activeDot={{ r: 4, fill: '#6366F1' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Workout frequency bar chart */}
        <Card variant="elevated" padding="lg">
          <CardHeader>
            <h3 className={styles.sectionTitle}>Workout Frequency</h3>
          </CardHeader>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="weekLabel"
                tick={{ fill: 'var(--color-fg-subtle)', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fill: 'var(--color-fg-subtle)', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-bg-elevated)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'var(--color-fg-default)' }}
                itemStyle={{ color: 'var(--color-fg-muted)' }}
              />
              <Bar dataKey="workouts" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      entry.workouts >= (user.weeklyGoalDays ?? 4)
                        ? 'var(--color-success)'
                        : 'var(--color-brand)'
                    }
                    fillOpacity={0.85}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* ── Recent Workouts ───────────────────────────────── */}
      <div>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Recent Workouts</h2>
          <Link to="/workouts" className={styles.sectionLink}>View all →</Link>
        </div>
        <div className={styles.workoutGrid}>
          {workouts.slice(0, 3).map((w) => (
            <WorkoutCard key={w.id} workout={w} onClick={setSelectedWorkout} />
          ))}
        </div>
      </div>

      {/* ── Goals + PRs row ───────────────────────────────── */}
      <div className={styles.twoCol} style={{ marginTop: 'var(--space-6)' }}>
        <div>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Active Goals</h2>
            <Link to="/goals" className={styles.sectionLink}>View all →</Link>
          </div>
          <div className={styles.goalsGrid}>
            {goals.filter((g) => !g.completed).slice(0, 4).map((g) => (
              <GoalCard key={g.id} goal={g} />
            ))}
          </div>
        </div>

        <div>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Personal Records</h2>
            <Link to="/records" className={styles.sectionLink}>View all →</Link>
          </div>
          <Card variant="elevated" padding="md">
            <PRList records={prs} maxItems={5} />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
