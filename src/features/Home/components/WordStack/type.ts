import type { VocabReviewItem } from '@features/Vocabulary/store/progress'

export interface WordStackProps {
  words: VocabReviewItem[]
  isLoading: boolean
}
