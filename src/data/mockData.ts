import type {
  Workout,
  Exercise,
  Goal,
  PersonalRecord,
  UserProfile,
  WeeklyStats,
  DailyActivity,
} from '../types'

// ─── User Profile ─────────────────────────────────────────────────────────────

export const mockUser: UserProfile = {
  id: 'user-1',
  name: 'Alex Rivera',
  email: 'alex@fittrack.app',
  fitnessLevel: 'intermediate',
  weeklyGoalDays: 4,
  weightKg: 78,
  heightCm: 178,
  birthDate: '1992-04-15',
  joinedAt: '2024-01-10',
}

// ─── Exercises ────────────────────────────────────────────────────────────────

export const mockExercises: Exercise[] = [
  { id: 'ex-1',  name: 'Bench Press',       category: 'strength',    muscleGroups: ['chest', 'triceps', 'shoulders'] },
  { id: 'ex-2',  name: 'Squat',             category: 'strength',    muscleGroups: ['quads', 'glutes', 'hamstrings'] },
  { id: 'ex-3',  name: 'Deadlift',          category: 'strength',    muscleGroups: ['back', 'glutes', 'hamstrings'] },
  { id: 'ex-4',  name: 'Pull-Up',           category: 'strength',    muscleGroups: ['back', 'biceps'] },
  { id: 'ex-5',  name: 'Overhead Press',    category: 'strength',    muscleGroups: ['shoulders', 'triceps'] },
  { id: 'ex-6',  name: 'Barbell Row',       category: 'strength',    muscleGroups: ['back', 'biceps'] },
  { id: 'ex-7',  name: 'Running',           category: 'cardio',      muscleGroups: ['cardio', 'quads', 'calves'] },
  { id: 'ex-8',  name: 'Cycling',           category: 'cardio',      muscleGroups: ['cardio', 'quads'] },
  { id: 'ex-9',  name: 'Jump Rope',         category: 'hiit',        muscleGroups: ['cardio', 'calves', 'core'] },
  { id: 'ex-10', name: 'Burpees',           category: 'hiit',        muscleGroups: ['full-body'] },
  { id: 'ex-11', name: 'Plank',             category: 'strength',    muscleGroups: ['core'] },
  { id: 'ex-12', name: 'Yoga Flow',         category: 'flexibility', muscleGroups: ['full-body'] },
  { id: 'ex-13', name: 'Hip Flexor Stretch',category: 'flexibility', muscleGroups: ['quads', 'glutes'] },
  { id: 'ex-14', name: 'Dumbbell Curl',     category: 'strength',    muscleGroups: ['biceps', 'forearms'] },
  { id: 'ex-15', name: 'Tricep Dip',        category: 'strength',    muscleGroups: ['triceps'] },
  { id: 'ex-16', name: 'Leg Press',         category: 'strength',    muscleGroups: ['quads', 'glutes'] },
  { id: 'ex-17', name: 'Cable Row',         category: 'strength',    muscleGroups: ['back', 'biceps'] },
  { id: 'ex-18', name: 'Box Jump',          category: 'hiit',        muscleGroups: ['quads', 'glutes', 'calves'] },
]

// ─── Workouts ─────────────────────────────────────────────────────────────────

