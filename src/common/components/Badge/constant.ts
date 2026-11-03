import type { BadgeSize, BadgeTone, BadgeWeight } from './type'

export const BADGE_BASE = 'inline-flex items-center gap-1 rounded-full border whitespace-nowrap'

export const BADGE_SIZE: Record<BadgeSize, string> = {
  xs: 'px-2 py-0.5 text-[10px]',
  sm: 'px-2.5 py-0.5 text-[10px]',
  md: 'px-3 py-1 text-xs',
  lg: 'px-3.5 py-1 text-xs',
}

export const BADGE_WEIGHT: Record<BadgeWeight, string> = {
  semibold: 'font-semibold',
  bold: 'font-bold',
}

export const BADGE_UPPERCASE = 'uppercase tracking-wider'

export const BADGE_TONE: Record<BadgeTone, string> = {
  primary: 'border-primary/20 bg-primary-light text-primary',
  'primary-soft': 'border-primary/20 bg-primary/5 text-primary',
  'primary-tint': 'border-transparent bg-primary/10 text-primary',
  'brand-soft': 'border-transparent bg-primary/15 text-primary',
  success: 'border-success/20 bg-success-light text-success',
  warning: 'border-warning/20 bg-warning-light text-warning',
  error: 'border-error/20 bg-error-light text-error',
  info: 'border-info/20 bg-info-light text-info',
  neutral: 'border-border-subtle bg-surface-muted text-text-tertiary',
  outline: 'border-border-subtle bg-bg-page text-text-secondary',
}
