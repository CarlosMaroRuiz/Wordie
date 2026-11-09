import type { IntruderQuestion } from '../../type'

export interface IntruderSentenceProps {
  question: IntruderQuestion
  selectedIndex: number | null
  isAnswered: boolean
  onSelect: (wordIndex: number) => void
}
