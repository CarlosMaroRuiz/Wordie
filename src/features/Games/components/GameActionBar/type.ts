import type { ReactNode } from 'react'

export interface GameActionBarProps {
  children: ReactNode
  /** Ancho máximo del contenido, para alinear con el contenedor de cada juego. */
  className?: string
}
