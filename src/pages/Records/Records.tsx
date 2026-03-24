import React from 'react'
import Card, { CardHeader } from '../../components/ui/Card/Card'
import PRList from '../../components/fitness/PRList/PRList'
import Badge from '../../components/ui/Badge/Badge'
import { useApp } from '../../context/AppContext'
import { IconTrophy, IconDumbbell } from '../../components/icons'
import { format, parseISO } from 'date-fns'

const sectionTitle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 'var(--text-lg)',
  fontWeight: 700,
  color: 'var(--color-fg-default)',
  margin: 0,
}

const RecordsPage: React.FC = () => {
  const { prs } = useApp()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Hero stat */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-brand) 0%, var(--color-accent) 100%)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'var(--space-8)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-6)',
      }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: 'var(--radius-2xl)',
          background: 'rgba(255,255,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <IconTrophy size={40} color="#fff" />
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
            {prs.length}
          </div>
          <div style={{ fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.75)', marginTop: 'var(--space-1)' }}>
            Personal Records Set
          </div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.55)', marginTop: 'var(--space-1)' }}>
            Keep pushing your limits
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
        {/* All PRs list */}
        <Card variant="elevated" padding="lg">
          <CardHeader>
            <h3 style={sectionTitle}>All-Time Records</h3>
          </CardHeader>
          <PRList records={prs} maxItems={10} />
        </Card>

        {/* Exercise PR detail cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {prs.map((pr) => {
            const improvement = pr.previousValue
              ? ((pr.value - pr.previousValue) / pr.previousValue) * 100
              : null
            return (
              <Card key={pr.id} variant="elevated" padding="md" interactive>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 'var(--radius-xl)',
                    background: 'var(--color-bg-overlay)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <IconDumbbell size={20} color="var(--color-brand)" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-fg-default)', marginBottom: 'var(--space-0-5)' }}>
                      {pr.exerciseName}
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-fg-subtle)' }}>
                      {format(parseISO(pr.date), 'MMM d, yyyy')}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--space-1)' }}>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-xl)',
                      fontWeight: 800,
                      color: 'var(--color-fg-default)',
                      fontVariantNumeric: 'tabular-nums',
                    }}>
                      {pr.value} <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-fg-muted)' }}>{pr.unit}</span>
                    </div>
                    {improvement != null && improvement > 0 && (
                      <Badge variant="success" size="sm" appearance="subtle">
                        +{improvement.toFixed(1)}%
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default RecordsPage
