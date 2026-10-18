import type { PhraseDTO } from '../../dto'

export interface PhraseGridProps {
  phrases: PhraseDTO[]
  copiedId: string | null
  onCopy: (id: string, text: string) => void
  onSpeak: (text: string) => void
}
