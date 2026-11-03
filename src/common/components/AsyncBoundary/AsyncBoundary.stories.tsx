import type { Meta, StoryObj } from '@storybook/react-vite'
import { AsyncBoundary } from './index'

const meta = {
  title: 'Common/AsyncBoundary',
  component: AsyncBoundary,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Decide entre skeleton, tarjeta de error y contenido. Reemplaza el `if (isLoading) return <SkeletonPage />` / `if (error) return <ErrorState />` que se repetía en cada vista.',
      },
    },
  },
  args: {
    isLoading: false,
    error: null,
    errorTitle: 'No se pudo cargar la vista',
    onRetry: () => {},
    children: <p className="text-text-main">Contenido de la vista.</p>,
  },
  argTypes: {
    isLoading: { control: 'boolean' },
  },
} satisfies Meta<typeof AsyncBoundary>

export default meta
type Story = StoryObj<typeof meta>

/** Estado listo: renderiza los hijos. */
export const Ready: Story = {}

/** Estado de carga: muestra el `SkeletonPage` por defecto. */
export const Loading: Story = {
  args: { isLoading: true },
}

/** Estado de error: tarjeta con reintento y el mensaje real del error. */
export const WithError: Story = {
  args: { error: new Error('HTTP 503: servicio no disponible') },
}

/** Fallback de carga personalizado. */
export const CustomLoading: Story = {
  args: {
    isLoading: true,
    loadingFallback: <p className="text-sm text-text-secondary">Cargando tus tarjetas…</p>,
  },
}
