import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { BookIcon } from '@phosphor-icons/react'
import { Chip } from './index'

const meta = {
  title: 'Common/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Enlace o botón con forma de píldora. Con `to` se renderiza como `NavLink` y el estado activo lo resuelve el router; sin `to`, es un botón con estado `active` manual.',
      },
    },
  },
  args: { children: 'Gramática', onClick: fn() },
  argTypes: {
    size: { control: 'inline-radio', options: ['md', 'sm'] },
    active: { control: 'boolean' },
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

/** Chip pulsable con estado inactivo por defecto. */
export const Playground: Story = {}

/** Comparación entre estado activo e inactivo. */
export const Active: Story = {
  render: args => (
    <div className="flex items-center gap-2">
      <Chip {...args} active children="Activo" />
      <Chip {...args} active={false} children="Inactivo" />
    </div>
  ),
}

/** Tamaños disponibles. */
export const Sizes: Story = {
  render: args => (
    <div className="flex items-center gap-2">
      <Chip {...args} size="md" children="Mediano" />
      <Chip {...args} size="sm" children="Pequeño" />
    </div>
  ),
}

/** Chip con icono a la izquierda. */
export const WithIcon: Story = {
  args: { icon: <BookIcon size={18} />, children: 'Gramática' },
}

/** Como enlace, el chip marca su estado activo según la ruta actual. */
export const AsLink: Story = {
  args: { to: '/', children: 'Inicio' },
}

/** El chip pulsable notifica el clic. */
export const ClickInteraction: Story = {
  args: { children: 'Vocabulario' },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Vocabulario' }))
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}
