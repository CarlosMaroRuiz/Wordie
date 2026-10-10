import {
  AirplaneTiltIcon,
  BriefcaseIcon,
  CodeIcon,
} from '@phosphor-icons/react'
import type { DropdownOption } from '@common/components/Dropdown'

/** Temas de contenido, alineados con las carpetas de `/public/data`. */
export type TopicValue = 'dev' | 'travel' | 'work'

export const TOPICS: DropdownOption<TopicValue>[] = [
  {
    value: 'dev',
    label: 'Desarrollo',
    description: 'Vocabulario técnico, Git y arquitectura',
    keywords: ['dev', 'developer', 'code', 'codigo', 'programacion'],
    icon: CodeIcon,
  },
  {
    value: 'travel',
    label: 'Travel',
    description: 'Situaciones y vocabulario de viaje',
    keywords: ['viaje', 'viajar', 'trip', 'airport', 'hotel'],
    icon: AirplaneTiltIcon,
  },
  {
    value: 'work',
    label: 'Work',
    description: 'Oficina, reuniones y comunicación',
    keywords: ['oficina', 'office', 'reunion', 'meeting', 'trabajo'],
    icon: BriefcaseIcon,
  },
]
