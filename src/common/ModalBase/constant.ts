export const MODAL_BACKDROP =
  'fixed inset-0 z-50 bg-scrim/60 backdrop-blur-sm transition-opacity duration-200 data-closed:opacity-0'

const MODAL_PANEL_BASE =
  'relative z-50 mx-auto w-full rounded-3xl border border-border-subtle shadow-2xl transition duration-200 data-closed:scale-95 data-closed:opacity-0 focus:outline-none overflow-hidden flex flex-col'

export const MODAL_PANEL_SIZE = {
  sm: `${MODAL_PANEL_BASE} max-w-sm`,
  md: `${MODAL_PANEL_BASE} max-w-md`,
  lg: `${MODAL_PANEL_BASE} max-w-2xl`,
} as const

export const MODAL_PANEL_VARIANT = {
  surface: 'bg-surface',
  page: 'bg-bg-page',
} as const

export const MODAL_SCROLLABLE = 'max-h-[85vh] overflow-y-auto'

export const MODAL_HEADER =
  'flex items-center justify-between gap-4 border-b border-border-subtle px-6 py-4 bg-surface shrink-0'

export const MODAL_BODY_BASE = 'flex-grow flex flex-col'

export const MODAL_FOOTER =
  'border-t border-border-subtle px-6 py-4 bg-surface shrink-0'

export const MODAL_CLOSE_BUTTON =
  'rounded-full p-1.5 text-text-tertiary transition hover:bg-surface-muted hover:text-text-main cursor-pointer shrink-0'
