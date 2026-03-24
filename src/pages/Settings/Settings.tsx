import React, { useState } from 'react'
import Card, { CardHeader } from '../../components/ui/Card/Card'
import Button from '../../components/ui/Button/Button'
import Badge from '../../components/ui/Badge/Badge'
import Avatar from '../../components/ui/Avatar/Avatar'
import { useApp } from '../../context/AppContext'
import type { DifficultyLevel } from '../../types'
import { IconCheck } from '../../components/icons'

// ── Shared form styles ────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-1-5)',
  fontSize: 'var(--text-sm)',
  fontWeight: 600,
  color: 'var(--color-fg-muted)',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '9px 13px',
  borderRadius: 'var(--radius-lg)',
  border: '1px solid var(--color-border)',
  background: 'var(--color-bg-elevated)',
  color: 'var(--color-fg-default)',
  fontSize: 'var(--text-sm)',
  outline: 'none',
  boxSizing: 'border-box',
}

const sectionHeading: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 'var(--text-lg)',
  fontWeight: 700,
  color: 'var(--color-fg-default)',
  margin: 0,
}

// ── Component ─────────────────────────────────────────────────────────────────

const SettingsPage: React.FC = () => {
  const { user, updateUser } = useApp()

  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    weightKg: user.weightKg ?? '',
    heightCm: user.heightCm ?? '',
    birthDate: user.birthDate ?? '',
  })

  const [fitness, setFitness] = useState({
    fitnessLevel: user.fitnessLevel,
    weeklyGoalDays: user.weeklyGoalDays,
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    updateUser({
      name: profile.name.trim() || user.name,
      email: profile.email.trim() || user.email,
      weightKg: profile.weightKg !== '' ? Number(profile.weightKg) : undefined,
      heightCm: profile.heightCm !== '' ? Number(profile.heightCm) : undefined,
      birthDate: profile.birthDate || undefined,
      fitnessLevel: fitness.fitnessLevel,
      weeklyGoalDays: Number(fitness.weeklyGoalDays),
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const levelColors: Record<DifficultyLevel, string> = {
    beginner: 'var(--color-success)',
    intermediate: 'var(--color-warning)',
    advanced: 'var(--color-danger)',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 720 }}>

      {/* ── Profile header ─────────────────────────────── */}
      <Card variant="elevated" padding="xl">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
          <Avatar name={user.name} src={user.avatarUrl} size="xl" status="online" />
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, margin: 0, marginBottom: 'var(--space-1)' }}>
              {user.name}
            </h2>
            <p style={{ color: 'var(--color-fg-muted)', fontSize: 'var(--text-sm)', margin: 0, marginBottom: 'var(--space-2)' }}>
              {user.email}
            </p>
            <Badge
              variant="neutral"
              size="sm"
              style={{ color: levelColors[user.fitnessLevel], borderColor: levelColors[user.fitnessLevel] } as React.CSSProperties}
            >
              {user.fitnessLevel.charAt(0).toUpperCase() + user.fitnessLevel.slice(1)}
            </Badge>
          </div>
        </div>
      </Card>

      {/* ── Profile info ───────────────────────────────── */}
      <Card variant="elevated" padding="lg">
        <CardHeader>
          <h3 style={sectionHeading}>Profile Information</h3>
        </CardHeader>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <label style={labelStyle}>
              <span>Full Name</span>
              <input
                style={inputStyle}
                type="text"
                value={profile.name}
                onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
              />
            </label>
            <label style={labelStyle}>
              <span>Email</span>
              <input
                style={inputStyle}
                type="email"
                value={profile.email}
                onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
              />
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
            <label style={labelStyle}>
              <span>Weight (kg)</span>
              <input
                style={inputStyle}
                type="number"
                min={20}
                max={300}
                placeholder="e.g. 75"
                value={profile.weightKg}
                onChange={(e) => setProfile((p) => ({ ...p, weightKg: e.target.value }))}
              />
            </label>
            <label style={labelStyle}>
              <span>Height (cm)</span>
              <input
                style={inputStyle}
                type="number"
                min={100}
                max={250}
                placeholder="e.g. 178"
                value={profile.heightCm}
                onChange={(e) => setProfile((p) => ({ ...p, heightCm: e.target.value }))}
              />
            </label>
            <label style={labelStyle}>
              <span>Date of Birth</span>
              <input
                style={inputStyle}
                type="date"
                value={profile.birthDate}
                onChange={(e) => setProfile((p) => ({ ...p, birthDate: e.target.value }))}
              />
            </label>
          </div>
        </div>
      </Card>

      {/* ── Fitness preferences ────────────────────────── */}
      <Card variant="elevated" padding="lg">
        <CardHeader>
          <h3 style={sectionHeading}>Fitness Preferences</h3>
        </CardHeader>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <label style={labelStyle}>
              <span>Fitness Level</span>
              <select
                style={inputStyle}
                value={fitness.fitnessLevel}
                onChange={(e) =>
                  setFitness((f) => ({ ...f, fitnessLevel: e.target.value as DifficultyLevel }))
                }
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </label>
            <label style={labelStyle}>
              <span>Weekly Workout Goal (days)</span>
              <select
                style={inputStyle}
                value={fitness.weeklyGoalDays}
                onChange={(e) =>
                  setFitness((f) => ({ ...f, weeklyGoalDays: Number(e.target.value) }))
                }
              >
                {[2, 3, 4, 5, 6, 7].map((n) => (
                  <option key={n} value={n}>{n} days / week</option>
                ))}
              </select>
            </label>
          </div>

          {/* Visual level legend */}
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-3)',
              padding: 'var(--space-3) var(--space-4)',
              background: 'var(--color-bg-elevated)',
              borderRadius: 'var(--radius-xl)',
            }}
          >
            {(['beginner', 'intermediate', 'advanced'] as DifficultyLevel[]).map((lvl) => (
              <div
                key={lvl}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: 'var(--text-xs)',
                  color: fitness.fitnessLevel === lvl ? levelColors[lvl] : 'var(--color-fg-subtle)',
                  fontWeight: fitness.fitnessLevel === lvl ? 700 : 400,
                  cursor: 'pointer',
                  transition: 'color 150ms',
                }}
                onClick={() => setFitness((f) => ({ ...f, fitnessLevel: lvl }))}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: levelColors[lvl],
                    opacity: fitness.fitnessLevel === lvl ? 1 : 0.35,
                  }}
                />
                {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* ── App settings ───────────────────────────────── */}
      <Card variant="elevated" padding="lg">
        <CardHeader>
          <h3 style={sectionHeading}>App Settings</h3>
        </CardHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
          {[
            { label: 'Push notifications', description: 'Workout reminders and streak alerts', enabled: true },
            { label: 'Weekly summary email', description: 'Get a summary of your week every Monday', enabled: false },
            { label: 'Rest day reminders', description: 'Remind me to take recovery days', enabled: true },
          ].map((setting) => (
            <div
              key={setting.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--space-4)',
                background: 'var(--color-bg-elevated)',
                borderRadius: 'var(--radius-xl)',
              }}
            >
              <div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-fg-default)' }}>
                  {setting.label}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-fg-subtle)', marginTop: 'var(--space-0-5)' }}>
                  {setting.description}
                </div>
              </div>
              <div
                style={{
                  width: 44,
                  height: 24,
                  borderRadius: '9999px',
                  background: setting.enabled ? 'var(--color-brand)' : 'var(--color-bg-overlay)',
                  position: 'relative',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'background 200ms',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 2,
                    left: setting.enabled ? 22 : 2,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: '#fff',
                    transition: 'left 200ms',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ── Save button ────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
        {saved && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-success)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
            <IconCheck size={16} color="var(--color-success)" />
            Settings saved!
          </div>
        )}
        <Button variant="primary" size="lg" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  )
}

export default SettingsPage
