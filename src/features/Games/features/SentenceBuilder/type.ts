import type { TopicValue } from '@common/layouts/MainLayout/topics'
import type { SentenceDTO } from './dto'

export type SentenceCategory = TopicValue

export type SentenceDifficulty = 'easy' | 'medium' | 'hard'

export type GameStatus = 'idle' | 'correct' | 'incorrect'

export type SentenceItem = SentenceDTO

export interface WordChip {
  id: string
  text: string
  originalIndex: number
}

export interface SentenceBuilderStats {
  currentRound: number
  totalRounds: number
  score: number
  streak: number
  mistakes: number
}

export type { SentenceDTO }
