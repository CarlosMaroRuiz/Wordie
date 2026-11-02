import type { Variants } from 'motion/react'
import type { PlaybackRate } from '../../type'

export const STORY_CARD_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
}

export const PLAYBACK_RATE_OPTIONS: Array<{ value: PlaybackRate; label: string }> = [
  { value: 0.75, label: '0.75x' },
  { value: 1, label: '1x' },
  { value: 1.25, label: '1.25x' },
]
