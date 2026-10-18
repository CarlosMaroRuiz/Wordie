import type { VocabReviewItem } from '@features/Vocabulary/store/progress'

export interface HomeHeroProps {
  previewWords: VocabReviewItem[]
  isLoadingPreview: boolean
  tourSeen: boolean
  onStart: () => void
  onStartTour: () => void
}
