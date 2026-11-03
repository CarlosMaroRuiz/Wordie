export const THEME_TOGGLE_BUTTON =
  'relative inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-secondary transition-all duration-150 ease-out hover:border-primary/40 hover:bg-surface-elevated hover:text-text-main focus-visible:outline-3 focus-visible:outline-primary active:scale-95'

export const THEME_ORDER = ['system', 'light', 'dark'] as const

export const THEME_LABEL = {
  system: 'Tema automático',
  light: 'Tema claro',
  dark: 'Tema oscuro',
} as const
