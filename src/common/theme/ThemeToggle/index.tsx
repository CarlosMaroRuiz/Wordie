import { MonitorIcon, MoonIcon, SunIcon } from '@phosphor-icons/react'
import { THEME_LABEL, THEME_ORDER, THEME_TOGGLE_BUTTON } from '../constant'
import { useThemeStore } from '../useThemeStore'
import type { ThemePreference } from '../useThemeStore'
import type { ThemeToggleProps } from './type'

const ICON = {
  system: MonitorIcon,
  light: SunIcon,
  dark: MoonIcon,
} as const

export function ThemeToggle({ className }: ThemeToggleProps) {
  const theme = useThemeStore(s => s.theme)
  const setTheme = useThemeStore(s => s.setTheme)

  const next = THEME_ORDER[(THEME_ORDER.indexOf(theme) + 1) % THEME_ORDER.length]
  const Icon = ICON[theme]
  const label: string = THEME_LABEL[theme]

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`${label}. Cambiar a ${THEME_LABEL[next].toLowerCase()}`}
      title={label}
      className={className ? `${THEME_TOGGLE_BUTTON} ${className}` : THEME_TOGGLE_BUTTON}
    >
      <Icon size={18} weight="bold" aria-hidden="true" />
    </button>
  )
}

export type { ThemePreference }
