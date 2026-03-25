import figma from '@figma/code-connect'
import PRList from '../src/components/fitness/PRList/PRList'
import type { PersonalRecord } from '../src/types'

const exampleRecords: PersonalRecord[] = [
  {
    id: 'pr1',
    exerciseId: 'ex1',
    exerciseName: 'Bench Press 1RM',
    value: 225,
    unit: 'lbs',
    date: '2026-03-15',
  },
]

figma.connect(
  PRList,
  'https://www.figma.com/design/E8jkfAtko959z87GfJQN4Y/FitTrack-DS?node-id=47-88',
  {
    props: {
      rank:     figma.enum('Rank', {
        gold:    0,
        silver:  1,
        bronze:  2,
        default: 3,
      }),
      exercise: figma.string('exercise'),
      value:    figma.string('value'),
    },
    example: ({ exercise }) => (
      <PRList
        records={[{ ...exampleRecords[0], exerciseName: exercise }]}
        maxItems={4}
      />
    ),
  },
)
