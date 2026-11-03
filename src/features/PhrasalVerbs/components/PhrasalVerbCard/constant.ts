import type { BadgeTone } from '@common/components/Badge'

export const LEVEL_TONE: Record<string, BadgeTone> = {
  A2: 'success',
  B1: 'info',
  B2: 'primary',
  C1: 'error',
}

export const CARD_CLASS =
  'group flex flex-col overflow-hidden border border-border-subtle bg-surface shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md'
