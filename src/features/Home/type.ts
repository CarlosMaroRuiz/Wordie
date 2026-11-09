import type { ComponentType } from 'react'
import type { TopicValue } from '@common/layouts/MainLayout/topics'
import type { VocabProgressStats, VocabReviewItem } from '@features/Vocabulary/store/progress'

export type HomeModuleId = 'grammar' | 'vocabulary' | 'stories' | 'phrases'

export interface HomeModule {
  id: HomeModuleId
  to: string
  title: string
  description: string
  icon: ComponentType<{ size?: number | string; weight?: 'bold' | 'regular' | 'duotone' | 'fill' }>
  accent: string
  bar: string
  badge: string
  format: string
  featured?: boolean
}

export interface HomeCounts {
  grammar: number
  vocabulary: number
  stories: number
  phrases: number
}

export interface HomePhrase {
  id: string
  en: string
  es: string
  topic?: TopicValue
  contextTag: string
}

/** Forma cruda de una historia en `/public/data/stories.json`. */
export interface HomeStoryRaw {
  id: string
  title: string
  readTime: string
  level: string
  topic?: TopicValue
  paragraphs: string[]
}

export interface HomeStats {
  counts: HomeCounts | null
  vocab: VocabProgressStats
  reviewWords: VocabReviewItem[]
  phrase: HomePhrase | null
  topic: TopicValue
  topicLabel: string
  isLoading: { vocab: boolean; counts: boolean }
  error: { vocab: boolean; counts: boolean }
}
