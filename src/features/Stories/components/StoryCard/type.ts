import type { StoryDTO, StoryKeywordDTO, PlaybackRate } from '../../type'

export interface StoryCardProps {
  story: StoryDTO
  selectedKeyword: string | null
  onSelectKeyword: (keyword: StoryKeywordDTO) => void
  isNarrating: boolean
  narratingParagraphIndex: number | null
  narratingCharIndex: number | null
  onToggleNarration: () => void
  playbackRate: PlaybackRate
  onPlaybackRateChange: (rate: PlaybackRate) => void
}

export interface StoryAudioControlsProps {
  isNarrating: boolean
  onToggleNarration: () => void
  playbackRate: PlaybackRate
  onPlaybackRateChange: (rate: PlaybackRate) => void
}

export interface StoryParagraphsProps {
  paragraphs: string[]
  keywords: StoryDTO['keywords']
  selectedKeyword: string | null
  isNarrating: boolean
  narratingParagraphIndex: number | null
  narratingCharIndex: number | null
  onSelectKeyword: (keyword: StoryKeywordDTO) => void
}
