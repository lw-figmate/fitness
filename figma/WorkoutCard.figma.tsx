import figma from '@figma/code-connect'
import WorkoutCard from '../src/components/fitness/WorkoutCard/WorkoutCard'
import type { Workout } from '../src/types'

const exampleWorkout: Workout = {
  id: 'w1',
  name: 'Bench Press',
  category: 'strength',
  date: '2026-03-24',
  startTime: '9:00 AM',
  duration: 45,
  exercises: [],
  notes: '',
}

figma.connect(
  WorkoutCard,
  'https://www.figma.com/design/E8jkfAtko959z87GfJQN4Y/FitTrack-DS?node-id=45-74',
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
      title: figma.string('title'),
      meta:  figma.string('meta'),
    },
    example: ({ category, title }) => (
      <WorkoutCard
        workout={{ ...exampleWorkout, name: title, category }}
      />
    ),
  },
)
