import type { Meta, StoryObj } from '@storybook/react'
import Avatar, { AvatarGroup } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] },
    status: { control: 'select', options: [undefined, 'online', 'offline', 'busy', 'away'] },
  },
  args: {
    name: 'Alex Johnson',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithInitials: Story = {}

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=3',
    alt: 'Alex Johnson',
  },
}

export const Online: Story = {
  args: { status: 'online' },
}

export const Busy: Story = {
  args: { status: 'busy' },
}

export const Away: Story = {
  args: { status: 'away' },
}

export const Offline: Story = {
  args: { status: 'offline' },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const).map(size => (
        <Avatar key={size} name="Alex Johnson" size={size} />
      ))}
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup
      avatars={[
        { name: 'Alex Johnson' },
        { name: 'Sam Lee' },
        { name: 'Jordan Park' },
        { name: 'Casey Kim' },
        { name: 'Riley Chen' },
        { name: 'Morgan Wu' },
      ]}
      max={4}
      size="sm"
    />
  ),
}
