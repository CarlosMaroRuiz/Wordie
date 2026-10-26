import type { HomeCounts } from '../../type'

export interface HomeHeroProps {
  tourSeen: boolean
  counts?: HomeCounts | null
  onStart: () => void
  onStartTour: () => void
}
