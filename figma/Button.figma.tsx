import figma from '@figma/code-connect'
import Button from '../src/components/ui/Button/Button'

figma.connect(
  Button,
  'https://www.figma.com/design/E8jkfAtko959z87GfJQN4Y/FitTrack-DS?node-id=36-58',
  {
    props: {
      variant: figma.enum('Variant', {
        primary:   'primary',
        secondary: 'secondary',
        ghost:     'ghost',
        outline:   'outline',
        danger:    'danger',
        warning:   'primary',   // no warning variant in React — falls back to primary
        success:   'success',
      }),
      size: figma.enum('Size', {
        xs: 'sm',
        sm: 'sm',
        md: 'md',
        lg: 'lg',
      }),
      children: figma.string('label'),
    },
    example: ({ variant, size, children }) => (
      <Button variant={variant} size={size}>
        {children}
      </Button>
    ),
  },
)
