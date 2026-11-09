import type { ReflexRating } from './type'

export const ROUNDS_PER_GAME = 5

export const REFLEX_THRESHOLDS = {
  NATIVE_MAX_SECONDS: 4.5,
  FLUENT_MAX_SECONDS: 9.0,
} as const

export function getReflexRating(elapsedSeconds: number): ReflexRating {
  if (elapsedSeconds <= REFLEX_THRESHOLDS.NATIVE_MAX_SECONDS) {
    return {
      speed: 'native',
      label: 'Reflejo Nativo (x2)',
      multiplier: 2,
      colorClass: 'text-success bg-success-light border-success/30',
    }
  }

  if (elapsedSeconds <= REFLEX_THRESHOLDS.FLUENT_MAX_SECONDS) {
    return {
      speed: 'fluent',
      label: 'Fluido (x1.5)',
      multiplier: 1.5,
      colorClass: 'text-info bg-info-light border-info/30',
    }
  }

  return {
    speed: 'analytical',
    label: 'Analítico (x1)',
    multiplier: 1,
    colorClass: 'text-text-secondary bg-surface-muted border-border-subtle',
  }
}

export const FAST_SHIFTER_INTRO = {
  title: 'Fast Shifter',
  description:
    'Entrena la agilidad de cambiar oraciones de tiempo, polaridad o pregunta con reflejos rápidos en tu móvil.',
  steps: [
    'Mira la oración base y el tipo de mutación exigido (ej: Negativa en Pasado).',
    'Toca los slots interactivos con tus pulgares para elegir el auxiliar y el verbo correctos.',
    '¡Responde en menos de 4.5 segundos para desbloquear la bonificación de Reflejo Nativo!',
    'Aprende de las explicaciones instantáneas si caes en la trampa del auxiliar.',
  ],
} as const

export const SHIFT_TYPE_BADGES: Record<string, { label: string; tone: 'primary' | 'warning' | 'info' | 'success' }> = {
  polarity: { label: 'Polaridad (+ / -)', tone: 'primary' },
  tense: { label: 'Tiempo Verbal', tone: 'warning' },
  inversion: { label: 'Pregunta Directa', tone: 'info' },
  wh: { label: 'Pregunta Wh-', tone: 'success' },
}
