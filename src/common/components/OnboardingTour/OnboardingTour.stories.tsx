import type { ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, screen, userEvent } from 'storybook/test'
import { OnboardingTour } from './index'
import type { TourStep } from './type'

const STEPS: TourStep[] = [
  { target: 'perfil', route: '/', title: 'Tu perfil', description: 'Aquí ves tu progreso y tu racha.' },
  { target: 'temas', route: '/', title: 'Tus temas', description: 'Elige el contenido que quieres practicar.' },
]

/** Dibuja anclas con `data-tour` para que el tour tenga algo que resaltar. */
function withAnchors(args: ComponentProps<typeof OnboardingTour>) {
  return (
    <div className="flex min-h-svh items-start gap-4 p-10">
      <button data-tour="perfil" type="button" className="rounded-xl border border-border-subtle px-4 py-2">
        Perfil
      </button>
      <button data-tour="temas" type="button" className="rounded-xl border border-border-subtle px-4 py-2">
        Temas
      </button>
      <OnboardingTour {...args} />
    </div>
  )
}

const meta = {
  title: 'Common/OnboardingTour',
  component: OnboardingTour,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Recorrido guiado que resalta cada elemento con un anillo y un globo de texto. El backdrop es transparente: el oscurecido lo aporta el anillo.',
      },
    },
  },
  args: {
    open: true,
    onClose: fn(),
    steps: STEPS,
  },
} satisfies Meta<typeof OnboardingTour>

export default meta
type Story = StoryObj<typeof meta>

/** Primer paso del recorrido sobre un ancla visible. */
export const Playground: Story = {
  render: withAnchors,
}

/** Un solo paso: el botón de avance dice "Terminar". */
export const SingleStep: Story = {
  args: { steps: [STEPS[0]] },
  render: withAnchors,
}

/** Si el ancla no existe, el tour lo avisa y permite continuar. */
export const MissingTarget: Story = {
  args: { steps: [{ target: 'inexistente', title: 'Paso huérfano', description: 'Sin ancla en el DOM.' }] },
  render: withAnchors,
}

/** La flecha derecha avanza al siguiente paso. */
export const AdvanceWithKeyboard: Story = {
  render: withAnchors,
  play: async () => {
    await expect(await screen.findByText('Tu perfil')).toBeTruthy()
    await userEvent.keyboard('{ArrowRight}')
    await expect(await screen.findByText('Tus temas')).toBeTruthy()
  },
}

/** `Escape` cierra el tour. */
export const CloseWithEscape: Story = {
  render: withAnchors,
  play: async ({ args }) => {
    await userEvent.keyboard('{Escape}')
    await expect(args.onClose).toHaveBeenCalled()
  },
}

/** En el último paso, "Terminar" cierra el recorrido. */
export const FinishCloses: Story = {
  args: { steps: [STEPS[0]] },
  render: withAnchors,
  play: async ({ args }) => {
    await userEvent.click(await screen.findByRole('button', { name: /Terminar/ }))
    await expect(args.onClose).toHaveBeenCalled()
  },
}
