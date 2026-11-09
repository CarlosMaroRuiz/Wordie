import { useMemo, useState } from 'react'
import { useFetch } from '@common/hooks/useFetch'
import { useTopicStore } from '@common/layouts/MainLayout/useTopicStore'
import type { AsyncStatusShape } from '@common/types/async'
import { mulberry32, randomSeed, shuffleWith } from '@common/utils/shuffle'
import { ROUNDS_PER_GAME } from '../constant'
import type { ConnectorParagraphDTO, SeamAnswers } from '../type'

const EMPTY_ANSWERS: SeamAnswers = [null, null, null]

function buildRound(
  items: ConnectorParagraphDTO[],
  topic: string,
  seed: number,
): ConnectorParagraphDTO[] {
  const rand = mulberry32(seed)
  const filtered = items.filter(item => item.topic === topic)
  const pool = filtered.length > 0 ? filtered : items

  // Barajar también las fichas de cada costura: en el JSON la correcta va primero.
  return shuffleWith(pool, rand)
    .slice(0, ROUNDS_PER_GAME)
    .map(paragraph => ({
      ...paragraph,
      seams: paragraph.seams.map(seam => ({
        ...seam,
        options: shuffleWith(seam.options, rand),
      })),
    }))
}

export function useConnectors() {
  const { data, isLoading, error, refetch } = useFetch<ConnectorParagraphDTO[]>(
    '/data/connectors.json',
  )
  const topic = useTopicStore(state => state.topic)

  const [seed, setSeed] = useState(randomSeed)
  const [roundTopic, setRoundTopic] = useState(topic)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<SeamAnswers>(EMPTY_ANSWERS)
  const [activeSeam, setActiveSeam] = useState(0)
  const [isChecked, setIsChecked] = useState(false)
  const [correctSeams, setCorrectSeams] = useState(0)
  const [perfectRounds, setPerfectRounds] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  // Cambiar de tema invalida la ronda: se reinicia sin pasar por un efecto.
  if (roundTopic !== topic) {
    setRoundTopic(topic)
    setIndex(0)
    setAnswers(EMPTY_ANSWERS)
    setActiveSeam(0)
    setIsChecked(false)
    setCorrectSeams(0)
    setPerfectRounds(0)
    setStreak(0)
    setBestStreak(0)
    setIsCompleted(false)
  }

  const round = useMemo(() => buildRound(data ?? [], topic, seed), [data, topic, seed])
  const current = round[index] ?? null
  const allFilled = answers.every(answer => answer !== null)

  const results = (current?.seams ?? []).map((seam, seamIndex) => ({
    seam,
    given: answers[seamIndex],
    isRight: answers[seamIndex] === seam.answer,
  }))

  function selectSeam(seamIndex: number) {
    if (isChecked) return
    setActiveSeam(seamIndex)
  }

  function choose(text: string) {
    if (isChecked) return

    const next = [...answers]
    next[activeSeam] = text
    setAnswers(next)

    const nextEmpty = next.findIndex(answer => answer === null)
    if (nextEmpty >= 0) setActiveSeam(nextEmpty)
  }

  function check() {
    if (!current || !allFilled) return

    const hits = current.seams.filter((seam, seamIndex) => answers[seamIndex] === seam.answer).length
    const isPerfect = hits === current.seams.length

    setCorrectSeams(total => total + hits)
    setIsChecked(true)

    if (isPerfect) {
      const nextStreak = streak + 1
      setPerfectRounds(total => total + 1)
      setStreak(nextStreak)
      setBestStreak(best => Math.max(best, nextStreak))
      return
    }

    setStreak(0)
  }

  function next() {
    if (index + 1 >= round.length) {
      setIsCompleted(true)
      return
    }

    setIndex(currentIndex => currentIndex + 1)
    setAnswers(EMPTY_ANSWERS)
    setActiveSeam(0)
    setIsChecked(false)
  }

  function restart() {
    setSeed(randomSeed())
    setIndex(0)
    setAnswers(EMPTY_ANSWERS)
    setActiveSeam(0)
    setIsChecked(false)
    setCorrectSeams(0)
    setPerfectRounds(0)
    setStreak(0)
    setBestStreak(0)
    setIsCompleted(false)
  }

  return {
    topic,
    current,
    index,
    total: round.length,
    totalSeams: round.length * 3,
    answers,
    activeSeam,
    allFilled,
    isChecked,
    results,
    correctSeams,
    perfectRounds,
    streak,
    bestStreak,
    isCompleted,
    selectSeam,
    choose,
    check,
    next,
    restart,
    isLoading,
    error,
    refetch,
  } satisfies AsyncStatusShape
}
