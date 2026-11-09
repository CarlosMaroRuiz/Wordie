import type { IntruderQuestion } from '../../type'

export interface IntruderFeedbackProps {
  question: IntruderQuestion
  isAnswered: boolean
  isCorrect: boolean
  isLast: boolean
  onNext: () => void
}
