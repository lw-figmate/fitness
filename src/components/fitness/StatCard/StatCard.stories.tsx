import type { Meta, StoryObj } from '@storybook/react'
import StatCard from './StatCard'
import { IconDumbbell, IconRun, IconZap, IconHeart } from '../../icons'

const meta: Meta<typeof StatCard> = {
  title: 'Fitness/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    delta: { control: { type: 'range', min: -50, max: 50, step: 1 } },
    accentColor: { control: 'color' },
    iconColor: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 200 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof StatCard>

export const WorkoutsThisWeek: Story = {
  args: {
    label: 'Workouts',
    value: 4,
    unit: 'this week',
    icon: <IconDumbbell />,
    iconColor: 'var(--color-brand)',
    delta: 33,
  },
}

export const CaloriesBurned: Story = {
  args: {
    label: 'Calories Burned',
    value: '1,840',
    unit: 'kcal',
    icon: <IconZap />,
    iconColor: 'var(--color-cat-hiit)',
    delta: -5,
  },
}

export const RunningDistance: Story = {
  args: {
    label: 'Distance',
    value: '18.4',
    unit: 'km',
    icon: <IconRun />,
    iconColor: 'var(--color-cat-cardio)',
    delta: 12,
  },
}

export const ActiveMinutes: Story = {
  args: {
    label: 'Active Minutes',
    value: 320,
    unit: 'min',
    icon: <IconHeart />,
    iconColor: 'var(--color-danger)',
    delta: 0,
    subtitle: '5.3 hrs total',
  },
}

export const Flat: Story = {
  args: {
    label: 'Streak',
    value: 7,
    unit: 'days',
    icon: <IconZap />,
    iconColor: 'var(--color-warning)',
  },
}

export const Large: Story = {
  args: {
    label: 'Personal Best',
    value: '105',
    unit: 'kg',
    icon: <IconDumbbell />,
    iconColor: 'var(--color-cat-strength)',
    delta: 8,
    size: 'lg',
    subtitle: 'Bench Press',
  },
}
