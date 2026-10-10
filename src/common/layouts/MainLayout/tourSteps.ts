import type { TourStep } from '@common/components/OnboardingTour'
import { PATHS } from '@core/routes/types/paths'

export const TOUR_STEPS: TourStep[] = [
  {
    target: 'nav',
    route: PATHS.Home,
    title: 'Navega entre los módulos',
    description:
      'Desde aquí cambias de sección: Gramática, Vocabulario, Lectura y Frases. Todo sin recargar la página.',
  },
  {
    target: 'topic',
    route: PATHS.Home,
    title: 'Elige tu tema de contenido',
    description:
      'Cambia entre Desarrollo, Travel y Work. También puedes escribir para filtrar: las opciones se ajustan a lo que tecleas.',
  },
  {
    target: 'grammar',
    route: PATHS.Grammar,
    title: 'Gramática aplicada',
    description:
      'Temas de A1 a B1 con fórmula sintáctica y ejemplos reales de ingeniería.',
  },
  {
    target: 'vocabulary',
    route: PATHS.Vocabulary,
    title: 'Vocabulario con repaso espaciado',
    description:
      'Tarjetas técnicas que suben de caja Leitner cuando las dominas. Practica en sesiones cortas.',
  },
  {
    target: 'stories',
    route: PATHS.Stories,
    title: 'Lectura y comprensión',
    description:
      'Historias del día a día laboral con glosario y quiz para comprobar lo que entendiste.',
  },
  {
    target: 'phrases',
    route: PATHS.Phrases,
    title: 'Frases listas para el trabajo',
    description:
      'Plantillas para PR reviews, dailies y blockers, con un clic para copiarlas.',
  },
]

export const TOUR_SEEN_KEY = 'tour_seen_v1'
