import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/layout/AppShell/AppShell'
import { useApp } from './context/AppContext'

// Lazy-loaded pages
const Dashboard  = React.lazy(() => import('./pages/Dashboard/Dashboard'))
const Workouts   = React.lazy(() => import('./pages/Workouts/Workouts'))
const Progress   = React.lazy(() => import('./pages/Progress/Progress'))
const Goals      = React.lazy(() => import('./pages/Goals/Goals'))
const Records    = React.lazy(() => import('./pages/Records/Records'))
const Activity   = React.lazy(() => import('./pages/Activity/Activity'))
const Profile    = React.lazy(() => import('./pages/Profile/Profile'))
const Settings   = React.lazy(() => import('./pages/Settings/Settings'))

const PageLoader: React.FC = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '40vh',
      color: 'var(--color-fg-subtle)',
      gap: 'var(--space-3)',
    }}
  >
    <div
      style={{
        width: 24,
        height: 24,
        border: '2px solid var(--color-brand)',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
      }}
    />
    Loading…
  </div>
)

const App: React.FC = () => {
  const { user, workouts } = useApp()
  const streak = Math.min(
    workouts.filter((w) => w.completed).length,
    30,
  )
  return (
    <AppShell user={user} streak={streak}>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"          element={<Dashboard />} />
          <Route path="/workouts"  element={<Workouts />} />
          <Route path="/progress"  element={<Progress />} />
          <Route path="/goals"     element={<Goals />} />
          <Route path="/records"   element={<Records />} />
          <Route path="/activity"  element={<Activity />} />
          <Route path="/profile"   element={<Profile />} />
          <Route path="/settings"  element={<Settings />} />
          <Route path="*"          element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AppShell>
  )
}

export default App
