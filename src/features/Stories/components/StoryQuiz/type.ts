import type { StoryQuizQuestionDTO } from '../../type'

export interface StoryQuizProps {
  quiz: StoryQuizQuestionDTO[]
  answers: Record<string, number>
  score: {
    correct: number
    total: number
    completed: boolean
  }
  onSelectAnswer: (questionId: string, optionIndex: number) => void
  onResetQuiz: () => void
}

export interface QuizQuestionProps {
  question: StoryQuizQuestionDTO
  questionIndex: number
  selectedAnswer?: number
  onSelectAnswer: (questionId: string, optionIndex: number) => void
}

export interface QuizScoreCardProps {
  correct: number
  total: number
  onReset: () => void
}
