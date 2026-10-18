import type { StoryTopic } from '../../type'

export interface TopicOption {
  id: StoryTopic
  label: string
}

export const TOPIC_OPTIONS: readonly TopicOption[] = [
  { id: 'all', label: 'Todas las historias' },
  { id: 'dev', label: 'Desarrollo de Software' },
  { id: 'work', label: 'Trabajo y Equipos' },
  { id: 'travel', label: 'Viajes e Idioma' },
] as const
