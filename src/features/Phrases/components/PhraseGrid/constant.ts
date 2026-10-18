import type { Variants } from 'motion/react'

/** Variantes de animacion del contenedor de la grilla */
export const CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
}