export const mockWorkouts: Workout[] = [
  {
    id: 'wk-1',
    name: 'Push Day',
    category: 'strength',
    date: '2026-03-24',
    startTime: '07:00',
    endTime: '08:10',
    durationMinutes: 70,
    caloriesBurned: 420,
    mood: 4,
    completed: true,
    exercises: [
      {
        id: 'we-1',
        exercise: mockExercises[0], // Bench Press
        sets: [
          { id: 's-1', exerciseId: 'ex-1', reps: 8,  weight: 80, completed: true },
          { id: 's-2', exerciseId: 'ex-1', reps: 8,  weight: 80, completed: true },
          { id: 's-3', exerciseId: 'ex-1', reps: 6,  weight: 85, completed: true },
          { id: 's-4', exerciseId: 'ex-1', reps: 5,  weight: 87.5, completed: true },
        ],
      },
      {
        id: 'we-2',
        exercise: mockExercises[4], // OHP
        sets: [
          { id: 's-5', exerciseId: 'ex-5', reps: 10, weight: 55, completed: true },
          { id: 's-6', exerciseId: 'ex-5', reps: 8,  weight: 57.5, completed: true },
          { id: 's-7', exerciseId: 'ex-5', reps: 8,  weight: 57.5, completed: true },
        ],
      },
      {
        id: 'we-3',
        exercise: mockExercises[14], // Tricep Dip
        sets: [
          { id: 's-8',  exerciseId: 'ex-15', reps: 12, completed: true },
          { id: 's-9',  exerciseId: 'ex-15', reps: 12, completed: true },
          { id: 's-10', exerciseId: 'ex-15', reps: 10, completed: true },
        ],
      },
    ],
    notes: 'New PR on bench! Felt strong today.',
  },
  {
    id: 'wk-2',
    name: 'Pull Day',
    category: 'strength',
    date: '2026-03-22',
    startTime: '07:15',
    endTime: '08:20',
    durationMinutes: 65,
    caloriesBurned: 390,
    mood: 5,
    completed: true,
    exercises: [
      {
        id: 'we-4',
        exercise: mockExercises[2], // Deadlift
        sets: [
          { id: 's-11', exerciseId: 'ex-3', reps: 5,  weight: 120, completed: true },
          { id: 's-12', exerciseId: 'ex-3', reps: 5,  weight: 120, completed: true },
          { id: 's-13', exerciseId: 'ex-3', reps: 3,  weight: 130, completed: true },
        ],
      },
      {
        id: 'we-5',
        exercise: mockExercises[3], // Pull-up
        sets: [
          { id: 's-14', exerciseId: 'ex-4', reps: 10, completed: true },
          { id: 's-15', exerciseId: 'ex-4', reps: 9,  completed: true },
          { id: 's-16', exerciseId: 'ex-4', reps: 8,  completed: true },
          { id: 's-17', exerciseId: 'ex-4', reps: 7,  completed: true },
        ],
      },
      {
        id: 'we-6',
        exercise: mockExercises[13], // Curl
        sets: [
          { id: 's-18', exerciseId: 'ex-14', reps: 12, weight: 16, completed: true },
          { id: 's-19', exerciseId: 'ex-14', reps: 12, weight: 16, completed: true },
          { id: 's-20', exerciseId: 'ex-14', reps: 10, weight: 18, completed: true },
        ],
      },
    ],
  },
  {
    id: 'wk-3',
    name: 'Leg Day',
    category: 'strength',
    date: '2026-03-20',
    startTime: '06:45',
    endTime: '08:05',
    durationMinutes: 80,
    caloriesBurned: 510,
    mood: 3,
    completed: true,
    exercises: [
      {
        id: 'we-7',
        exercise: mockExercises[1], // Squat
        sets: [
          { id: 's-21', exerciseId: 'ex-2', reps: 8, weight: 100, completed: true },
          { id: 's-22', exerciseId: 'ex-2', reps: 8, weight: 100, completed: true },
          { id: 's-23', exerciseId: 'ex-2', reps: 6, weight: 110, completed: true },
          { id: 's-24', exerciseId: 'ex-2', reps: 5, weight: 115, completed: true },
        ],
      },
      {
        id: 'we-8',
        exercise: mockExercises[15], // Leg Press
        sets: [
          { id: 's-25', exerciseId: 'ex-16', reps: 12, weight: 140, completed: true },
          { id: 's-26', exerciseId: 'ex-16', reps: 12, weight: 150, completed: true },
          { id: 's-27', exerciseId: 'ex-16', reps: 10, weight: 160, completed: true },
        ],
      },
    ],
    notes: 'Legs are DONE. Need to eat more.',
  },
  {
    id: 'wk-4',
    name: 'Morning Run',
    category: 'cardio',
    date: '2026-03-19',
    startTime: '06:30',
    endTime: '07:15',
    durationMinutes: 45,
    caloriesBurned: 380,
    mood: 4,
    completed: true,
    exercises: [
      {
        id: 'we-9',
        exercise: mockExercises[6], // Running
        sets: [
          { id: 's-28', exerciseId: 'ex-7', duration: 2700, distance: 7200, completed: true },
        ],
      },
    ],
  },
  {
    id: 'wk-5',
    name: 'HIIT Circuit',
    category: 'hiit',
    date: '2026-03-17',
    startTime: '18:00',
    endTime: '18:35',
    durationMinutes: 35,
    caloriesBurned: 310,
    mood: 5,
    completed: true,
    exercises: [
      {
        id: 'we-10',
        exercise: mockExercises[9], // Burpees
        sets: [
          { id: 's-29', exerciseId: 'ex-10', reps: 15, completed: true },
          { id: 's-30', exerciseId: 'ex-10', reps: 15, completed: true },
          { id: 's-31', exerciseId: 'ex-10', reps: 12, completed: true },
        ],
      },
      {
        id: 'we-11',
        exercise: mockExercises[8], // Jump Rope
        sets: [
          { id: 's-32', exerciseId: 'ex-9', duration: 60, completed: true },
          { id: 's-33', exerciseId: 'ex-9', duration: 60, completed: true },
          { id: 's-34', exerciseId: 'ex-9', duration: 60, completed: true },
          { id: 's-35', exerciseId: 'ex-9', duration: 60, completed: true },
        ],
      },
    ],
  },
  {
    id: 'wk-6',
    name: 'Yoga & Stretch',
    category: 'flexibility',
    date: '2026-03-16',
    startTime: '20:00',
    endTime: '20:45',
    durationMinutes: 45,
    caloriesBurned: 120,
    mood: 5,
    completed: true,
    exercises: [
      {
        id: 'we-12',
        exercise: mockExercises[11], // Yoga Flow
        sets: [
          { id: 's-36', exerciseId: 'ex-12', duration: 2700, completed: true },
        ],
      },
    ],
  },
  {
    id: 'wk-7',
    name: 'Upper Body Power',
    category: 'strength',
    date: '2026-03-14',
    startTime: '07:00',
    endTime: '08:15',
    durationMinutes: 75,
    caloriesBurned: 460,
    mood: 4,
    completed: true,
    exercises: [
      {
        id: 'we-13',
        exercise: mockExercises[0], // Bench Press
        sets: [
          { id: 's-37', exerciseId: 'ex-1', reps: 5, weight: 90, completed: true },
          { id: 's-38', exerciseId: 'ex-1', reps: 5, weight: 90, completed: true },
          { id: 's-39', exerciseId: 'ex-1', reps: 5, weight: 90, completed: true },
        ],
      },
    ],
    notes: 'Working up slowly, feel good.',
  },
]

