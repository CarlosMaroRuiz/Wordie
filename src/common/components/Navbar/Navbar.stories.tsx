import type { Meta, StoryObj } from '@storybook/react-vite'
import { NAV_ITEMS } from '@common/layouts/MainLayout/navItems'
import { Chip } from '@common/Chip'
import { Navbar } from './index'

const meta = {
  title: 'Common/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Cabecera fija con la marca, los chips de navegación y el selector de tema. Se comprime a una sola fila en `lg` y muestra borde al hacer scroll.',
      },
    },
  },
  args: {
    items: NAV_ITEMS,
  },
  argTypes: {
    showTopicSelector: { control: 'boolean' },
  },
  decorators: [
    Story => (
      <div className="min-h-56 bg-bg-page">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Navbar>

export default meta
type Story = StoryObj<typeof meta>

/** Cabecera completa con navegación y selector de tema. */
export const Playground: Story = {}

/** Sin el selector de tema de contenido. */
export const WithoutTopicSelector: Story = {
  args: { showTopicSelector: false },
}

/** Con acciones a la derecha, como racha o XP. */
export const WithActions: Story = {
  args: {
    actions: (
      <>
        <Chip size="sm">🔥 5</Chip>
        <Chip size="sm">120 XP</Chip>
      </>
    ),
  },
}

/** Marca e inicio personalizados. */
export const CustomBrand: Story = {
  args: { brand: 'Mi Academia', brandTo: '/' },
}
