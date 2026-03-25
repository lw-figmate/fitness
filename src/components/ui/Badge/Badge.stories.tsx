import type { Meta, StoryObj } from '@storybook/react'
import Badge from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger', 'brand', 'neutral', 'strength', 'cardio', 'flexibility', 'hiit', 'rest'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    appearance: { control: 'select', options: ['solid', 'subtle'] },
    dot: { control: 'boolean' },
  },
  args: {
    children: 'Badge',
    variant: 'brand',
    size: 'md',
    appearance: 'solid',
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {}

export const Success: Story = {
  args: { variant: 'success', children: 'Completed' },
}

export const Warning: Story = {
  args: { variant: 'warning', children: 'Due Soon' },
}

export const Danger: Story = {
  args: { variant: 'danger', children: 'Overdue' },
}

export const Subtle: Story = {
  args: { variant: 'brand', appearance: 'subtle', children: '3 days left' },
}

export const WithDot: Story = {
  args: { variant: 'success', dot: true, children: 'Online' },
}

export const Strength: Story = {
  args: { variant: 'strength', children: 'Strength' },
}

export const Cardio: Story = {
  args: { variant: 'cardio', children: 'Cardio' },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Badge variant="brand" size="sm">Small</Badge>
      <Badge variant="brand" size="md">Medium</Badge>
      <Badge variant="brand" size="lg">Large</Badge>
    </div>
  ),
}
