import type { ReflexTone } from './type'

export const REFLEX_TONE_CLASS: Record<ReflexTone, string> = {
  native: 'bg-success-light text-success border-success/30',
  fluent: 'bg-primary-light text-primary border-primary/30',
  analytical: 'bg-surface-muted text-text-secondary border-border-subtle',
}
