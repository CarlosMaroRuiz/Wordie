import type { Meta, StoryObj } from '@storybook/react-vite'
import { BookOpenIcon } from '@phosphor-icons/react'
import { Badge } from './index'

const meta = {
  title: 'Common/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Etiqueta no interactiva para niveles, categorías y estados. Los colores salen de los tokens de tema, así que funciona en claro y oscuro sin overrides.',
      },
    },
  },
  args: { children: 'B1', tone: 'primary' },
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['primary', 'primary-soft', 'brand-soft', 'success', 'warning', 'error', 'info', 'neutral'],
    },
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] },
    weight: { control: 'inline-radio', options: ['bold', 'semibold'] },
    uppercase: { control: 'boolean' },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

/** Etiqueta base con el tono por defecto. */
export const Playground: Story = {}

/** Los ocho tonos disponibles. */
export const Tones: Story = {
  render: args => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge {...args} tone="primary" />
      <Badge {...args} tone="primary-soft" />
      <Badge {...args} tone="brand-soft" />
      <Badge {...args} tone="success" children="A2" />
      <Badge {...args} tone="warning" children="Medio" />
      <Badge {...args} tone="error" children="Difícil" />
      <Badge {...args} tone="info" children="Info" />
      <Badge {...args} tone="neutral" children="Neutro" />
    </div>
  ),
}

/** Los cuatro tamaños. */
export const Sizes: Story = {
  render: args => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge {...args} size="xs" children="xs" />
      <Badge {...args} size="sm" children="sm" />
      <Badge {...args} size="md" children="md" />
      <Badge {...args} size="lg" children="lg" />
    </div>
  ),
}

/** Con icono a la izquierda, como en los heroes. */
export const WithIcon: Story = {
  args: { icon: <BookOpenIcon size={14} weight="bold" />, children: 'GUÍA OFICIAL IPA', uppercase: true },
}
