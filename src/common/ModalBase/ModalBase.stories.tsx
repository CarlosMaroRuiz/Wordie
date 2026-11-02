import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ModalBase } from '.'
import { Button } from '@common/Button'

const meta = {
  component: ModalBase,
  tags: ['autodocs'],
  args: {
    open: true,
    onClose: () => {},
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof ModalBase>

export default meta
type Story = StoryObj<typeof meta>

function ModalDemo(props: React.ComponentProps<typeof ModalBase>) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Abrir modal
      </Button>
      <ModalBase {...props} open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export const Default: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    open: false,
    onClose: () => {},
    title: 'Título del modal',
    subtitle: 'Subtítulo',
    children: (
      <p className="text-sm text-text-secondary">
        Contenido del modal de ejemplo. Aquí puedes colocar cualquier contenido.
      </p>
    ),
    footer: (
      <div className="text-center">
        <Button variant="primary" size="md">
          Acción principal
        </Button>
      </div>
    ),
  },
}

export const Small: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    open: false,
    onClose: () => {},
    title: 'Modal pequeño',
    size: 'sm',
    children: <p className="text-sm text-text-secondary">Contenido compacto.</p>,
  },
}

export const Large: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    open: false,
    onClose: () => {},
    title: 'Modal grande',
    size: 'lg',
    scrollable: true,
    children: (
      <div className="space-y-4 text-sm text-text-secondary">
        {Array.from({ length: 8 }, (_, i) => (
          <p key={i}>
            Párrafo {i + 1} con contenido suficiente para demostrar el scroll
            del modal cuando tiene mucho contenido largo y repetitivo.
          </p>
        ))}
      </div>
    ),
  },
}

export const NoFooter: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    open: false,
    onClose: () => {},
    title: 'Sin footer',
    children: <p className="text-sm text-text-secondary">Modal sin acciones de footer.</p>,
  },
}
