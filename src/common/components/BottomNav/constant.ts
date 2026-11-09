export const BOTTOM_NAV_WRAPPER =
  'fixed inset-x-0 bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] z-30 mx-auto w-[calc(100%-1.5rem)] max-w-md lg:hidden select-none pointer-events-none'

export const BOTTOM_NAV_BASE =
  'pointer-events-auto flex items-center justify-between rounded-full border border-border-subtle/70 bg-surface/95 px-2.5 py-1.5 shadow-float backdrop-blur-md'

export const BOTTOM_NAV_ITEM_ACTIVE =
  'flex min-h-11 items-center gap-1.5 rounded-full bg-primary-light px-3.5 py-1.5 text-xs font-black text-primary shadow-xs transition-all'

export const BOTTOM_NAV_ITEM_IDLE =
  'flex size-11 touch-manipulation items-center justify-center rounded-full text-text-tertiary transition-all hover:bg-surface-muted hover:text-text-main active:scale-95'
