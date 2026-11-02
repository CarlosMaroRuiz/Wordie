import type { StoryDTO, StoryKeywordDTO, StoryQuizQuestionDTO } from './dto'
import type { TopicValue } from '@common/layouts/MainLayout/topics'

export type StoryTopic = TopicValue

export type PlaybackRate = 0.75 | 1 | 1.25

export interface QuizState {
  answers: Record<string, number>
  isSubmitted: boolean
}

export type { StoryDTO, StoryKeywordDTO, StoryQuizQuestionDTO }
