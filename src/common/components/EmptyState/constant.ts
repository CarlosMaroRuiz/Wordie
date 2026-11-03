import type { EmptyStateSize, EmptyStateVariant } from './type'

export const EMPTY_BASE = 'text-center text-text-secondary'

export const EMPTY_VARIANT: Record<EmptyStateVariant, string> = {
  plain: 'py-12',
  card: 'rounded-2xl border border-border-subtle bg-surface px-6 py-12',
  dashed: 'rounded-3xl border border-dashed border-border-subtle p-12',
}

export const EMPTY_SIZE: Record<EmptyStateSize, string> = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
}
