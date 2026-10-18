import type { HomeCounts } from '../../type'

export interface LibraryStatsProps {
  counts: HomeCounts | null
  isLoading: boolean
  hasError: boolean
  className?: string
}
