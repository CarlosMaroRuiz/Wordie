import type { Meta, StoryObj } from '@storybook/react-vite'
import { AudioButton } from './index'

const meta = {
  title: 'Common/AudioButton',
  component: AudioButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Botón de pronunciación única del proyecto. Envuelve `useSpeechSynthesis` y expone el estado hablado, así que no hace falta repetir la lógica de `speak`/`stop` en cada feature.',
      },
    },
  },
  args: { text: 'Heads up' },
  argTypes: {
    appearance: { control: 'inline-radio', options: ['soft', 'tinted', 'outlined'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof AudioButton>

export default meta
type Story = StoryObj<typeof meta>

/** Botón circular neutro. */
export const Playground: Story = {}

/** Botón tintado con el color primario. */
export const Tinted: Story = {
  args: { appearance: 'tinted' },
}

/** Botón cuadrado con borde, integrado en barras de acciones. */
export const Outlined: Story = {
  args: { appearance: 'outlined', size: 'md' },
}

/** Los tres acabados juntos para comparar. */
export const Appearances: Story = {
  render: args => (
    <div className="flex items-center gap-3">
      <AudioButton {...args} appearance="soft" />
      <AudioButton {...args} appearance="tinted" />
      <AudioButton {...args} appearance="outlined" />
    </div>
  ),
}
