import type { SentenceItem } from '../../type'

export interface SentencePromptCardProps {
  sentence: SentenceItem
  isHintActive: boolean
  onToggleHint: () => void
}
