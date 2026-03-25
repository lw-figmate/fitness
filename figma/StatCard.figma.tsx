import figma from '@figma/code-connect'
import StatCard from '../src/components/fitness/StatCard/StatCard'

figma.connect(
  StatCard,
  'https://www.figma.com/design/E8jkfAtko959z87GfJQN4Y/FitTrack-DS?node-id=47-56',
  {
    props: {
      size: figma.enum('Size', {
        sm: 'sm',
        md: 'md',
        lg: 'lg',
      }),
      deltaDir: figma.enum('Delta', {
        up:      1,
        down:    -1,
        neutral: 0,
      }),
      value: figma.string('value'),
      label: figma.string('label'),
      delta: figma.string('delta'),
    },
    example: ({ size, deltaDir, value, label }) => (
      <StatCard
        label={label}
        value={value}
        size={size}
        delta={deltaDir}
      />
    ),
  },
)
