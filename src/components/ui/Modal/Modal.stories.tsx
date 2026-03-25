import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Modal from './Modal'
import Button from '../Button/Button'

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'fullscreen'] },
    persistent: { control: 'boolean' },
    open: { control: 'boolean' },
  },
  args: {
    title: 'Modal Title',
    size: 'md',
    persistent: false,
  },
  parameters: {
    // Render modals inline so they're visible in the canvas
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Modal>

// Controlled wrapper so the open/close button works in the canvas
const ModalDemo = (args: React.ComponentProps<typeof Modal>) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="secondary" size="md" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" size="md" onClick={() => setOpen(false)}>Confirm</Button>
          </div>
        }
      >
        <p style={{ margin: 0, opacity: 0.8 }}>This is the modal body content. You can put any content here.</p>
      </Modal>
    </>
  )
}

export const Default: Story = {
  render: (args) => <ModalDemo {...args} />,
}

export const Small: Story = {
  args: { size: 'sm', title: 'Confirm Delete' },
  render: (args) => <ModalDemo {...args} />,
}

export const Large: Story = {
  args: { size: 'lg', title: 'Workout Details' },
  render: (args) => <ModalDemo {...args} />,
}

export const WithSubtitle: Story = {
  args: { subtitle: 'Review your changes before continuing.' },
  render: (args) => <ModalDemo {...args} />,
}

export const Persistent: Story = {
  args: { persistent: true, title: 'Required Action' },
  render: (args) => <ModalDemo {...args} />,
}
