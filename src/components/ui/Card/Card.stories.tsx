import type { Meta, StoryObj } from '@storybook/react'
import Card, { CardHeader, CardBody, CardFooter } from './Card'
import Badge from '../Badge/Badge'
import Button from '../Button/Button'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'elevated', 'outlined', 'ghost', 'filled'] },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'xl'] },
    interactive: { control: 'boolean' },
    accentColor: { control: 'color' },
  },
  args: {
    variant: 'elevated',
    padding: 'lg',
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: (args) => (
    <Card {...args} style={{ width: 280 }}>
      <CardHeader>
        <span style={{ fontWeight: 600 }}>Card Title</span>
        <Badge variant="brand" size="sm">New</Badge>
      </CardHeader>
      <CardBody>
        <p style={{ margin: 0, fontSize: 14, opacity: 0.7 }}>Supporting text for the card content area.</p>
      </CardBody>
      <CardFooter>
        <span style={{ fontSize: 12, opacity: 0.5 }}>2 hours ago</span>
        <Button variant="ghost" size="sm">View →</Button>
      </CardFooter>
    </Card>
  ),
}

export const Outlined: Story = {
  ...Default,
  args: { variant: 'outlined' },
}

export const WithAccentBar: Story = {
  render: (args) => (
    <Card {...args} accentColor="var(--color-cat-strength)" style={{ width: 280 }}>
      <CardHeader>
        <span style={{ fontWeight: 600 }}>Strength Session</span>
      </CardHeader>
      <CardBody>
        <p style={{ margin: 0, fontSize: 14, opacity: 0.7 }}>45 mins · 3 exercises</p>
      </CardBody>
    </Card>
  ),
}

export const Interactive: Story = {
  args: { interactive: true },
  render: (args) => (
    <Card {...args} style={{ width: 280, cursor: 'pointer' }}>
      <CardBody>Click me — I have hover and active states.</CardBody>
    </Card>
  ),
}

export const Ghost: Story = {
  args: { variant: 'ghost' },
  render: (args) => (
    <Card {...args} style={{ width: 280 }}>
      <CardBody>Ghost card — no background.</CardBody>
    </Card>
  ),
}
