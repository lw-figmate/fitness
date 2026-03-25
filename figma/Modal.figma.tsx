import figma from '@figma/code-connect'
import Modal from '../src/components/ui/Modal/Modal'

figma.connect(
  Modal,
  'https://www.figma.com/design/E8jkfAtko959z87GfJQN4Y/FitTrack-DS?node-id=44-72',
  {
    props: {
      size: figma.enum('Size', {
        xs: 'sm',
        sm: 'sm',
        md: 'md',
        lg: 'lg',
        xl: 'xl',
      }),
      title:    figma.string('title'),
      children: figma.string('body'),
    },
    example: ({ size, title, children }) => (
      <Modal open={true} onClose={() => {}} title={title} size={size}>
        {children}
      </Modal>
    ),
  },
)
