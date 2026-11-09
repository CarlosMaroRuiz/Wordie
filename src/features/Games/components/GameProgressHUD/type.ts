export type ReflexTone = 'native' | 'fluent' | 'analytical'

export interface GameProgressHUDProps {
  /** Ronda actual (1-based, e.g. 1, 2, 3...) */
  currentRound: number
  /** Total de rondas (e.g. 5) */
  totalRounds: number
  /** Racha activa de aciertos (opcional) */
  streak?: number
  /** Segundos transcurridos en tiempo real (opcional) */
  elapsedSeconds?: number
  /** Multiplicador de velocidad o etiqueta (e.g. 2 o "x2", opcional) */
  speedMultiplier?: string | number
  /** Tono del indicador de velocidad */
  reflexTone?: ReflexTone
  /** Si el temporizador está detenido (al evaluar respuesta) */
  isTimerStopped?: boolean
  /** Callback al tocar salir (por defecto navega a PATHS.Games) */
  onExit?: () => void
  /** Callback al tocar botón de ayuda */
  onOpenHelp?: () => void
  /** Clases adicionales */
  className?: string
}
