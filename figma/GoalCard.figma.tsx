import figma from '@figma/code-connect'
import GoalCard from '../src/components/fitness/GoalCard/GoalCard'
import type { Goal } from '../src/types'

const exampleGoal: Goal = {
  id: 'g1',
  title: 'Strength Goal',
  description: 'Complete 3x per week for 8 weeks.',
  category: 'strength',
  targetValue: 100,
  currentValue: 65,
  unit: '%',
  deadline: '2026-03-31',
  completed: false,
  createdAt: '2026-01-01',
}

figma.connect(
  GoalCard,
  'https://www.figma.com/design/E8jkfAtko959z87GfJQN4Y/FitTrack-DS?node-id=46-182',
  {
    props: {
      category: figma.enum('Category', {
        strength:    'strength',
        cardio:      'cardio',
        flexibility: 'flexibility',
        hiit:        'hiit',
        rest:        'rest',
        custom:      'custom',
      }),
      title:    figma.string('title'),
      progress: figma.string('progress'),
      deadline: figma.string('deadline'),
    },
    example: ({ category, title }) => (
      <GoalCard goal={{ ...exampleGoal, title, category }} />
    ),
  },
)
