import type { CardPadding, CardVariant } from './type'

export const CARD_BASE =
  'rounded-[22px] border-[1.5px] transition-colors duration-150 ease-out motion-reduce:transition-none'

export const CARD_VARIANT: Record<CardVariant, string> = {
  default: 'border-border-subtle bg-surface shadow-[0_4px_20px_rgba(0,0,0,0.02)]',
  filled: 'border-primary bg-primary text-on-primary',
  goal: 'border-lavender/35 bg-linear-to-br from-primary-light to-surface',
}

export const CARD_PADDING: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-4 sm:p-5',
}

export const CARD_HEADER = 'mb-2.5 flex items-center justify-between gap-3'
