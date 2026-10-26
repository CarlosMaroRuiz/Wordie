import { BookOpenIcon, CardsIcon, ChatCircleIcon, CoffeeIcon } from '@phosphor-icons/react'
import { PATHS } from '@core/routes/types/paths'
import type { HomeCounts, HomeModule } from './type'

export const HOME_COPY = {
  titleLine1: 'Eleva Tu Inglés',
  titleLine2: 'Técnico',
  titleLine3: 'con Práctica Diaria',
  subtitle: 'Vocabulario de ingeniería, gramática aplicada y frases de trabajo. Sin rodeos, directo a producción.',
  statsPrefix: 'Con más de',
  statsSuffix: '18 TEMAS · 6 HISTORIAS',
  start: 'Empezar ahora',
  tourRepeat: 'Repetir tour',
  tourStart: 'Tomar tour',
  modulesSectionTitle: 'Nuestros Módulos',
  modulesSectionHint: 'Todo el material estructurado para acelerar tu fluidez en ingeniería.',
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
  libraryHint: 'Contenido listo para estudiar.',
  storyTitle: 'Lectura del día',
  storyHint: 'Una historia corta, con glosario y quiz.',
  storyLevel: 'Nivel',
  storyReading: 'Leer ahora',
  storyEmpty: 'Lectura no disponible.',
  storyError: 'No se pudo cargar la lectura.',
} as const

export const HOME_MODULES = [
  {
    id: 'grammar',
    index: '01',
    to: PATHS.Grammar,
    title: 'Gramática',
    description: 'Estructuras de A1 a B1 con ejemplos de ingeniería.',
    icon: BookOpenIcon,
    accent: 'bg-lavender/15 text-lavender',
    bar: 'bg-lavender',
    featured: false,
  },
  {
    id: 'vocabulary',
    index: '02',
    to: PATHS.Vocabulary,
    title: 'Vocabulario',
    description: 'Palabras técnicas con repaso espaciado Leitner.',
    icon: CardsIcon,
    accent: 'bg-primary-light text-primary',
    bar: 'bg-primary',
    featured: true,
  },
  {
    id: 'stories',
    index: '03',
    to: PATHS.Stories,
    title: 'Lectura',
    description: 'Historias cortas con glosario y quiz comprensivo.',
    icon: CoffeeIcon,
    accent: 'bg-cyan/15 text-cyan',
    bar: 'bg-cyan',
    featured: false,
  },
  {
    id: 'phrases',
    index: '04',
    to: PATHS.Phrases,
    title: 'Frases',
    description: 'Plantillas para PR reviews, dailies y blockers.',
    icon: ChatCircleIcon,
    accent: 'bg-accent/15 text-accent',
    bar: 'bg-accent',
    featured: false,
  },
] as const satisfies readonly HomeModule[]

export const LIBRARY_ITEMS = [
  { key: 'grammar', label: 'Temas' },
  { key: 'vocabulary', label: 'Palabras' },
  { key: 'stories', label: 'Lecturas' },
  { key: 'phrases', label: 'Frases' },
] as const satisfies readonly { key: keyof HomeCounts; label: string }[]

export const HOME_SECTION = 'flex flex-col gap-4'
export const HOME_SECTION_HEAD = 'flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1'
export const HOME_SECTION_TITLE = 'text-xl font-extrabold tracking-tight text-text-main sm:text-2xl'
export const HOME_SECTION_HINT = 'text-sm text-text-secondary'
export const HOME_GRID = 'grid gap-5 md:grid-cols-2 lg:grid-cols-12'
export const HOME_SPAN_7 = 'lg:col-span-7'
export const HOME_SPAN_5 = 'lg:col-span-5'
export const HOME_CARD = 'flex h-full flex-col gap-4'
export const HOME_LABEL =
  'font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-text-secondary sm:text-[10px] sm:tracking-[0.16em]'
export const HOME_VALUE = 'mt-1 text-2xl font-extrabold tabular-nums text-text-main'
export const HOME_PILL =
  'inline-flex shrink-0 items-center rounded-full border border-border-subtle bg-bg-page px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-text-secondary'
export const HOME_SKELETON =
  'animate-pulse rounded-xl bg-border-subtle/70 motion-reduce:animate-none'

export const REVIEW_LIMIT = 3
export const COPY_RESET_MS = 2000
export const IDLE_TIMEOUT_MS = 1200
export const STORY_EXCERPT_LENGTH = 150

export const STORY_COVER_BASE = '/img/lectura'
export const STORY_SIZES = '(min-width: 1280px) 719px, (min-width: 1024px) 56vw, 92vw'

/** Semilla estable por carga: rota la frase del día sin leer el reloj en render. */
export const DAY_SEED = Math.floor(Date.now() / 86_400_000)