// ─── Goals ────────────────────────────────────────────────────────────────────

export const mockGoals: Goal[] = [
  {
    id: 'goal-1',
    title: 'Bench Press 100kg',
    description: 'Hit a 100kg bench press 1RM',
    targetValue: 100,
    currentValue: 87.5,
    unit: 'kg',
    deadline: '2026-06-01',
    category: 'strength',
    completed: false,
    createdAt: '2026-01-01',
  },
  {
    id: 'goal-2',
    title: 'Run a 10K',
    description: 'Complete a 10km run under 55 minutes',
    targetValue: 10,
    currentValue: 7.2,
    unit: 'km',
    deadline: '2026-05-15',
    category: 'cardio',
    completed: false,
    createdAt: '2026-01-01',
  },
  {
    id: 'goal-3',
    title: 'Workout 4x per week',
    description: 'Train at least 4 days every week for 3 months',
    targetValue: 48,
    currentValue: 38,
    unit: 'sessions',
    deadline: '2026-04-01',
    category: 'custom',
    completed: false,
    createdAt: '2026-01-01',
  },
  {
    id: 'goal-4',
    title: 'Squat 120kg',
    description: 'Achieve a 120kg back squat',
    targetValue: 120,
    currentValue: 115,
    unit: 'kg',
    deadline: '2026-04-30',
    category: 'strength',
    completed: false,
    createdAt: '2026-02-01',
  },
  {
    id: 'goal-5',
    title: '30 consecutive pull-ups',
    description: 'Do 30 unbroken pull-ups',
    targetValue: 30,
    currentValue: 10,
    unit: 'reps',
    deadline: '2026-07-01',
    category: 'strength',
    completed: false,
    createdAt: '2026-01-15',
  },
]

// ─── Personal Records ─────────────────────────────────────────────────────────

