export const DIFFICULTY_COLOR = {
  'Fácil': 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20',
  'Medio': 'text-amber-600 bg-amber-500/10 border-amber-500/20',
  'Difícil': 'text-rose-600 bg-rose-500/10 border-rose-500/20',
} as const

export const BADGE_CLASS =
  'rounded-full bg-primary/15 px-2.5 py-0.5 text-[10px] font-bold text-primary'

export const ACTIVE_CARD =
  'group relative flex flex-col overflow-hidden rounded-[28px] border border-border-subtle bg-surface p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md focus-visible:outline-3 focus-visible:outline-primary'

export const INACTIVE_CARD =
  'group relative flex flex-col overflow-hidden rounded-[28px] border border-border-subtle bg-surface/70 p-6 opacity-60 cursor-not-allowed'
