import type { Variants } from 'motion/react'

export const ROUNDS_PER_GAME = 5

/** Base compartida por las fichas: 44px de alto para cumplir el objetivo táctil. */
export const CHIP_BASE =
  'inline-flex min-h-11 cursor-pointer touch-manipulation select-none items-center rounded-xl border px-3.5 py-2 text-[15px] font-bold shadow-xs transition-all'

export const CHIP_PLACED_IDLE =
  'border-primary/40 bg-primary/10 text-primary hover:border-primary hover:bg-primary/20'

export const CHIP_PLACED_CORRECT =
  'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'

export const CHIP_PLACED_WRONG =
  'border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300 hover:border-red-500'

export const CHIP_BANK =
  'border-border-subtle bg-surface text-text-main hover:border-primary/50 hover:bg-bg-page hover:text-primary active:scale-95'

/** Cockpit de juego: franja + banco + acciones ancladas sobre el BottomNav. */
export const COCKPIT =
  'sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] z-20 -mx-4 mt-1 flex max-h-[calc(100dvh-4.5rem-env(safe-area-inset-bottom,0px))] flex-col gap-2 border-t border-border-subtle bg-bg-page/95 px-4 py-2.5 backdrop-blur-md sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:mt-0 lg:max-h-none lg:gap-5 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none'

export const CONTROLS_ROW =
  'flex items-center gap-2 lg:justify-between'

export const CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 24 },
  },
}

export const CHIP_VARIANTS: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 350, damping: 25 },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.15 },
  },
}
