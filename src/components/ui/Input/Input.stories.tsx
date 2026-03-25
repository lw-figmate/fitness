import type { Meta, StoryObj } from '@storybook/react'
import Input from './Input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    state: { control: 'select', options: ['default', 'success', 'error'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    label: 'Field Label',
    placeholder: 'Enter value…',
    size: 'md',
    state: 'default',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {}

export const WithValue: Story = {
  args: { defaultValue: '42 kg' },
}

export const Focus: Story = {
  args: { autoFocus: true },
}

export const Success: Story = {
  args: {
    state: 'success',
    defaultValue: 'alex@fitness.app',
    label: 'Email',
    hint: 'Email confirmed.',
  },
}

export const Error: Story = {
  args: {
    state: 'error',
    label: 'Weight',
    hint: 'This field is required.',
  },
}

export const Required: Story = {
  args: { required: true, label: 'Username' },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Read only', label: 'Status' },
}

export const Small: Story = {
  args: { size: 'sm', label: 'Small Input' },
}

export const Large: Story = {
  args: { size: 'lg', label: 'Large Input' },
}
