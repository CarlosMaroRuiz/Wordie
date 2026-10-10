import type { Decorator, Preview } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import '../src/index.css'

/** Los componentes usan `Link`, `NavLink` y `useNavigate`; necesitan un router. */
const withRouter: Decorator = Story => (
  <MemoryRouter initialEntries={['/']}>
    <Story />
  </MemoryRouter>
)

const preview: Preview = {
  decorators: [withRouter],
  parameters: {
    layout: 'padded',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview;