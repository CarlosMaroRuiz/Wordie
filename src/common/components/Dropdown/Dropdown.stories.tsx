import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { AirplaneTiltIcon, CodeIcon, BriefcaseIcon } from '@phosphor-icons/react'
import { Dropdown } from './index'
import type { DropdownOption } from './type'

const TOPICS: DropdownOption[] = [
  { value: 'dev', label: 'Desarrollo', description: 'Vocabulario técnico', icon: CodeIcon },
  { value: 'travel', label: 'Travel', description: 'Viajes', icon: AirplaneTiltIcon },
  { value: 'work', label: 'Work', description: 'Oficina', icon: BriefcaseIcon },
]

const meta = {
  title: 'Common/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Selector de una opción. Con `searchable` permite teclear para filtrar; sin él, es un `Listbox` de solo lectura.',
      },
    },
  },
  args: {
    options: TOPICS,
    value: 'dev',
    onChange: fn(),
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    searchable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    labelHidden: { control: 'boolean' },
  },
  decorators: [
    Story => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

/** Selector con búsqueda y una opción preseleccionada. */
export const Playground: Story = {}

/** Modo de solo lectura, sin campo de búsqueda. */
export const NotSearchable: Story = {
  args: { searchable: false },
}

/** Etiqueta visible sobre el control. */
export const WithLabel: Story = {
  args: { label: 'Tema de contenido' },
}

/** Tamaño compacto, como el de la cabecera. */
export const Small: Story = {
  args: { size: 'sm', labelHidden: true, ariaLabel: 'Tema' },
}

/** Control bloqueado, sin interacción. */
export const Disabled: Story = {
  args: { disabled: true },
}

/** El panel se despliega y permite elegir una opción. */
export const SelectOption: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Mostrar opciones' }))
    await userEvent.click(await canvas.findByRole('option', { name: /Travel/ }))
    await expect(args.onChange).toHaveBeenCalledWith('travel')
  },
}

/** Escribir filtra las opciones que se muestran. */
export const SearchFilters: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Mostrar opciones' }))
    const input = canvas.getByRole('combobox')
    await userEvent.clear(input)
    await userEvent.type(input, 'work')
    await expect(await canvas.findByText('Work')).toBeTruthy()
    await expect(canvas.queryByText('Desarrollo')).toBeNull()
  },
}
