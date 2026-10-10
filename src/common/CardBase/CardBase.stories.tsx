import type { Meta, StoryObj } from '@storybook/react-vite'
import { CardBase } from './index'
import { Chip } from '@common/Chip'

const meta = {
  title: 'Common/CardBase',
  component: CardBase,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Tarjeta contenedora con encabezado y acción opcionales. `goal` reproduce el degradado de la tarjeta "Meta de hoy".',
      },
    },
  },
  args: {
    heading: 'Meta de hoy',
    padding: 'md',
    variant: 'default',
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'filled', 'goal'] },
    padding: { control: 'inline-radio', options: ['none', 'sm', 'md'] },
    as: { control: 'inline-radio', options: ['div', 'article', 'section', 'aside'] },
  },
  decorators: [
    Story => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CardBase>

export default meta
type Story = StoryObj<typeof meta>

/** Tarjeta con encabezado y contenido. */
export const Playground: Story = {
  args: {
    children: <p className="text-sm text-text-secondary">Completa 3 lecciones para mantener la racha.</p>,
  },
}

/** Encabezado con una acción alineada a la derecha. */
export const WithAction: Story = {
  args: {
    action: <Chip size="sm">Cambiar</Chip>,
    children: <p className="text-sm text-text-secondary">Tres lecciones por delante.</p>,
  },
}

/** Tarjeta destacada en primario. */
export const Filled: Story = {
  args: {
    variant: 'filled',
    heading: 'Destacado',
    children: <p className="text-sm">Tarjeta con el color de identidad de la app.</p>,
  },
}

/** Tarjeta con degradado de objetivo. */
export const Goal: Story = {
  args: {
    variant: 'goal',
    heading: 'Objetivo semanal',
    action: <span className="text-sm font-bold text-primary">72%</span>,
    children: <p className="text-sm text-text-secondary">Cuatro de cinco días completados.</p>,
  },
}

/** La tarjeta puede renderizarse como `article` u otros contenedores. */
export const CustomElement: Story = {
  args: {
    as: 'article',
    heading: 'Lectura del día',
    children: <p className="text-sm text-text-secondary">The Daily Standup.</p>,
  },
}

/** Sin padding propio, útil para tarjetas que ya lo aplican por dentro. */
export const NoPadding: Story = {
  args: {
    padding: 'none',
    heading: 'Sin relleno',
    children: <p className="p-4 text-sm text-text-secondary">Contenido con su propio espaciado.</p>,
  },
}
