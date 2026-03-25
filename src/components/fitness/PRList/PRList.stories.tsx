import type { Meta, StoryObj } from '@storybook/react'
import PRList from './PRList'
import type { PersonalRecord } from '../../../types'

const records: PersonalRecord[] = [
  { id: '1', exerciseId: 'ex1', exerciseName: 'Bench Press 1RM',  value: 105, unit: 'kg', date: '2026-03-15', previousValue: 97.5 },
  { id: '2', exerciseId: 'ex2', exerciseName: 'Squat 1RM',        value: 130, unit: 'kg', date: '2026-03-10', previousValue: 125 },
  { id: '3', exerciseId: 'ex3', exerciseName: 'Deadlift 1RM',     value: 160, unit: 'kg', date: '2026-03-01', previousValue: 155 },
  { id: '4', exerciseId: 'ex4', exerciseName: '5km Run',          value: 22.5, unit: 'min', date: '2026-02-20', previousValue: 24 },
  { id: '5', exerciseId: 'ex5', exerciseName: 'Pull-ups',         value: 15, unit: 'reps', date: '2026-02-14', previousValue: 12 },
  { id: '6', exerciseId: 'ex6', exerciseName: 'Overhead Press',   value: 72.5, unit: 'kg', date: '2026-01-30', previousValue: 70 },
]

const meta: Meta<typeof PRList> = {
  title: 'Fitness/PRList',
  component: PRList,
  tags: ['autodocs'],
  argTypes: {
    maxItems: { control: { type: 'range', min: 1, max: 10, step: 1 } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
  args: { records, maxItems: 5 },
}

export default meta
type Story = StoryObj<typeof PRList>

export const Default: Story = {}

export const Top3: Story = {
  args: { maxItems: 3 },
}

export const SingleRecord: Story = {
  args: { records: records.slice(0, 1), maxItems: 1 },
}

export const NoImprovement: Story = {
  args: {
    records: records.map(r => ({ ...r, previousValue: undefined })),
  },
}
