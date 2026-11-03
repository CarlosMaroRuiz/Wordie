import type { Meta, StoryObj } from '@storybook/react-vite'
import { Chip } from '@common/Chip'
import { ChipRow } from './index'

const meta = {
  title: 'Common/ChipRow',
  component: ChipRow,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Fila de `Chip` para filtros. Oculta la scrollbar de forma consistente y aporta el `role`/`aria-label` del grupo.',
      },
    },
  },
  args: {
    label: 'Filtrar por categoría',
    children: (
      <>
        <Chip active>Todo</Chip>
        <Chip active={false}>Gramática</Chip>
        <Chip active={false}>Vocabulario</Chip>
      </>
    ),
  },
  argTypes: {
    as: { control: 'inline-radio', options: ['div', 'nav'] },
    role: { control: 'inline-radio', options: ['tablist', 'navigation'] },
    wrap: { control: 'boolean' },
  },
} satisfies Meta<typeof ChipRow>

export default meta
type Story = StoryObj<typeof meta>

/** Fila desplazable con scrollbar oculta. */
export const Scroll: Story = {}

/** Fila que envuelve en varias líneas. */
export const Wrap: Story = {
  args: { wrap: true },
}

/** Como `nav` con `role="tablist"`, el patrón que usan los filtros de Phonetics. */
export const AsTablist: Story = {
  args: { as: 'nav', role: 'tablist' },
}
