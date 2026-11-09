import { useEffect, useMemo, useState } from 'react'
import { useFetch } from '@common/hooks/useFetch'
import { TOPICS, type TopicValue } from '@common/layouts/MainLayout/topics'
import { useTopicStore } from '@common/layouts/MainLayout/useTopicStore'
import type { VocabRawDTO } from '@features/Vocabulary/dto'
import {
  computeVocabStats,
  hasBrokenText,
  pickReviewItems,
  readVocabProgress,
} from '@features/Vocabulary/store/progress'
import { DAY_SEED, IDLE_TIMEOUT_MS, REVIEW_LIMIT } from '../constant'
import type { HomeCounts, HomePhrase, HomeStats, HomeStoryRaw } from '../type'

/** Activa el trabajo secundario después del primer pintado. */
function useDeferredWork(): boolean {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof window.requestIdleCallback === 'function') {
      const handle = window.requestIdleCallback(() => setReady(true), {
        timeout: IDLE_TIMEOUT_MS,
      })
      return () => window.cancelIdleCallback(handle)
    }

    const timeout = window.setTimeout(() => setReady(true), IDLE_TIMEOUT_MS)
    return () => window.clearTimeout(timeout)
  }, [])

  return ready
}

/**
 * Acota una colección al tema activo.
 *
 * Las entradas sin `topic` se consideran de `dev`, igual que en el módulo de
 * Vocabulary, para no perder los datos legados. Si el tema activo no deja
 * ninguna entrada, se devuelve la colección original: es preferible mostrar
 * contenido de otro tema que una tarjeta vacía.
 */
function filterByTopic<T extends { topic?: TopicValue }>(
  items: T[],
  topic: TopicValue,
): T[] {
  const matches = items.filter(item => (item.topic ?? 'dev') === topic)
  return matches.length > 0 ? matches : items
}

function pickPhraseOfDay(phrases: HomePhrase[]): HomePhrase | null {
  if (phrases.length === 0) return null
  const readable = phrases.filter(phrase => !hasBrokenText(phrase.es))
  const pool = readable.length > 0 ? readable : phrases
  return pool[DAY_SEED % pool.length] ?? null
}

export function useHomeStats(): HomeStats {
  const deferred = useDeferredWork()
  const topic = useTopicStore(state => state.topic)
  const vocabulary = useFetch<VocabRawDTO[]>('/data/vocabulary.json')
  const grammar = useFetch<unknown[]>(deferred ? '/data/grammar.json' : '')
  const stories = useFetch<HomeStoryRaw[]>(deferred ? '/data/stories.json' : '')
  const phrases = useFetch<HomePhrase[]>(deferred ? '/data/phrases.json' : '')

  const [progress] = useState(readVocabProgress)
  const rawVocabulary = useMemo(() => vocabulary.data ?? [], [vocabulary.data])

  /** Colecciones ya acotadas al tema activo. */
  const topicVocabulary = useMemo(
    () => filterByTopic(rawVocabulary, topic),
    [rawVocabulary, topic],
  )
  const topicStories = useMemo(
    () => (stories.data ? filterByTopic(stories.data, topic) : []),
    [stories.data, topic],
  )
  const topicPhrases = useMemo(
    () => (phrases.data ? filterByTopic(phrases.data, topic) : []),
    [phrases.data, topic],
  )

  const topicLabel = useMemo(
    () => TOPICS.find(option => option.value === topic)?.label ?? topic,
    [topic],
  )

  const vocab = useMemo(
    () => computeVocabStats(topicVocabulary, progress),
    [topicVocabulary, progress],
  )
  const reviewWords = useMemo(
    () => pickReviewItems(topicVocabulary, progress, REVIEW_LIMIT),
    [topicVocabulary, progress],
  )
  const phrase = useMemo(() => pickPhraseOfDay(topicPhrases), [topicPhrases])

  const counts = useMemo<HomeCounts | null>(() => {
    if (!grammar.data || !stories.data || !phrases.data) return null
    return {
      grammar: grammar.data.length,
      vocabulary: topicVocabulary.length,
      stories: topicStories.length,
      phrases: topicPhrases.length,
    }
  }, [grammar.data, stories.data, phrases.data, topicVocabulary, topicStories, topicPhrases])

  return {
    counts,
    vocab,
    reviewWords,
    phrase,
    topic,
    topicLabel,
    isLoading: {
      vocab: vocabulary.isLoading,
      counts: !deferred || grammar.isLoading || stories.isLoading || phrases.isLoading,
    },
    error: {
      vocab: vocabulary.error !== null,
      counts: grammar.error !== null || stories.error !== null || phrases.error !== null,
    },
  }
}
