import React, { useState } from 'react'
import GoalCard from '../../components/fitness/GoalCard/GoalCard'
import Button from '../../components/ui/Button/Button'
import Badge from '../../components/ui/Badge/Badge'
import Modal from '../../components/ui/Modal/Modal'
import { IconPlus, IconTarget } from '../../components/icons'
import { useApp } from '../../context/AppContext'
import type { WorkoutCategory } from '../../types'

type FilterType = 'all' | WorkoutCategory

const filters: { label: string; value: FilterType }[] = [
  { label: 'All',         value: 'all' },
  { label: 'Strength',    value: 'strength' },
  { label: 'Cardio',      value: 'cardio' },
  { label: 'Flexibility', value: 'flexibility' },
  { label: 'HIIT',        value: 'hiit' },
  { label: 'Custom',      value: 'custom' },
]

const filterBtnStyle = (active: boolean): React.CSSProperties => ({
  padding: '6px 14px',
  borderRadius: '9999px',
  fontSize: 'var(--text-xs)',
  fontWeight: 600,
  cursor: 'pointer',
  border: '1px solid',
  borderColor: active ? 'var(--color-brand)' : 'var(--color-border-muted)',
  backgroundColor: active ? 'var(--color-brand)' : 'var(--color-bg-elevated)',
  color: active ? '#fff' : 'var(--color-fg-muted)',
  transition: 'all 150ms ease',
})

const GoalsPage: React.FC = () => {
  const { goals, addGoal } = useApp()
  const [filter, setFilter] = useState<FilterType>('all')
  const [addOpen, setAddOpen] = useState(false)
  const [form, setForm] = useState({
    title: '',
    category: 'strength' as WorkoutCategory,
    targetValue: 100,
    currentValue: 0,
    unit: 'kg',
    deadline: '',
  })

  const handleAddGoal = () => {
    if (!form.title.trim()) return
    addGoal({
      title: form.title.trim(),
      category: form.category,
      targetValue: Number(form.targetValue),
      currentValue: Number(form.currentValue),
      unit: form.unit.trim() || 'units',
      deadline: form.deadline || undefined,
      completed: false,
    })
    setAddOpen(false)
    setForm({ title: '', category: 'strength', targetValue: 100, currentValue: 0, unit: 'kg', deadline: '' })
  }

  const active = goals.filter((g) => !g.completed && (filter === 'all' || g.category === filter))
  const completed = goals.filter((g) => g.completed && (filter === 'all' || g.category === filter))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {filters.map((f) => (
            <button key={f.value} style={filterBtnStyle(filter === f.value)} onClick={() => setFilter(f.value)}>
              {f.label}
            </button>
          ))}
        </div>
        <Button variant="primary" startIcon={<IconPlus size={16} />} onClick={() => setAddOpen(true)}>
          Add Goal
        </Button>
      </div>

      {/* Active goals */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-fg-default)', margin: 0 }}>
            Active Goals
          </h2>
          <Badge variant="brand" size="sm">{active.length}</Badge>
        </div>

        {active.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-12)', color: 'var(--color-fg-subtle)' }}>
            <IconTarget size={32} color="var(--color-fg-subtle)" />
            <p style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>No active goals in this category.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
            {active.map((g) => <GoalCard key={g.id} goal={g} />)}
          </div>
        )}
      </section>

      {/* Completed goals */}
      {completed.length > 0 && (
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-fg-default)', margin: 0 }}>
              Completed
            </h2>
            <Badge variant="success" size="sm">{completed.length}</Badge>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
            {completed.map((g) => <GoalCard key={g.id} goal={g} />)}
          </div>
        </section>
      )}

      {/* Add Goal modal */}
      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add New Goal"
        subtitle="Set a target to work toward"
        size="md"
        footer={
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
            <Button variant="ghost" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddGoal} disabled={!form.title.trim()}>
              Create Goal
            </Button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <label style={labelStyle}>
            <span>Goal Title *</span>
            <input
              style={inputStyle}
              type="text"
              placeholder="e.g. Bench Press 100 kg"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
          </label>

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
              <span>Unit</span>
              <input
                style={inputStyle}
                type="text"
                placeholder="kg, km, reps, min…"
                value={form.unit}
                onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
              />
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <label style={labelStyle}>
              <span>Target Value</span>
              <input
                style={inputStyle}
                type="number"
                min={0}
                value={form.targetValue}
                onChange={(e) => setForm((f) => ({ ...f, targetValue: Number(e.target.value) }))}
              />
            </label>
            <label style={labelStyle}>
              <span>Current Value</span>
              <input
                style={inputStyle}
                type="number"
                min={0}
                value={form.currentValue}
                onChange={(e) => setForm((f) => ({ ...f, currentValue: Number(e.target.value) }))}
              />
            </label>
          </div>

          <label style={labelStyle}>
            <span>Target Date (optional)</span>
            <input
              style={inputStyle}
              type="date"
              value={form.deadline}
              onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
            />
          </label>
        </div>
      </Modal>
    </div>
  )
}

// Shared form helpers

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

export default GoalsPage
