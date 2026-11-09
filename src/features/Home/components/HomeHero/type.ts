import type { HomeCounts } from '../../type'

export interface HomeHeroProps {
  tourSeen: boolean
  counts?: HomeCounts | null
  topicLabel?: string
  onStart: () => void
  onStartTour: () => void
}
