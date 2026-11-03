import type { Meta, StoryObj } from '@storybook/react-vite'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { Button } from '@common/Button'
import { EmptyState } from './index'

const meta = {
  title: 'Common/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Mensaje para listas vacías o búsquedas sin resultados. Tres variantes de contenedor: sin caja, tarjeta y borde punteado.',
      },
    },
  },
  args: { title: 'No se encontraron resultados.' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['plain', 'card', 'dashed'] },
    size: { control: 'inline-radio', options: ['sm', 'base', 'lg'] },
  },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

/** Variante plana, para usar dentro de una sección existente. */
export const Playground: Story = {}

/** Contenedor tipo tarjeta. */
export const Card: Story = {
  args: { variant: 'card', size: 'lg', title: 'No se encontraron tarjetas de vocabulario.' },
}

/** Contenedor con borde punteado, típico de búsquedas filtradas. */
export const Dashed: Story = {
  args: {
    variant: 'dashed',
    size: 'sm',
    title: 'No se encontraron fonemas que coincidan con "/θ/".',
  },
}

/** Con icono y acción de recuperación. */
export const WithAction: Story = {
  args: {
    variant: 'dashed',
    size: 'sm',
    title: 'No hay frases para este filtro.',
    icon: <MagnifyingGlassIcon size={28} weight="bold" />,
    action: (
      <Button variant="secondary" size="sm">
        Limpiar filtros
      </Button>
    ),
  },
}
