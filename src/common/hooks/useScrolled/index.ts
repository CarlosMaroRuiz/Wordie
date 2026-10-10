import { useEffect, useState } from 'react'

/** Umbral de desplazamiento por defecto, en píxeles. */
const DEFAULT_THRESHOLD = 20

/**
 * Indica si la ventana se ha desplazado más allá de `threshold` píxeles.
 * Útil para aplicar estilos a elementos sticky al hacer scroll.
 *
 * @param threshold Distancia de desplazamiento a partir de la cual se considera
 * que la ventana se ha desplazado.
 * @returns `true` si la ventana se ha desplazado más allá de `threshold`.
 */
export function useScrolled(threshold = DEFAULT_THRESHOLD) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
