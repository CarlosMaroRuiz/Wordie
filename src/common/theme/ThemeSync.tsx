import { useEffect } from 'react'
import { resolveTheme, subscribeToSystemTheme, useThemeStore } from './useThemeStore'
import type { ResolvedTheme } from './useThemeStore'

/** Aplica el tema al documento y sincroniza el color de la barra del navegador. */
function applyTheme(resolved: ResolvedTheme) {
  const root = document.documentElement
  root.dataset.theme = resolved
  const meta = document.querySelector('meta[name="theme-color"]')
  if (!meta) return
  const background = getComputedStyle(root).getPropertyValue('--color-bg-page').trim()
  if (background) meta.setAttribute('content', background)
}

/** Mantiene el atributo data-theme sincronizado con el store de Zustand. */
export function ThemeSync() {
  const theme = useThemeStore(s => s.theme)

  useEffect(() => {
    const sync = () => applyTheme(resolveTheme(theme))
    sync()
    if (theme !== 'system') return
    return subscribeToSystemTheme(sync)
  }, [theme])

  return null
}
