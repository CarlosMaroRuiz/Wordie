import { create } from 'zustand'

/** Preferencia elegida por el usuario. */
export type ThemePreference = 'system' | 'light' | 'dark'

/** Tema efectivo aplicado al documento. */
export type ResolvedTheme = 'light' | 'dark'

const THEME_KEY = 'theme_v1'
const DEFAULT_THEME: ThemePreference = 'system'
const DARK_QUERY = '(prefers-color-scheme: dark)'

function isThemePreference(value: string | null): value is ThemePreference {
  return value === 'system' || value === 'light' || value === 'dark'
}

/**
 * Lee la preferencia guardada, ignorando valores desconocidos.
 *
 * @returns La preferencia válida guardada o el valor por defecto.
 */
function readTheme(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    if (isThemePreference(stored)) return stored
  } catch {
    /** Sin persistencia disponible; se usa la preferencia por defecto. */
  }
  return DEFAULT_THEME
}

/**
 * Resuelve el tema efectivo. La preferencia 'system' sigue al sistema operativo.
 *
 * @param preference Preferencia activa.
 * @returns 'light' o 'dark' según corresponda.
 */
export function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference === 'light' || preference === 'dark') return preference
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

/**
 * Escucha cambios del tema del sistema operativo.
 *
 * @param onChange Callback a ejecutar cuando el sistema cambia de tema.
 * @returns Función para cancelar la suscripción.
 */
export function subscribeToSystemTheme(onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  const media = window.matchMedia(DARK_QUERY)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

type ThemeState = {
  /** Preferencia activa. */
  theme: ThemePreference
  /**
   * Cambia la preferencia y la persiste.
   *
   * @param theme Nueva preferencia de tema.
   */
  setTheme: (theme: ThemePreference) => void
}

export const useThemeStore = create<ThemeState>(set => ({
  theme: readTheme(),
  setTheme: theme => {
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      /** Sin persistencia disponible; la preferencia sigue en memoria. */
    }
    set({ theme })
  },
}))
