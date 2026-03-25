import type { Meta, StoryObj } from '@storybook/react'
import Progress from './Progress'

const meta: Meta<typeof Progress> = {
  title: 'UI/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['brand', 'success', 'warning', 'danger', 'info', 'strength', 'cardio', 'flexibility', 'hiit', 'gradient'],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    animated: { control: 'boolean' },
    striped: { control: 'boolean' },
    showValue: { control: 'boolean' },
  },
  args: {
    value: 65,
    max: 100,
    color: 'brand',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {}

export const WithLabel: Story = {
  args: { label: 'Weekly Goal', showValue: true },
}

export const Strength: Story = {
  args: { value: 80, color: 'strength', label: 'Bench Press', showValue: true },
}

export const Cardio: Story = {
  args: { value: 45, color: 'cardio', label: 'Running Distance', showValue: true },
}

export const Success: Story = {
  args: { value: 100, color: 'success', label: 'Goal Completed', showValue: true },
}

export const Warning: Story = {
  args: { value: 30, color: 'warning', label: 'Low Activity', showValue: true },
}

export const Animated: Story = {
  args: { value: 72, color: 'brand', label: 'Loading', animated: true },
}

export const Striped: Story = {
  args: { value: 55, color: 'hiit', label: 'HIIT Progress', striped: true },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 300 }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
        <Progress key={size} value={65} size={size} color="brand" label={size} />
      ))}
    </div>
  ),
}
