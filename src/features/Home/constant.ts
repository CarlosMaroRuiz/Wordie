import { BookOpenIcon, CardsIcon, ChatCircleIcon, CoffeeIcon } from '@phosphor-icons/react'
import { PATHS } from '@core/routes/types/paths'
import type { HomeCounts, HomeModule } from './type'

export const HOME_COPY = {
  titleLine1: 'Eleva Tu Inglés',
  titleLine2: 'Práctico',
  titleLine3: 'con Práctica Diaria',
  subtitle: 'Vocabulario, gramática y frases para desarrollo, viajes y trabajo profesional. Sin rodeos, directo a la práctica.',
  statsPrefix: 'Con más de',
  start: 'Empezar ahora',
  tourRepeat: 'Repetir tour',
  tourStart: 'Tomar tour',
  modulesSectionTitle: 'Nuestros Módulos',
  modulesSectionHint: 'Todo el material estructurado para acelerar tu fluidez en desarrollo, viajes y trabajo.',
  progressTitle: 'Tu progreso',
  progressHint: 'Solo cuenta lo que practicas.',
  vocabTitle: 'Tu vocabulario',
  vocabRows: ['Dominadas', 'En repaso', 'Sin empezar'],
  practice: 'Practicar',
  reviewTitle: 'Repasa primero',
  reviewHint: 'De tus cajas más bajas',
  reviewEmpty: 'Sin tarjetas para repasar.',
  dailyTitle: 'Para hoy',
  dailyHint: 'Menos de dos minutos.',
  phraseTitle: 'Frase del día',
  phraseCopy: 'Copiar',
  phraseCopied: 'Copiada',
  phraseError: 'No se pudo copiar',
  phraseEmpty: 'Frase no disponible.',
  libraryTitle: 'En la biblioteca',
  libraryHint: 'Contenido del tema activo.',
} as const

export const HOME_MODULES = [
  {
    id: 'vocabulary',
    to: PATHS.Vocabulary,
    title: 'Vocabulario',
    description: 'Palabras por tema con repaso espaciado Leitner y pronunciación nativa.',
    icon: CardsIcon,
    accent: 'bg-primary-light text-primary',
    bar: 'bg-primary',
    badge: 'Sistema Leitner',
    format: '5 Cajas de Repaso',
    featured: true,
  },
  {
    id: 'grammar',
    to: PATHS.Grammar,
    title: 'Gramática',
    description: 'Estructuras de A1 a B1 con fórmulas claras y ejemplos contextuales.',
    icon: BookOpenIcon,
    accent: 'bg-primary-light text-primary',
    bar: 'bg-primary',
    badge: 'Niveles A1 · B1',
    format: 'Fórmulas & Reglas',
    featured: false,
  },
  {
    id: 'stories',
    to: PATHS.Stories,
    title: 'Lectura',
    description: 'Historias cortas con glosario interactivo, audio en vivo y quiz comprensivo.',
    icon: CoffeeIcon,
    accent: 'bg-primary-light text-primary',
    bar: 'bg-primary',
    badge: 'Comprensión',
    format: 'Glosario & Quiz',
    featured: false,
  },
  {
    id: 'phrases',
    to: PATHS.Phrases,
    title: 'Frases',
    description: 'Plantillas prácticas para reuniones, viajes, oficina y tecnología diaria.',
    icon: ChatCircleIcon,
    accent: 'bg-primary-light text-primary',
    bar: 'bg-primary',
    badge: 'Expresiones Clave',
    format: 'Dev & Situacional',
    featured: false,
  },
] as const satisfies readonly HomeModule[]

export const LIBRARY_ITEMS = [
  { key: 'grammar', label: 'Gramática' },
  { key: 'vocabulary', label: 'Palabras' },
  { key: 'stories', label: 'Lecturas' },
  { key: 'phrases', label: 'Frases' },
] as const satisfies readonly { key: keyof HomeCounts; label: string }[]

export const HOME_SECTION = 'flex flex-col gap-4'
export const HOME_SECTION_HEAD = 'flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-1'
export const HOME_SECTION_TITLE = 'text-xl font-black tracking-tight text-text-main sm:text-2xl'
export const HOME_SECTION_HINT = 'text-xs sm:text-sm text-text-secondary'
export const HOME_GRID = 'grid gap-5 md:grid-cols-2 lg:grid-cols-12'
export const HOME_SPAN_7 = 'lg:col-span-7'
export const HOME_SPAN_5 = 'lg:col-span-5'
export const HOME_CARD = 'flex h-full flex-col gap-4'
export const HOME_LABEL = 'text-xs font-bold text-text-secondary'
export const HOME_VALUE = 'mt-1 text-2xl font-black tabular-nums text-text-main'
export const HOME_PILL =
  'inline-flex shrink-0 items-center rounded-full border border-border-subtle bg-surface px-3 py-1 text-xs font-bold text-text-secondary shadow-soft'
export const HOME_SKELETON =
  'animate-pulse rounded-2xl bg-border-subtle/70 motion-reduce:animate-none'

export const REVIEW_LIMIT = 3
export const COPY_RESET_MS = 2000
export const IDLE_TIMEOUT_MS = 1200

/** Semilla estable por carga: rota la frase del día sin leer el reloj en render. */
export const DAY_SEED = Math.floor(Date.now() / 86_400_000)
