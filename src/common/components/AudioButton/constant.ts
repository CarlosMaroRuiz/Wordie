import type { AudioButtonSize } from './type'

export const AUDIO_BASE =
  'inline-flex shrink-0 cursor-pointer items-center justify-center transition-colors focus-visible:outline-3 focus-visible:outline-primary motion-reduce:transition-none'

export const AUDIO_SOFT =
  'size-9 rounded-full bg-surface-muted text-text-secondary hover:bg-primary hover:text-on-primary'

export const AUDIO_TINTED =
  'size-9 rounded-full bg-primary/10 text-primary hover:bg-primary/20'

export const AUDIO_SPEAKING = 'bg-primary text-on-primary hover:bg-primary'

export const AUDIO_ICON_SIZE: Record<AudioButtonSize, number> = {
  sm: 16,
  md: 18,
}
