import type { TenseQuestion } from '../../type'

export interface TenseFeedbackProps {
  question: TenseQuestion
  isAnswered: boolean
  isCorrect: boolean
  isLast: boolean
  onNext: () => void
}
