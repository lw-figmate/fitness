import figma from '@figma/code-connect'
import Input from '../src/components/ui/Input/Input'

figma.connect(
  Input,
  'https://www.figma.com/design/E8jkfAtko959z87GfJQN4Y/FitTrack-DS?node-id=43-41',
  {
    props: {
      size: figma.enum('Size', {
        sm: 'sm',
        md: 'md',
        lg: 'lg',
      }),
      state: figma.enum('State', {
        default: 'default',
        focus:   'default',   // focus is a CSS state, not a React prop
        error:   'error',
      }),
      label:       figma.string('label'),
      placeholder: figma.string('placeholder'),
      hint:        figma.string('error-message'),
    },
    example: ({ size, state, label, placeholder, hint }) => (
      <Input
        label={label}
        size={size}
        state={state}
        placeholder={placeholder}
        hint={hint}
      />
    ),
  },
)
