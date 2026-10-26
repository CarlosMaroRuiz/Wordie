import type { PhoneticItemDTO } from '../../types'

export interface PhoneticCardProps {
  item: PhoneticItemDTO
  onSelect: (item: PhoneticItemDTO) => void
  onSpeak: (text: string) => void
}
