import type { Preview } from '@storybook/react'
import '../src/styles/globals.css'
import '../src/styles/tokens.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0f0f12' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    controls: { matchers: { color: /(color|Color)$/i } },
  },
}

export default preview
