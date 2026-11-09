import { useMemo, useState } from 'react'
import { useFetch } from '@common/hooks/useFetch'
import { useTopicStore } from '@common/layouts/MainLayout/useTopicStore'
import type { AsyncStatusShape } from '@common/types/async'
import { mulberry32, randomSeed, shuffleWith } from '@common/utils/shuffle'
import { ROUNDS_PER_GAME } from '../constant'
import type { IntruderItemDTO, IntruderQuestion } from '../type'

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

function buildQuestion(item: IntruderItemDTO): IntruderQuestion {
  const kept = item.words.filter((_, index) => index !== item.extraIndex)
  const corrected = kept
    .map((word, index) => (index === 0 ? capitalize(word) : word))
    .join(' ')

  return {
    id: item.id,
    level: item.level,
    words: item.words,
    extraIndex: item.extraIndex,
    extra: item.extra,
    translation: item.es,
    reason: item.reason,
    category: item.category,
    corrected,
  }
}

function buildRound(items: IntruderItemDTO[], topic: string, seed: number): IntruderQuestion[] {
  const rand = mulberry32(seed)
  const filtered = items.filter(item => item.topic === topic)
  const pool = filtered.length > 0 ? filtered : items

  return shuffleWith(pool, rand)
    .slice(0, ROUNDS_PER_GAME)
    .map(buildQuestion)
}

export function useIntruderWord() {
  const { data, isLoading, error, refetch } = useFetch<IntruderItemDTO[]>(
    '/data/extra-words.json',
  )
  const topic = useTopicStore(state => state.topic)

  const [seed, setSeed] = useState(randomSeed)
  const [roundTopic, setRoundTopic] = useState(topic)
  const [index, setIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  // Cambiar de tema invalida la ronda: se reinicia sin pasar por un efecto.
  if (roundTopic !== topic) {
    setRoundTopic(topic)
    setIndex(0)
    setSelectedIndex(null)
    setCorrectCount(0)
    setMistakes(0)
    setStreak(0)
    setBestStreak(0)
    setIsCompleted(false)
  }

  const round = useMemo(() => buildRound(data ?? [], topic, seed), [data, topic, seed])
  const current = round[index] ?? null
  const isAnswered = selectedIndex !== null
  const isCorrect = isAnswered && current !== null && selectedIndex === current.extraIndex

  function selectWord(wordIndex: number) {
    if (!current || isAnswered) return

    setSelectedIndex(wordIndex)

    if (wordIndex === current.extraIndex) {
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
    setSelectedIndex(null)
  }

  function restart() {
    setSeed(randomSeed())
    setIndex(0)
    setSelectedIndex(null)
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
    selectedIndex,
    isAnswered,
    isCorrect,
    correctCount,
    mistakes,
    streak,
    bestStreak,
    isCompleted,
    selectWord,
    next,
    restart,
    isLoading,
    error,
    refetch,
  } satisfies AsyncStatusShape
}
