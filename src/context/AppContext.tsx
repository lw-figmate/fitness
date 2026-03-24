import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import type {
  Workout,
  Goal,
  PersonalRecord,
  UserProfile,
  WeeklyStats,
  DailyActivity,
} from '../types'
import {
  mockWorkouts,
  mockGoals,
  mockPRs,
  mockUser,
  mockWeeklyStats,
  mockDailyActivity,
} from '../data/mockData'

// ── localStorage helpers ──────────────────────────────────────────────────────

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function saveStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // quota exceeded — silently ignore
  }
}

// ── Context shape ─────────────────────────────────────────────────────────────

export interface AppContextValue {
  workouts: Workout[]
  goals: Goal[]
  prs: PersonalRecord[]
  user: UserProfile
  weeklyStats: WeeklyStats[]
  dailyActivity: DailyActivity[]
  // Workouts
  addWorkout: (w: Omit<Workout, 'id'>) => void
  deleteWorkout: (id: string) => void
  // Goals
  addGoal: (g: Omit<Goal, 'id' | 'createdAt'>) => void
  updateGoal: (id: string, updates: Partial<Goal>) => void
  deleteGoal: (id: string) => void
  // User
  updateUser: (updates: Partial<UserProfile>) => void
}

const AppContext = createContext<AppContextValue | null>(null)

// ── Provider ──────────────────────────────────────────────────────────────────

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [workouts, setWorkouts] = useState<Workout[]>(() =>
    loadStorage('ft_workouts', mockWorkouts),
  )
  const [goals, setGoals] = useState<Goal[]>(() =>
    loadStorage('ft_goals', mockGoals),
  )
  const [prs] = useState<PersonalRecord[]>(() =>
    loadStorage('ft_prs', mockPRs),
  )
  const [user, setUser] = useState<UserProfile>(() =>
    loadStorage('ft_user', mockUser),
  )

  // Persist to localStorage whenever state changes
  useEffect(() => { saveStorage('ft_workouts', workouts) }, [workouts])
  useEffect(() => { saveStorage('ft_goals', goals) }, [goals])
  useEffect(() => { saveStorage('ft_user', user) }, [user])

  // ── Workout actions ─────────────────────────────────────────────────────────

  const addWorkout = useCallback((w: Omit<Workout, 'id'>) => {
    const newWorkout: Workout = { ...w, id: crypto.randomUUID() }
    setWorkouts((prev) => [newWorkout, ...prev])
  }, [])

  const deleteWorkout = useCallback((id: string) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== id))
  }, [])

  // ── Goal actions ────────────────────────────────────────────────────────────

  const addGoal = useCallback((g: Omit<Goal, 'id' | 'createdAt'>) => {
    const newGoal: Goal = {
      ...g,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    setGoals((prev) => [newGoal, ...prev])
  }, [])

  const updateGoal = useCallback(
    (id: string, updates: Partial<Goal>) => {
      setGoals((prev) =>
        prev.map((g) => (g.id === id ? { ...g, ...updates } : g)),
      )
    },
    [],
  )

  const deleteGoal = useCallback((id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id))
  }, [])

  // ── User actions ────────────────────────────────────────────────────────────

  const updateUser = useCallback((updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }))
  }, [])

  return (
    <AppContext.Provider
      value={{
        workouts,
        goals,
        prs,
        user,
        weeklyStats: mockWeeklyStats,
        dailyActivity: mockDailyActivity,
        addWorkout,
        deleteWorkout,
        addGoal,
        updateGoal,
        deleteGoal,
        updateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
