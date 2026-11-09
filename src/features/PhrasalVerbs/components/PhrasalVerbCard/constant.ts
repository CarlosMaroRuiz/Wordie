import type { BadgeTone } from '@common/components/Badge'

export const LEVEL_TONE: Record<string, BadgeTone> = {
  A2: 'success',
  B1: 'info',
  B2: 'primary',
  C1: 'error',
}

export const CARD_CLASS =
  'group flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-soft transition-colors duration-200 hover:border-primary/50'
