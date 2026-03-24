import React, { useState } from 'react'
import { format, parseISO } from 'date-fns'
import styles from './Workouts.module.css'
import WorkoutCard from '../../components/fitness/WorkoutCard/WorkoutCard'
import Button from '../../components/ui/Button/Button'
import Modal from '../../components/ui/Modal/Modal'
import Badge from '../../components/ui/Badge/Badge'
import Card from '../../components/ui/Card/Card'
import { IconPlus, IconDumbbell, IconCheck } from '../../components/icons'
import { useApp } from '../../context/AppContext'
import type { Workout, WorkoutCategory } from '../../types'

type FilterType = 'all' | WorkoutCategory

const filters: { label: string; value: FilterType }[] = [
  { label: 'All',         value: 'all' },
  { label: 'Strength',    value: 'strength' },
  { label: 'Cardio',      value: 'cardio' },
  { label: 'HIIT',        value: 'hiit' },
  { label: 'Flexibility', value: 'flexibility' },
  { label: 'Rest',        value: 'rest' },
]

const WorkoutsPage: React.FC = () => {
  const { workouts, addWorkout } = useApp()
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [selected, setSelected] = useState<Workout | null>(null)
  const [logOpen, setLogOpen] = useState(false)

  // New workout form state
  const [form, setForm] = useState({
    name: '',
    category: 'strength' as WorkoutCategory,
    date: format(new Date(), 'yyyy-MM-dd'),
    durationMinutes: 45,
    caloriesBurned: '' as string | number,
    mood: '' as string | number,
    notes: '',
  })

  const handleLogWorkout = () => {
    if (!form.name.trim()) return
    addWorkout({
      name: form.name.trim(),
      category: form.category,
      date: form.date,
      durationMinutes: Number(form.durationMinutes),
      caloriesBurned: form.caloriesBurned !== '' ? Number(form.caloriesBurned) : undefined,
      mood: form.mood !== '' ? (Number(form.mood) as 1|2|3|4|5) : undefined,
      notes: form.notes.trim() || undefined,
      exercises: [],
      completed: true,
    })
    setLogOpen(false)
    setForm({
      name: '',
      category: 'strength',
      date: format(new Date(), 'yyyy-MM-dd'),
      durationMinutes: 45,
      caloriesBurned: '',
      mood: '',
      notes: '',
    })
  }

  const filtered =
    activeFilter === 'all'
      ? workouts
      : workouts.filter((w) => w.category === activeFilter)

  return (
    <div className={styles.container}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.filters}>
          {filters.map((f) => (
            <button
              key={f.value}
              className={[
                styles.filterBtn,
                activeFilter === f.value ? styles.active : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <Button variant="primary" size="md" startIcon={<IconPlus size={16} />} onClick={() => setLogOpen(true)}>
          Log Workout
        </Button>
      </div>

      {/* Workout grid */}
      {filtered.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <IconDumbbell size={32} color="var(--color-fg-subtle)" />
          </div>
          <div className={styles.emptyTitle}>No workouts found</div>
          <p className={styles.emptyText}>
            No {activeFilter !== 'all' ? activeFilter : ''} workouts logged yet.
          </p>
          <Button variant="primary" startIcon={<IconPlus size={16} />} onClick={() => setLogOpen(true)}>
            Log Your First Workout
          </Button>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((w) => (
            <WorkoutCard
              key={w.id}
              workout={w}
              onClick={setSelected}
            />
          ))}
        </div>
      )}

      {/* Detail modal */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ''}
        subtitle={selected ? format(parseISO(selected.date), 'MMMM d, yyyy') : ''}
        size="lg"
        footer={
          <Button variant="ghost" onClick={() => setSelected(null)}>
            Close
          </Button>
        }
      >
        {selected && (
          <div>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-4)' }}>
              <Badge variant={selected.category as 'strength' | 'cardio' | 'hiit' | 'flexibility'}>
                {selected.category}
              </Badge>
              <Badge variant="neutral">
                {selected.durationMinutes} min
              </Badge>
              {selected.caloriesBurned && (
                <Badge variant="neutral">{selected.caloriesBurned} kcal</Badge>
              )}
              {selected.mood && (
                <Badge variant="neutral">Mood: {'⭐'.repeat(selected.mood)}</Badge>
              )}
            </div>

            {selected.notes && (
              <Card variant="filled" padding="md" style={{ marginBottom: 'var(--space-4)' }}>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-fg-muted)', fontStyle: 'italic' }}>
                  "{selected.notes}"
                </p>
              </Card>
            )}

            <div className={styles.exerciseList}>
              {selected.exercises.map((ex) => (
                <div key={ex.id} className={styles.exerciseItem}>
                  <div className={styles.exerciseName}>{ex.exercise.name}</div>
                  <table className={styles.setsTable}>
                    <thead>
                      <tr>
                        <th>Set</th>
                        {ex.sets[0]?.reps !== undefined && <th>Reps</th>}
                        {ex.sets[0]?.weight !== undefined && <th>Weight (kg)</th>}
                        {ex.sets[0]?.duration !== undefined && <th>Duration (s)</th>}
                        {ex.sets[0]?.distance !== undefined && <th>Distance (m)</th>}
                        <th>Done</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ex.sets.map((set, i) => (
                        <tr key={set.id}>
                          <td>{i + 1}</td>
                          {set.reps !== undefined && <td>{set.reps}</td>}
                          {set.weight !== undefined && <td>{set.weight}</td>}
                          {set.duration !== undefined && <td>{set.duration}</td>}
                          {set.distance !== undefined && <td>{set.distance}</td>}
                          <td className={styles.checkIcon}>
                            {set.completed && <IconCheck size={14} color="var(--color-success)" />}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Log Workout modal */}
      <Modal
        open={logOpen}
        onClose={() => setLogOpen(false)}
        title="Log Workout"
        subtitle="Record a completed session"
        size="md"
        footer={
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
            <Button variant="ghost" onClick={() => setLogOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleLogWorkout} disabled={!form.name.trim()}>
              Save Workout
            </Button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {/* Name */}
          <label style={labelStyle}>
            <span>Workout Name *</span>
            <input
              style={inputStyle}
              type="text"
              placeholder="e.g. Push Day, Morning Run…"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </label>

          {/* Category + Date row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <label style={labelStyle}>
              <span>Category</span>
              <select
                style={inputStyle}
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as WorkoutCategory }))}
              >
                {(['strength','cardio','hiit','flexibility','rest','custom'] as WorkoutCategory[]).map((c) => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </label>
            <label style={labelStyle}>
              <span>Date</span>
              <input
                style={inputStyle}
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              />
            </label>
          </div>

          {/* Duration + Calories row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <label style={labelStyle}>
              <span>Duration (minutes)</span>
              <input
                style={inputStyle}
                type="number"
                min={1}
                value={form.durationMinutes}
                onChange={(e) => setForm((f) => ({ ...f, durationMinutes: Number(e.target.value) }))}
              />
            </label>
            <label style={labelStyle}>
              <span>Calories Burned (optional)</span>
              <input
                style={inputStyle}
                type="number"
                min={0}
                placeholder="kcal"
                value={form.caloriesBurned}
                onChange={(e) => setForm((f) => ({ ...f, caloriesBurned: e.target.value }))}
              />
            </label>
          </div>

          {/* Mood */}
          <label style={labelStyle}>
            <span>Mood (optional)</span>
            <select
              style={inputStyle}
              value={form.mood}
              onChange={(e) => setForm((f) => ({ ...f, mood: e.target.value }))}
            >
              <option value="">— No rating —</option>
              <option value="1">⭐ 1 – Rough</option>
              <option value="2">⭐⭐ 2 – Below average</option>
              <option value="3">⭐⭐⭐ 3 – Average</option>
              <option value="4">⭐⭐⭐⭐ 4 – Good</option>
              <option value="5">⭐⭐⭐⭐⭐ 5 – Amazing</option>
            </select>
          </label>

          {/* Notes */}
          <label style={labelStyle}>
            <span>Notes (optional)</span>
            <textarea
              style={{ ...inputStyle, resize: 'vertical', minHeight: 72 }}
              placeholder="How did it go? Any PRs?"
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            />
          </label>
        </div>
      </Modal>
    </div>
  )
}

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
  padding: '8px 12px',
  borderRadius: 'var(--radius-lg)',
  border: '1px solid var(--color-border)',
  background: 'var(--color-bg-elevated)',
  color: 'var(--color-fg-default)',
  fontSize: 'var(--text-sm)',
  outline: 'none',
  boxSizing: 'border-box',
}

export default WorkoutsPage
