import { useEffect, useMemo, useState } from 'react'
import { useFetch } from '@common/hooks/useFetch'
import { useTopicStore } from '@common/layouts/MainLayout/useTopicStore'
import type { AsyncStatusShape } from '@common/types/async'
import { mulberry32, randomSeed, shuffleWith } from '@common/utils/shuffle'
import { getReflexRating, ROUNDS_PER_GAME } from '../constant'
import type { FastShifterDTO, ShiftSlotTokenDTO } from '../dto'
import type { FastShifterStats, ReflexRating, SlotAnswers } from '../type'

function isSlotToken(token: FastShifterDTO['tokens'][number]): token is ShiftSlotTokenDTO {
  return token.type === 'slot'
}

function buildRound(items: FastShifterDTO[], topic: string, seed: number): FastShifterDTO[] {
  const rand = mulberry32(seed)
  const filtered = items.filter(item => item.topic === topic)
  const pool = filtered.length > 0 ? filtered : items
  return shuffleWith(pool, rand).slice(0, ROUNDS_PER_GAME)
}

export function useFastShifter() {
  const { data, isLoading, error, refetch } = useFetch<FastShifterDTO[]>('/data/fast-shifter.json')
  const topic = useTopicStore(state => state.topic)

  const [seed, setSeed] = useState(randomSeed)
  const [roundTopic, setRoundTopic] = useState(topic)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<SlotAnswers>({})
  const [activeSlotId, setActiveSlotId] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [reflexRating, setReflexRating] = useState<ReflexRating | undefined>()

  const [stats, setStats] = useState<FastShifterStats>({
    score: 0,
    streak: 0,
    bestStreak: 0,
    correctCount: 0,
    nativeReflexCount: 0,
  })

  // Sincronizar reinicio cuando cambia el tema global
  if (roundTopic !== topic) {
    setRoundTopic(topic)
    setIndex(0)
    setAnswers({})
    setActiveSlotId(null)
    setIsAnswered(false)
    setIsCorrect(false)
    setIsCompleted(false)
    setElapsedSeconds(0)
    setReflexRating(undefined)
    setStats({
      score: 0,
      streak: 0,
      bestStreak: 0,
      correctCount: 0,
      nativeReflexCount: 0,
    })
  }

  const round = useMemo(() => buildRound(data ?? [], topic, seed), [data, topic, seed])
  const current = round[index] ?? null

  const slotTokens = useMemo(() => {
    if (!current) return []
    return current.tokens.filter(isSlotToken)
  }, [current])

  // Slot activo efectivo (por defecto el primer slot de la oración si no se ha elegido ninguno)
  const effectiveActiveSlotId = activeSlotId ?? (slotTokens.length > 0 ? slotTokens[0].id : null)

  // Temporizador de reflejo
  useEffect(() => {
    if (!current || isAnswered || isCompleted) return

    const interval = window.setInterval(() => {
      setElapsedSeconds(prev => +(prev + 0.1).toFixed(1))
    }, 100)

    return () => window.clearInterval(interval)
  }, [current, isAnswered, isCompleted, index])

  const activeSlot = useMemo(() => {
    if (!effectiveActiveSlotId) return null
    return slotTokens.find(slot => slot.id === effectiveActiveSlotId) ?? null
  }, [slotTokens, effectiveActiveSlotId])

  const allSlotsFilled = useMemo(() => {
    if (slotTokens.length === 0) return false
    return slotTokens.every(slot => Boolean(answers[slot.id]))
  }, [slotTokens, answers])

  function selectSlot(slotId: string) {
    if (isAnswered) return
    setActiveSlotId(slotId)
  }

  function chooseOption(option: string) {
    const targetSlotId = effectiveActiveSlotId
    if (!targetSlotId || isAnswered) return

    const newAnswers = { ...answers, [targetSlotId]: option }
    setAnswers(newAnswers)

    // Ergonomía Mobile: avanzar automáticamente al siguiente slot no rellenado
    const nextSlot = slotTokens.find(slot => slot.id !== targetSlotId && !newAnswers[slot.id])
    if (nextSlot) {
      setActiveSlotId(nextSlot.id)
    }
  }

  function check() {
    if (!current || !allSlotsFilled || isAnswered) return

    const correct = slotTokens.every(slot => answers[slot.id] === slot.correct)
    const rating = getReflexRating(elapsedSeconds)

    setIsAnswered(true)
    setIsCorrect(correct)
    setReflexRating(rating)

    const pointsEarned = correct ? Math.round(100 * rating.multiplier) : 0
    const newStreak = correct ? stats.streak + 1 : 0
    const isNative = correct && rating.speed === 'native'

    setStats(prev => ({
      score: prev.score + pointsEarned,
      streak: newStreak,
      bestStreak: Math.max(prev.bestStreak, newStreak),
      correctCount: prev.correctCount + (correct ? 1 : 0),
      nativeReflexCount: prev.nativeReflexCount + (isNative ? 1 : 0),
    }))
  }

  function next() {
    if (index + 1 >= round.length) {
      setIsCompleted(true)
      return
    }

    setIndex(prev => prev + 1)
    setAnswers({})
    setActiveSlotId(null)
    setIsAnswered(false)
    setIsCorrect(false)
    setElapsedSeconds(0)
    setReflexRating(undefined)
  }

  function restart() {
    setSeed(randomSeed())
    setIndex(0)
    setAnswers({})
    setActiveSlotId(null)
    setIsAnswered(false)
    setIsCorrect(false)
    setIsCompleted(false)
    setElapsedSeconds(0)
    setReflexRating(undefined)
    setStats({
      score: 0,
      streak: 0,
      bestStreak: 0,
      correctCount: 0,
      nativeReflexCount: 0,
    })
  }

  return {
    current,
    index,
    total: round.length,
    answers,
    activeSlot,
    activeSlotId: effectiveActiveSlotId,
    allSlotsFilled,
    isAnswered,
    isCorrect,
    isCompleted,
    elapsedSeconds,
    reflexRating,
    stats,
    selectSlot,
    chooseOption,
    check,
    next,
    restart,
    isLoading,
    error,
    refetch,
  } satisfies AsyncStatusShape
}
