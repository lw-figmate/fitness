import React from 'react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import Card, { CardHeader } from '../../components/ui/Card/Card'
import StatCard from '../../components/fitness/StatCard/StatCard'
import { IconTrendUp, IconFlame, IconClock, IconDumbbell } from '../../components/icons'
import { useApp } from '../../context/AppContext'

const sectionTitle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 'var(--text-lg)',
  fontWeight: 700,
  color: 'var(--color-fg-default)',
  margin: 0,
}

const ProgressPage: React.FC = () => {
  const { weeklyStats, workouts } = useApp()

  // Last 12 weeks
  const chartData = weeklyStats.slice(-12)

  // Category breakdown
  const categoryBreakdown = (() => {
    const counts: Record<string, number> = {}
    workouts.forEach((w) => {
      counts[w.category] = (counts[w.category] ?? 0) + 1
    })
    return Object.entries(counts).map(([category, count]) => ({ category, count }))
  })()
  const avgWorkouts = (
    chartData.reduce((s, w) => s + w.workouts, 0) / chartData.length
  ).toFixed(1)

  const avgMinutes = Math.round(
    chartData.reduce((s, w) => s + w.minutes, 0) / chartData.length,
  )

  const totalCalories = chartData.reduce((s, w) => s + w.calories, 0)
  const peakWeek = [...chartData].sort((a, b) => b.workouts - a.workouts)[0]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Summary stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--space-4)',
        }}
      >
        <StatCard
          label="Avg Sessions/Week"
          value={avgWorkouts}
          icon={<IconDumbbell />}
          iconColor="var(--color-brand)"
          subtitle="12-week average"
        />
        <StatCard
          label="Avg Active Min/Week"
          value={avgMinutes}
          unit="min"
          icon={<IconClock />}
          iconColor="var(--color-cat-cardio)"
          subtitle="12-week average"
        />
        <StatCard
          label="Total Calories (12w)"
          value={totalCalories.toLocaleString()}
          unit="kcal"
          icon={<IconFlame />}
          iconColor="var(--color-cat-hiit)"
        />
        <StatCard
          label="Peak Week"
          value={peakWeek?.workouts ?? 0}
          unit="sessions"
          icon={<IconTrendUp />}
          iconColor="var(--color-success)"
          subtitle={peakWeek?.weekLabel}
        />
      </div>

      {/* Volume over time */}
      <Card variant="elevated" padding="lg">
        <CardHeader>
          <h3 style={sectionTitle}>Training Volume (minutes)</h3>
        </CardHeader>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="minGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#6366F1" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="calGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#F43F5E" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#F43F5E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="weekLabel" tick={{ fill: 'var(--color-fg-subtle)', fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: 'var(--color-fg-subtle)', fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
              labelStyle={{ color: 'var(--color-fg-default)' }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '16px', fontSize: '12px', color: 'var(--color-fg-muted)' }}
            />
            <Area type="monotone" dataKey="minutes" name="Minutes" stroke="#6366F1" strokeWidth={2.5} fill="url(#minGrad)" dot={false} activeDot={{ r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Strength vs Cardio stacked */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
        <Card variant="elevated" padding="lg">
          <CardHeader>
            <h3 style={sectionTitle}>Strength vs Cardio</h3>
          </CardHeader>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData} margin={{ top: 4, right: 4, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="weekLabel" tick={{ fill: 'var(--color-fg-subtle)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: 'var(--color-fg-subtle)', fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
              />
              <Legend wrapperStyle={{ paddingTop: '12px', fontSize: '12px', color: 'var(--color-fg-muted)' }} />
              <Bar dataKey="strengthSessions" name="Strength" fill="var(--color-cat-strength)" radius={[3, 3, 0, 0]} stackId="a" />
              <Bar dataKey="cardioSessions" name="Cardio" fill="var(--color-cat-cardio)" radius={[3, 3, 0, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card variant="elevated" padding="lg">
          <CardHeader>
            <h3 style={sectionTitle}>Workout Type Distribution</h3>
          </CardHeader>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            {categoryBreakdown.map((item) => {
              const total = workouts.length
              const pct = Math.round((item.count / total) * 100)
              const colorMap: Record<string, string> = {
                strength: 'var(--color-cat-strength)',
                cardio: 'var(--color-cat-cardio)',
                hiit: 'var(--color-cat-hiit)',
                flexibility: 'var(--color-cat-flexibility)',
                rest: 'var(--color-cat-rest)',
              }
              const color = colorMap[item.category] ?? 'var(--color-brand)'
              return (
                <div key={item.category}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)', fontSize: 'var(--text-sm)' }}>
                    <span style={{ color: 'var(--color-fg-muted)', fontWeight: 500, textTransform: 'capitalize' }}>{item.category}</span>
                    <span style={{ color: 'var(--color-fg-default)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                      {item.count} ({pct}%)
                    </span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--color-bg-overlay)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${pct}%`,
                        background: color,
                        borderRadius: '9999px',
                        transition: 'width 0.5s cubic-bezier(0, 0, 0.2, 1)',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Calories trend */}
      <Card variant="elevated" padding="lg">
        <CardHeader>
          <h3 style={sectionTitle}>Calories Burned Per Week</h3>
        </CardHeader>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={chartData} margin={{ top: 4, right: 4, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="weekLabel" tick={{ fill: 'var(--color-fg-subtle)', fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: 'var(--color-fg-subtle)', fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
              labelStyle={{ color: 'var(--color-fg-default)' }}
            />
            <Line
              type="monotone"
              dataKey="calories"
              name="Calories"
              stroke="var(--color-cat-hiit)"
              strokeWidth={2.5}
              dot={{ fill: 'var(--color-cat-hiit)', r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}

export default ProgressPage
