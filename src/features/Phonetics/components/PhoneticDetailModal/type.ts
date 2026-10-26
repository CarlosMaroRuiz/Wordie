import type { PhoneticItemDTO } from '../../types'

export interface PhoneticDetailModalProps {
  item: PhoneticItemDTO | null
  onClose: () => void
  onSpeak: (text: string) => void
}
