import type { Meta, StoryObj } from '@storybook/react'
import WorkoutCard from './WorkoutCard'
import type { Workout } from '../../../types'

const baseWorkout: Workout = {
  id: '1',
  name: 'Morning Strength',
  category: 'strength',
  date: '2026-03-24',
  startTime: '07:00',
  durationMinutes: 55,
  caloriesBurned: 420,
  completed: true,
  mood: 4,
  notes: 'Felt great today. New PR on bench.',
  exercises: [
    {
      id: 'e1',
      exercise: { id: 'ex1', name: 'Bench Press', category: 'strength', muscleGroups: ['chest'] },
      sets: [
        { id: 's1', exerciseId: 'ex1', reps: 8, weight: 80, completed: true },
        { id: 's2', exerciseId: 'ex1', reps: 8, weight: 80, completed: true },
        { id: 's3', exerciseId: 'ex1', reps: 6, weight: 85, completed: true },
      ],
    },
    {
      id: 'e2',
      exercise: { id: 'ex2', name: 'Squat', category: 'strength', muscleGroups: ['quads', 'glutes'] },
      sets: [
        { id: 's4', exerciseId: 'ex2', reps: 5, weight: 100, completed: true },
        { id: 's5', exerciseId: 'ex2', reps: 5, weight: 100, completed: true },
      ],
    },
  ],
}

const meta: Meta<typeof WorkoutCard> = {
  title: 'Fitness/WorkoutCard',
  component: WorkoutCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  args: { workout: baseWorkout },
}

export default meta
type Story = StoryObj<typeof WorkoutCard>

export const Strength: Story = {}

export const Cardio: Story = {
  args: {
    workout: {
      ...baseWorkout,
      id: '2',
      name: 'Evening Run',
      category: 'cardio',
      durationMinutes: 40,
      caloriesBurned: 380,
      mood: 5,
      notes: undefined,
    },
  },
}

export const HIIT: Story = {
  args: {
    workout: {
      ...baseWorkout,
      id: '3',
      name: 'HIIT Circuit',
      category: 'hiit',
      durationMinutes: 25,
      caloriesBurned: 310,
      mood: 3,
    },
  },
}

export const Flexibility: Story = {
  args: {
    workout: {
      ...baseWorkout,
      id: '4',
      name: 'Yoga Flow',
      category: 'flexibility',
      durationMinutes: 45,
      caloriesBurned: 120,
      mood: 5,
    },
  },
}

export const Rest: Story = {
  args: {
    workout: {
      ...baseWorkout,
      id: '5',
      name: 'Rest Day',
      category: 'rest',
      durationMinutes: 0,
      caloriesBurned: 0,
      mood: undefined,
      notes: undefined,
      exercises: [],
    },
  },
}

export const WithNotes: Story = {
  args: {
    workout: {
      ...baseWorkout,
      notes: 'Felt great today. Hit a new PR on bench press — 87.5kg for 3 reps!',
    },
  },
}
