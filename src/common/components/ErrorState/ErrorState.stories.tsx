import type { Meta, StoryObj } from '@storybook/react-vite'
import { ErrorState } from './index'

const meta = {
  title: 'Common/ErrorState',
  component: ErrorState,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Tarjeta de estado de error de red con opción para reintentar la acción según los lineamientos de resiliencia UX del mockup.',
      },
    },
  },
} satisfies Meta<typeof ErrorState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Error de Red',
    message: 'No se pudo sincronizar el progreso.',
    retryText: 'Reintentar',
    onRetry: () => alert('Reintentando petición...'),
  },
}
