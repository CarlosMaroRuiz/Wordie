import type { VocabReviewItem } from '@features/Vocabulary/store/progress'

export interface ReviewWordsCardProps {
  words: VocabReviewItem[]
  isLoading: boolean
  hasError: boolean
  className?: string
}
