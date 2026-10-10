import { create } from 'zustand'
import type { TopicValue } from '@common/layouts/MainLayout/topics'

const TOPIC_KEY = 'topic_v1'
/** Valor por defecto si no hay preferencia guardada. */
const DEFAULT_TOPIC: TopicValue = 'dev'

/**
 * Lee el tema guardado, validando que siga siendo una opción conocida.
 *
 * @returns El tema guardado, o el valor por defecto si no hay preferencia válida.
 */
function readTopic(): TopicValue {
  try {
    const stored = localStorage.getItem(TOPIC_KEY)
    if (stored === 'dev' || stored === 'travel' || stored === 'work') return stored
  } catch {
    /** Sin persistencia disponible; se usa el valor por defecto. */
  }
  return DEFAULT_TOPIC
}

type TopicState = {
  /** Tema activo. */
  topic: TopicValue
  /**
   * Cambia el tema y lo persiste.
   *
   * @param topic Nuevo tema activo.
   */
  setTopic: (topic: TopicValue) => void
}

export const useTopicStore = create<TopicState>(set => ({
  topic: readTopic(),
  setTopic: topic => {
    try {
      localStorage.setItem(TOPIC_KEY, topic)
    } catch {
      /** Sin persistencia disponible; el tema sigue funcionando en memoria. */
    }
    set({ topic })
  },
}))
