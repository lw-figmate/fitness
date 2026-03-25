import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'outline', 'danger', 'dangerGhost', 'success'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {}

export const Secondary: Story = {
  args: { variant: 'secondary' },
}

export const Ghost: Story = {
  args: { variant: 'ghost' },
}

export const Outline: Story = {
  args: { variant: 'outline' },
}

export const Danger: Story = {
  args: { variant: 'danger' },
}

export const Success: Story = {
  args: { variant: 'success', children: 'Saved' },
}

export const Loading: Story = {
  args: { loading: true, children: 'Saving…' },
}

export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Start Workout' },
}

export const Small: Story = {
  args: { size: 'sm', children: 'Small' },
}

export const Large: Story = {
  args: { size: 'lg', children: 'Large' },
}

export const XLarge: Story = {
  args: { size: 'xl', children: 'Extra Large' },
}

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
}
