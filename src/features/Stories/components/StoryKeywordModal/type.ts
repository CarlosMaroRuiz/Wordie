import type { StoryKeywordDTO } from '../../dto'
import type { PlaybackRate } from '../../type'

export interface StoryKeywordModalProps {
  keyword: StoryKeywordDTO | null
  isOpen: boolean
  onClose: () => void
  playbackRate?: PlaybackRate
}
