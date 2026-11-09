import type { TenseId, TenseQuestion } from '../../type'

export interface TenseOptionsProps {
  question: TenseQuestion
  selected: TenseId | null
  onSelect: (option: TenseId) => void
}
