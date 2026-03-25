import figma from '@figma/code-connect'
import Avatar from '../src/components/ui/Avatar/Avatar'

figma.connect(
  Avatar,
  'https://www.figma.com/design/E8jkfAtko959z87GfJQN4Y/FitTrack-DS?node-id=41-68',
  {
    props: {
      size: figma.enum('Size', {
        xs:  'xs',
        sm:  'sm',
        md:  'md',
        lg:  'lg',
        xl:  'xl',
        xxl: 'xxl',
      }),
      status: figma.enum('Status', {
        none:    undefined,
        online:  'online',
        offline: 'offline',
        away:    'away',
        busy:    'busy',
      }),
      name: figma.string('initials'),
    },
    example: ({ size, status, name }) => (
      <Avatar name={name} size={size} status={status} />
    ),
  },
)
