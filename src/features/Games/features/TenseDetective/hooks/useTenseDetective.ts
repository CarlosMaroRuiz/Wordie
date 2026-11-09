import { useMemo, useState } from 'react'
import { useFetch } from '@common/hooks/useFetch'
import { useTopicStore } from '@common/layouts/MainLayout/useTopicStore'
import type { AsyncStatusShape } from '@common/types/async'
import { OPTIONS_PER_ROUND, ROUNDS_PER_GAME, TENSE_CATALOG } from '../constant'
import type { TenseId, TenseItemDTO, TenseQuestion } from '../type'

function randomSeed(): number {
  return Math.floor(Math.random() * 2 ** 31)
}

/** PRNG determinista: la misma semilla produce la misma ronda. */
function mulberry32(seed: number): () => number {
  let state = seed
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffleWith<T>(items: T[], rand: () => number): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1))
    const temp = result[i]!
    result[i] = result[j]!
    result[j] = temp
  }
  return result
}

function buildQuestion(item: TenseItemDTO, rand: () => number): TenseQuestion {
  const correct = TENSE_CATALOG.find(option => option.id === item.tense) ?? TENSE_CATALOG[0]!
  const wrong = TENSE_CATALOG.filter(option => option.id !== item.tense)
  const distractors = shuffleWith(wrong, rand).slice(0, OPTIONS_PER_ROUND - 1)

  return {
    id: item.id,
    level: item.level,
    sentence: item.sentence,
    verb: item.verb,
    correctTense: item.tense,
    translation: item.es,
    explanation: item.explanation,
    options: shuffleWith([correct, ...distractors], rand),
  }
}

function buildRound(items: TenseItemDTO[], topic: string, seed: number): TenseQuestion[] {
  const rand = mulberry32(seed)
  const filtered = items.filter(item => item.topic === topic)
  const pool = filtered.length > 0 ? filtered : items

  return shuffleWith(pool, rand)
    .slice(0, ROUNDS_PER_GAME)
    .map(item => buildQuestion(item, rand))
}

export function useTenseDetective() {
  const { data, isLoading, error, refetch } = useFetch<TenseItemDTO[]>('/data/tenses.json')
  const topic = useTopicStore(state => state.topic)

  const [seed, setSeed] = useState(randomSeed)
  const [roundTopic, setRoundTopic] = useState(topic)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<TenseId | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  // Cambiar de tema invalida la ronda: se reinicia sin pasar por un efecto.
  if (roundTopic !== topic) {
    setRoundTopic(topic)
    setIndex(0)
    setSelected(null)
    setCorrectCount(0)
    setMistakes(0)
    setStreak(0)
    setBestStreak(0)
    setIsCompleted(false)
  }

  const round = useMemo(() => buildRound(data ?? [], topic, seed), [data, topic, seed])
  const current = round[index] ?? null
  const isAnswered = selected !== null
  const isCorrect = isAnswered && current !== null && selected === current.correctTense

  function selectOption(option: TenseId) {
    if (!current || isAnswered) return

    setSelected(option)

    if (option === current.correctTense) {
      const nextStreak = streak + 1
      setCorrectCount(count => count + 1)
      setStreak(nextStreak)
      setBestStreak(best => Math.max(best, nextStreak))
      return
    }

    setMistakes(count => count + 1)
    setStreak(0)
  }

  function next() {
    if (index + 1 >= round.length) {
      setIsCompleted(true)
      return
    }
    setIndex(currentIndex => currentIndex + 1)
    setSelected(null)
  }

  function restart() {
    setSeed(randomSeed())
    setIndex(0)
    setSelected(null)
    setCorrectCount(0)
    setMistakes(0)
    setStreak(0)
    setBestStreak(0)
    setIsCompleted(false)
  }

  return {
    topic,
    current,
    round,
    index,
    total: round.length,
    selected,
    isAnswered,
    isCorrect,
    correctCount,
    mistakes,
    streak,
    bestStreak,
    isCompleted,
    selectOption,
    next,
    restart,
    isLoading,
    error,
    refetch,
  } satisfies AsyncStatusShape
}
