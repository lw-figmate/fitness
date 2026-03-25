import figma from '@figma/code-connect'
import Badge from '../src/components/ui/Badge/Badge'

figma.connect(
  Badge,
  'https://www.figma.com/design/E8jkfAtko959z87GfJQN4Y/FitTrack-DS?node-id=38-134',
  {
    props: {
      variant: figma.enum('Variant', {
        default:     'neutral',
        info:        'info',
        success:     'success',
        warning:     'warning',
        danger:      'danger',
        brand:       'brand',
        neutral:     'neutral',
        strength:    'strength',
        cardio:      'cardio',
        flexibility: 'flexibility',
        hiit:        'hiit',
        rest:        'rest',
      }),
      size: figma.enum('Size', {
        sm: 'sm',
        md: 'md',
        lg: 'lg',
      }),
      appearance: figma.enum('Appearance', {
        filled:  'solid',
        outline: 'subtle',
      }),
      children: figma.string('label'),
    },
    example: ({ variant, size, appearance, children }) => (
      <Badge variant={variant} size={size} appearance={appearance}>
        {children}
      </Badge>
    ),
  },
)
