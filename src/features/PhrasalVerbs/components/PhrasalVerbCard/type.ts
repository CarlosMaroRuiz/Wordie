import type { PhrasalVerbItemDTO } from '../../types'

export interface CardHeaderProps {
  item: Pick<PhrasalVerbItemDTO, 'category' | 'level' | 'separable'>
}

export interface CardBodyProps {
  item: PhrasalVerbItemDTO
  onSpeak: (text: string) => void
}
