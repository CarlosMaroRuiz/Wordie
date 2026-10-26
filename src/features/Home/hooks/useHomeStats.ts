import { useEffect, useMemo, useState } from 'react'
import { useFetch } from '@common/hooks/useFetch'
import type { VocabRawDTO } from '@features/Vocabulary/dto'
import {
  computeVocabStats,
  hasBrokenText,
  pickReviewItems,
  readVocabProgress,
} from '@features/Vocabulary/store/progress'
import { DAY_SEED, IDLE_TIMEOUT_MS, REVIEW_LIMIT, STORY_EXCERPT_LENGTH } from '../constant'
import type { HomeCounts, HomePhrase, HomeStats, HomeStory } from '../type'

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

interface StoryRaw {
  id: string
  title: string
  readTime: string
  level: string
  topic: string
  paragraphs: string[]
}

function excerptOf(paragraphs: string[]): string {
  const source = paragraphs.find(paragraph => paragraph.trim().length > 0) ?? ''
  const clean = source.replace(/\s+/g, ' ').trim()
  if (clean.length <= STORY_EXCERPT_LENGTH) return clean

  const cut = clean.slice(0, STORY_EXCERPT_LENGTH)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`
}

function pickStoryOfDay(stories: StoryRaw[]): HomeStory | null {
  if (stories.length === 0) return null

  const readable = stories.filter(story => {
    const firstParagraph = story.paragraphs?.[0] ?? ''
    return !hasBrokenText(story.title) && !hasBrokenText(firstParagraph)
  })

  const pool = readable.length > 0 ? readable : stories
  const story = pool[DAY_SEED % pool.length]
  if (!story) return null

  return {
    id: story.id,
    title: story.title,
    readTime: story.readTime,
    level: story.level,
    topic: story.topic,
    excerpt: excerptOf(story.paragraphs ?? []),
  }
}

function pickPhraseOfDay(phrases: HomePhrase[]): HomePhrase | null {
  if (phrases.length === 0) return null
  const readable = phrases.filter(phrase => !hasBrokenText(phrase.es))
  const pool = readable.length > 0 ? readable : phrases
  return pool[DAY_SEED % pool.length] ?? null
}

export function useHomeStats(): HomeStats {
  const deferred = useDeferredWork()
  const vocabulary = useFetch<VocabRawDTO[]>('/data/vocabulary.json')
  const grammar = useFetch<unknown[]>(deferred ? '/data/grammar.json' : '')
  const stories = useFetch<StoryRaw[]>(deferred ? '/data/stories.json' : '')
  const phrases = useFetch<HomePhrase[]>(deferred ? '/data/phrases.json' : '')

  const [progress] = useState(readVocabProgress)
  const rawVocabulary = useMemo(() => vocabulary.data ?? [], [vocabulary.data])

  const vocab = useMemo(
    () => computeVocabStats(rawVocabulary, progress),
    [rawVocabulary, progress],
  )
  const reviewWords = useMemo(
    () => pickReviewItems(rawVocabulary, progress, REVIEW_LIMIT),
    [rawVocabulary, progress],
  )
  const phrase = useMemo(() => pickPhraseOfDay(phrases.data ?? []), [phrases.data])
  const story = useMemo(() => pickStoryOfDay(stories.data ?? []), [stories.data])

  const counts = useMemo<HomeCounts | null>(() => {
    if (!grammar.data || !stories.data || !phrases.data) return null
    return {
      grammar: grammar.data.length,
      vocabulary: rawVocabulary.length,
      stories: stories.data.length,
      phrases: phrases.data.length,
    }
  }, [grammar.data, stories.data, phrases.data, rawVocabulary])

  return {
    counts,
    vocab,
    reviewWords,
    phrase,
    story,
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
