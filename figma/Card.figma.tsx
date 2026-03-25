import figma from '@figma/code-connect'
import Card from '../src/components/ui/Card/Card'

figma.connect(
  Card,
  'https://www.figma.com/design/E8jkfAtko959z87GfJQN4Y/FitTrack-DS?node-id=42-52',
  {
    props: {
      variant: figma.enum('Variant', {
        default:  'default',
        elevated: 'elevated',
        muted:    'ghost',
        outlined: 'outlined',
        ghost:    'ghost',
      }),
      title:    figma.string('title'),
      subtitle: figma.string('subtitle'),
    },
    example: ({ variant, title, subtitle }) => (
      <Card variant={variant} padding="md">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </Card>
    ),
  },
)
