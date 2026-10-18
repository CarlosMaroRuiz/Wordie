import type { VocabProgressStats } from '@features/Vocabulary/store/progress'

export interface VocabProgressCardProps {
  stats: VocabProgressStats
  isLoading: boolean
  hasError: boolean
  onPractice: () => void
  className?: string
}
