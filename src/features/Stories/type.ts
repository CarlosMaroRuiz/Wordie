import type { StoryDTO, StoryKeywordDTO, StoryQuizQuestionDTO } from './dto'

export type StoryTopic = 'all' | 'dev' | 'work' | 'travel'

export interface QuizState {
  answers: Record<string, number>
  isSubmitted: boolean
}

export type { StoryDTO, StoryKeywordDTO, StoryQuizQuestionDTO }