export const mockPRs: PersonalRecord[] = [
  { id: 'pr-1', exerciseId: 'ex-1', exerciseName: 'Bench Press',    value: 87.5, unit: 'kg', date: '2026-03-24', previousValue: 85 },
  { id: 'pr-2', exerciseId: 'ex-2', exerciseName: 'Squat',          value: 115,  unit: 'kg', date: '2026-03-20', previousValue: 110 },
  { id: 'pr-3', exerciseId: 'ex-3', exerciseName: 'Deadlift',       value: 130,  unit: 'kg', date: '2026-03-22', previousValue: 125 },
  { id: 'pr-4', exerciseId: 'ex-4', exerciseName: 'Pull-Up',        value: 10,   unit: 'reps', date: '2026-03-22', previousValue: 9 },
  { id: 'pr-5', exerciseId: 'ex-5', exerciseName: 'Overhead Press', value: 57.5, unit: 'kg', date: '2026-03-24', previousValue: 55 },
  { id: 'pr-6', exerciseId: 'ex-7', exerciseName: 'Running',        value: 7200, unit: 'm', date: '2026-03-19', previousValue: 6500 },
]

// ─── Weekly Stats ─────────────────────────────────────────────────────────────

export const mockWeeklyStats: WeeklyStats[] = [
  { weekLabel: 'Jan W1', workouts: 3, minutes: 165, calories: 1100, strengthSessions: 2, cardioSessions: 1 },
  { weekLabel: 'Jan W2', workouts: 4, minutes: 210, calories: 1420, strengthSessions: 3, cardioSessions: 1 },
  { weekLabel: 'Jan W3', workouts: 3, minutes: 190, calories: 1280, strengthSessions: 2, cardioSessions: 1 },
  { weekLabel: 'Jan W4', workouts: 5, minutes: 270, calories: 1850, strengthSessions: 3, cardioSessions: 2 },
  { weekLabel: 'Feb W1', workouts: 4, minutes: 225, calories: 1530, strengthSessions: 3, cardioSessions: 1 },
  { weekLabel: 'Feb W2', workouts: 4, minutes: 235, calories: 1590, strengthSessions: 3, cardioSessions: 1 },
  { weekLabel: 'Feb W3', workouts: 5, minutes: 295, calories: 1980, strengthSessions: 4, cardioSessions: 1 },
  { weekLabel: 'Feb W4', workouts: 3, minutes: 175, calories: 1190, strengthSessions: 2, cardioSessions: 1 },
  { weekLabel: 'Mar W1', workouts: 4, minutes: 245, calories: 1660, strengthSessions: 3, cardioSessions: 1 },
  { weekLabel: 'Mar W2', workouts: 5, minutes: 280, calories: 1870, strengthSessions: 3, cardioSessions: 2 },
  { weekLabel: 'Mar W3', workouts: 4, minutes: 255, calories: 1720, strengthSessions: 3, cardioSessions: 1 },
  { weekLabel: 'Mar W4', workouts: 3, minutes: 195, calories: 1320, strengthSessions: 2, cardioSessions: 1 },
]

// ─── Daily Activity ───────────────────────────────────────────────────────────

export const mockDailyActivity: DailyActivity[] = [
  { date: '2026-03-24', steps: 8_420, caloriesBurned: 620, activeMinutes: 85, workoutId: 'wk-1' },
  { date: '2026-03-23', steps: 6_100, caloriesBurned: 380, activeMinutes: 42 },
  { date: '2026-03-22', steps: 9_850, caloriesBurned: 710, activeMinutes: 92, workoutId: 'wk-2' },
  { date: '2026-03-21', steps: 5_200, caloriesBurned: 320, activeMinutes: 30 },
  { date: '2026-03-20', steps: 7_600, caloriesBurned: 740, activeMinutes: 110, workoutId: 'wk-3' },
  { date: '2026-03-19', steps: 10_200, caloriesBurned: 620, activeMinutes: 72, workoutId: 'wk-4' },
  { date: '2026-03-18', steps: 4_900, caloriesBurned: 290, activeMinutes: 25 },
  { date: '2026-03-17', steps: 8_100, caloriesBurned: 520, activeMinutes: 68, workoutId: 'wk-5' },
]
