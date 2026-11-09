import type { Variants } from 'motion/react'

export const ROUNDS_PER_GAME = 5

/** Base compartida por las fichas estilo Duolingo: ergonomía táctil y feedback active. */
export const CHIP_BASE =
  'inline-flex min-h-11 cursor-pointer touch-manipulation select-none items-center justify-center rounded-2xl border-2 px-3.5 py-2 text-sm sm:text-base font-black shadow-soft transition-all active:scale-95'

export const CHIP_PLACED_IDLE =
  'border-primary bg-primary-light text-primary shadow-brand hover:bg-primary/20'

export const CHIP_PLACED_CORRECT =
  'border-success bg-success-light text-success shadow-soft'

export const CHIP_PLACED_WRONG =
  'border-error bg-error-light text-error shadow-soft hover:border-error'

export const CHIP_BANK =
  'border-border-subtle bg-surface text-text-main shadow-soft hover:border-primary/50 hover:bg-primary-light/40 hover:text-primary active:scale-95'

export const CONTROLS_ROW =
  'flex items-center gap-2 lg:justify-between'

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
