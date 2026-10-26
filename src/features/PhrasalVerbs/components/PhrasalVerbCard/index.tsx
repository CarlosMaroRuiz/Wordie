import { CardBase } from '@common/CardBase'
import { CARD_CLASS } from './constant'
import { PhrasalVerbCardBody } from './PhrasalVerbCardBody'
import { PhrasalVerbCardHeader } from './PhrasalVerbCardHeader'
import type { PhrasalVerbItemDTO } from '../../types'

export interface PhrasalVerbCardProps {
  item: PhrasalVerbItemDTO
  onSpeak: (text: string) => void
}

export function PhrasalVerbCard({ item, onSpeak }: PhrasalVerbCardProps) {
  return (
    <CardBase padding="none" className={CARD_CLASS}>
      <PhrasalVerbCardHeader item={item} />
      <PhrasalVerbCardBody item={item} onSpeak={onSpeak} />
    </CardBase>
  )
}
