import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { useFetch } from '@common/hooks/useFetch'
import { useSpeechSynthesis } from '@common/hooks/useSpeechSynthesis'
import { useTopicStore } from '@common/layouts/MainLayout/useTopicStore'
import type { AsyncStatusShape } from '@common/types/async'
import { ROUNDS_PER_GAME } from '../constant'
import type { GameStatus, SentenceDTO, WordChip } from '../type'

function shuffleArray<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = result[i]!
    result[i] = result[j]!
    result[j] = temp
  }
  return result
}

function prepareChips(sentence: SentenceDTO): WordChip[] {
  const allWords = [...sentence.enWords, ...(sentence.distractors ?? [])]
  const chips: WordChip[] = allWords.map((word, index) => ({
    id: `${sentence.id}-chip-${index}-${word}`,
    text: word,
    originalIndex: index,
  }))
  return shuffleArray(chips)
}

function selectRoundSentences(sentences: SentenceDTO[], topic: string): SentenceDTO[] {
  const filtered = sentences.filter((s) => s.topic === topic)
  const pool = filtered.length > 0 ? filtered : sentences
  return shuffleArray(pool).slice(0, ROUNDS_PER_GAME)
}

export function useSentenceBuilder() {
  const topic = useTopicStore((s) => s.topic)
  const { data: sentences, isLoading, error, refetch } = useFetch<SentenceDTO[]>('/data/sentences.json')

  const [roundSentences, setRoundSentences] = useState<SentenceDTO[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentSentence = roundSentences[currentIndex] ?? null

  const [availableChips, setAvailableChips] = useState<WordChip[]>([])
  const [placedChips, setPlacedChips] = useState<WordChip[]>([])
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle')
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [isHintActive, setIsHintActive] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const { speak, isSpeaking, stop } = useSpeechSynthesis()
  const nextTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const initSentence = useCallback((sentence: SentenceDTO) => {
    setAvailableChips(prepareChips(sentence))
    setPlacedChips([])
    setGameStatus('idle')
    setIsHintActive(false)
  }, [])

  // Sincronizar ronda cuando se cargan los datos o cambia el topic
  useEffect(() => {
    if (!sentences || sentences.length === 0) return

    const newSentences = selectRoundSentences(sentences, topic)
    setRoundSentences(newSentences)
    setCurrentIndex(0)
    setScore(0)
    setStreak(0)
    setMistakes(0)
    setIsCompleted(false)

    if (newSentences[0]) {
      initSentence(newSentences[0])
    }
  }, [sentences, topic, initSentence])

  // Limpiar timeout y audio al desmontar
  useEffect(() => {
    return () => {
      if (nextTimeoutRef.current) clearTimeout(nextTimeoutRef.current)
      stop()
    }
  }, [stop])

  const placeChip = useCallback((chip: WordChip) => {
    setAvailableChips((prev) => prev.filter((c) => c.id !== chip.id))
    setPlacedChips((prev) => [...prev, chip])
    setGameStatus((prev) => (prev === 'incorrect' ? 'idle' : prev))
  }, [])

  const removeChip = useCallback((chip: WordChip) => {
    setPlacedChips((prev) => prev.filter((c) => c.id !== chip.id))
    setAvailableChips((prev) => [...prev, chip])
    setGameStatus((prev) => (prev === 'incorrect' ? 'idle' : prev))
  }, [])

  const clearPlacedChips = useCallback(() => {
    setAvailableChips((prev) => [...prev, ...placedChips])
    setPlacedChips([])
    setGameStatus('idle')
  }, [placedChips])

  const speakCurrentSentence = useCallback(() => {
    if (!currentSentence) return
    speak(currentSentence.enWords.join(' '), { rate: 0.9 })
  }, [currentSentence, speak])

  const checkAnswer = useCallback(() => {
    if (!currentSentence || placedChips.length === 0) return
    const isMatch =
      currentSentence.enWords.length === placedChips.length &&
      currentSentence.enWords.every((word, idx) => word === placedChips[idx]?.text)

    if (isMatch) {
      setGameStatus('correct')
      setScore((s) => s + 20 + streak * 5)
      setStreak((st) => st + 1)
      speakCurrentSentence()
    } else {
      setGameStatus('incorrect')
      setMistakes((m) => m + 1)
      setStreak(0)
    }
  }, [currentSentence, placedChips, streak, speakCurrentSentence])

  const nextSentence = useCallback(() => {
    if (nextTimeoutRef.current) {
      clearTimeout(nextTimeoutRef.current)
      nextTimeoutRef.current = null
    }
    const nextIdx = currentIndex + 1
    if (nextIdx < roundSentences.length) {
      setCurrentIndex(nextIdx)
      const nextSen = roundSentences[nextIdx]
      if (nextSen) initSentence(nextSen)
    } else {
      setIsCompleted(true)
    }
  }, [currentIndex, roundSentences, initSentence])

  const toggleHint = useCallback(() => {
    setIsHintActive((prev) => !prev)
  }, [])

  const placeNextWordHint = useCallback(() => {
    if (!currentSentence) return
    const expectedWord = currentSentence.enWords[placedChips.length]
    const chipToPlace = availableChips.find((c) => c.text === expectedWord)
    if (chipToPlace) {
      placeChip(chipToPlace)
      setIsHintActive(true)
    }
  }, [currentSentence, placedChips.length, availableChips, placeChip])

  const restartGame = useCallback(() => {
    if (!sentences || sentences.length === 0) return
    const newSentences = selectRoundSentences(sentences, topic)
    setRoundSentences(newSentences)
    setCurrentIndex(0)
    setScore(0)
    setStreak(0)
    setMistakes(0)
    setIsCompleted(false)
    if (newSentences[0]) initSentence(newSentences[0])
  }, [sentences, topic, initSentence])

  const isAllTargetWordsPlaced = useMemo(() => {
    if (!currentSentence) return false
    return placedChips.length === currentSentence.enWords.length
  }, [currentSentence, placedChips.length])

  return {
    topic,
    currentSentence,
    currentIndex,
    totalRounds: roundSentences.length,
    availableChips,
    placedChips,
    gameStatus,
    score,
    streak,
    mistakes,
    isHintActive,
    isCompleted,
    isSpeaking,
    isAllTargetWordsPlaced,
    isLoading,
    error,
    refetch,
    placeChip,
    removeChip,
    clearPlacedChips,
    checkAnswer,
    nextSentence,
    toggleHint,
    placeNextWordHint,
    speakCurrentSentence,
    restartGame,
  } satisfies AsyncStatusShape
}
