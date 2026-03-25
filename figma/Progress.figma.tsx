import figma from '@figma/code-connect'
import Progress from '../src/components/ui/Progress/Progress'

figma.connect(
  Progress,
  'https://www.figma.com/design/E8jkfAtko959z87GfJQN4Y/FitTrack-DS?node-id=40-102',
  {
    props: {
      color: figma.enum('Color', {
        brand:       'brand',
        success:     'success',
        warning:     'warning',
        danger:      'danger',
        info:        'info',
        strength:    'strength',
        cardio:      'cardio',
        flexibility: 'flexibility',
        hiit:        'hiit',
        gradient:    'gradient',
      }),
      size: figma.enum('Size', {
        xs: 'xs',
        sm: 'sm',
        md: 'md',
        lg: 'lg',
        xl: 'xl',
      }),
    },
    example: ({ color, size }) => (
      <Progress value={65} max={100} color={color} size={size} />
    ),
  },
)
