import type { Variants } from 'motion/react'

/** Variante de animacion para el item individual de la card */
export const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
}
