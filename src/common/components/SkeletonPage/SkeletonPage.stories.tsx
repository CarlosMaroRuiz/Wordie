import type { Meta, StoryObj } from '@storybook/react-vite'
import { SkeletonPage } from './index'

const meta = {
  title: 'Common/SkeletonPage',
  component: SkeletonPage,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Marcador de posición que se muestra mientras carga el contenido de una página. Anuncia el estado de carga con `role="status"`.',
      },
    },
  },
} satisfies Meta<typeof SkeletonPage>

export default meta
type Story = StoryObj<typeof meta>

/** Estado de carga por defecto. */
export const Default: Story = {}
