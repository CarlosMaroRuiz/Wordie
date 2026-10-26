import type { ComponentType } from 'react'
import type { VocabProgressStats, VocabReviewItem } from '@features/Vocabulary/store/progress'

export type HomeModuleId = 'grammar' | 'vocabulary' | 'stories' | 'phrases'

export interface HomeModule {
  id: HomeModuleId
  index: string
  to: string
  title: string
  description: string
  icon: ComponentType<{ size?: number | string; weight?: 'bold' | 'regular' }>
  accent: string
  bar: string
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
  contextTag: string
}

export interface HomeStory {
  id: string
  title: string
  readTime: string
  level: string
  topic: string
  excerpt: string
}

export interface HomeStats {
  counts: HomeCounts | null
  vocab: VocabProgressStats
  reviewWords: VocabReviewItem[]
  phrase: HomePhrase | null
  story: HomeStory | null
  isLoading: { vocab: boolean; counts: boolean }
  error: { vocab: boolean; counts: boolean }
}
