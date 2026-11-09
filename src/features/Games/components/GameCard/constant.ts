import type { BadgeTone } from '@common/components/Badge'

export const DIFFICULTY_TONE = {
  Fácil: 'success',
  Medio: 'warning',
  Difícil: 'error',
} as const satisfies Record<string, BadgeTone>

export const ACTIVE_CARD =
  'group relative flex flex-col justify-between overflow-hidden rounded-[26px] border border-border-subtle bg-surface p-5 sm:p-6 shadow-soft transition-all duration-300 hover:border-primary/50 hover:shadow-float focus-visible:outline-2 focus-visible:outline-primary active:scale-[0.985] touch-manipulation'

export const INACTIVE_CARD =
  'group relative flex flex-col justify-between overflow-hidden rounded-[26px] border border-border-subtle/60 bg-surface-muted/40 p-5 sm:p-6 opacity-75 cursor-not-allowed select-none'
