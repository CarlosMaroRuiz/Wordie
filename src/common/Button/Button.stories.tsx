import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { PlusIcon, TrashIcon } from '@phosphor-icons/react'
import { Button } from './index'

const meta = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Botón animado con Motion. `success` y `danger` usan texto oscuro porque blanco sobre sus fondos no llega al 4.5:1 de AA.',
      },
    },
  },
  args: {
    children: 'Continuar',
    variant: 'primary',
    size: 'lg',
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'success', 'danger', 'icon', 'iconPrimary'],
    },
    size: { control: 'inline-radio', options: ['lg', 'md', 'sm'] },
    fullWidth: { control: 'boolean' },
    arrow: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/** Configuración por defecto, editable desde el panel de controles. */
export const Playground: Story = {}

/** Las cinco variantes con texto. */
export const Variants: Story = {
  render: args => (
    <div className="flex flex-wrap items-center gap-3">
      {(['primary', 'secondary', 'ghost', 'success', 'danger'] as const).map(variant => (
        <Button {...args} key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
}

/** Los tres tamaños disponibles. */
export const Sizes: Story = {
  render: args => (
    <div className="flex flex-wrap items-center gap-3">
      {(['lg', 'md', 'sm'] as const).map(size => (
        <Button {...args} key={size} size={size} fullWidth={false}>
          Tamaño {size}
        </Button>
      ))}
    </div>
  ),
}

/** Botón con flecha decorativa al extremo derecho. */
export const WithArrow: Story = {
  args: { arrow: true, children: 'Empezar lección' },
}

/** Botón que ocupa todo el ancho de su contenedor. */
export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Guardar cambios' },
  render: args => (
    <div className="w-full max-w-sm">
      <Button {...args} />
    </div>
  ),
}

/** Botón bloqueado: sin interacción y con opacidad reducida. */
export const Disabled: Story = {
  args: { disabled: true, children: 'No disponible' },
}

/** Variantes de solo icono, como cierre o acción rápida. */
export const IconButtons: Story = {
  render: args => (
    <div className="flex items-center gap-3">
      <Button {...args} variant="icon" aria-label="Añadir" children={<PlusIcon size={20} weight="bold" />} />
      <Button
        {...args}
        variant="iconPrimary"
        aria-label="Eliminar"
        children={<TrashIcon size={20} weight="bold" />}
      />
    </div>
  ),
}

/** Al pulsar, el botón notifica una sola vez a su manejador. */
export const ClickInteraction: Story = {
  args: { children: 'Enviar' },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Enviar' }))
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

/** Un botón deshabilitado queda marcado como tal y no dispara el manejador. */
export const DisabledDoesNotFire: Story = {
  args: { children: 'Bloqueado', disabled: true },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Bloqueado' })
    await expect((button as HTMLButtonElement).disabled).toBe(true)
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}
