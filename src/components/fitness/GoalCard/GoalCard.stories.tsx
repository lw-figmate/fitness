import type { Meta, StoryObj } from '@storybook/react'
import GoalCard from './GoalCard'
import type { Goal } from '../../../types'

const baseGoal: Goal = {
  id: '1',
  title: 'Bench Press 100 kg',
  description: 'Increase max bench press to 100 kg by end of Q2.',
  targetValue: 100,
  currentValue: 82,
  unit: 'kg',
  deadline: '2026-06-30',
  category: 'strength',
  completed: false,
  createdAt: '2026-01-01',
}

const meta: Meta<typeof GoalCard> = {
  title: 'Fitness/GoalCard',
  component: GoalCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  args: { goal: baseGoal },
}

export default meta
type Story = StoryObj<typeof GoalCard>

export const Default: Story = {}

export const NearDeadline: Story = {
  args: {
    goal: {
      ...baseGoal,
      id: '2',
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      currentValue: 60,
    },
  },
}

export const Overdue: Story = {
  args: {
    goal: {
      ...baseGoal,
      id: '3',
      deadline: '2026-02-01',
      currentValue: 70,
    },
  },
}

export const Completed: Story = {
  args: {
    goal: {
      ...baseGoal,
      id: '4',
      title: 'Run 5km',
      currentValue: 5,
      targetValue: 5,
      unit: 'km',
      category: 'cardio',
      completed: true,
    },
  },
}

export const CardioGoal: Story = {
  args: {
    goal: {
      ...baseGoal,
      id: '5',
      title: 'Weekly Cardio',
      description: 'Complete 3 cardio sessions per week.',
      currentValue: 2,
      targetValue: 3,
      unit: 'sessions',
      category: 'cardio',
    },
  },
}

export const FlexibilityGoal: Story = {
  args: {
    goal: {
      ...baseGoal,
      id: '6',
      title: 'Touch Toes',
      description: 'Improve flexibility to touch toes.',
      currentValue: 75,
      targetValue: 100,
      unit: '%',
      category: 'flexibility',
    },
  },
}
