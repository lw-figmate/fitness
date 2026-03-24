// ─── Fitness Domain Types ──────────────────────────────────────────────────────

export type WorkoutCategory =
  | 'strength'
  | 'cardio'
  | 'flexibility'
  | 'hiit'
  | 'rest'
  | 'custom'

export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'forearms'
  | 'core'
  | 'quads'
  | 'hamstrings'
  | 'glutes'
  | 'calves'
  | 'full-body'
  | 'cardio'

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced'

export interface Exercise {
  id: string
  name: string
  category: WorkoutCategory
  muscleGroups: MuscleGroup[]
  description?: string
}

export interface WorkoutSet {
  id: string
  exerciseId: string
  reps?: number
  weight?: number   // kg
  duration?: number // seconds
  distance?: number // meters
  restSeconds?: number
  completed: boolean
  notes?: string
}

export interface WorkoutExercise {
  id: string
  exercise: Exercise
  sets: WorkoutSet[]
  notes?: string
}

export interface Workout {
  id: string
  name: string
  category: WorkoutCategory
  date: string           // ISO date string
  startTime?: string     // HH:mm
  endTime?: string       // HH:mm
  durationMinutes: number
  exercises: WorkoutExercise[]
  notes?: string
  mood?: 1 | 2 | 3 | 4 | 5
  completed: boolean
  caloriesBurned?: number
}

export interface Goal {
  id: string
  title: string
  description?: string
  targetValue: number
  currentValue: number
  unit: string
  deadline?: string
  category: WorkoutCategory
  completed: boolean
  createdAt: string
}

export interface PersonalRecord {
  id: string
  exerciseId: string
  exerciseName: string
  value: number
  unit: string
  date: string
  previousValue?: number
}

export interface UserProfile {
  id: string
  name: string
  email: string
  avatarUrl?: string
  weightKg?: number
  heightCm?: number
  birthDate?: string
  fitnessLevel: DifficultyLevel
  weeklyGoalDays: number
  joinedAt: string
}

export interface WeeklyStats {
  weekLabel: string
  workouts: number
  minutes: number
  calories: number
  strengthSessions: number
  cardioSessions: number
}

export interface DailyActivity {
  date: string
  steps?: number
  caloriesBurned?: number
  activeMinutes?: number
  workoutId?: string
}
