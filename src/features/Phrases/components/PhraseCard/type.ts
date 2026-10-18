import type { PhraseDTO } from '../../dto'

export interface PhraseCardProps {
  phrase: PhraseDTO
  copiedId: string | null
  onCopy: (id: string, text: string) => void
  onSpeak: (text: string) => void
}
