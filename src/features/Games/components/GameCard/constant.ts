import type { BadgeTone } from '@common/components/Badge'

export const DIFFICULTY_TONE = {
  Fácil: 'success',
  Medio: 'warning',
  Difícil: 'error',
} as const satisfies Record<string, BadgeTone>

export const ACTIVE_CARD =
  'group relative flex flex-col overflow-hidden rounded-[28px] border border-border-subtle bg-surface p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md focus-visible:outline-3 focus-visible:outline-primary'

export const INACTIVE_CARD =
  'group relative flex flex-col overflow-hidden rounded-[28px] border border-border-subtle bg-surface/70 p-6 opacity-60 cursor-not-allowed'
