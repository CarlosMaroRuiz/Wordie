import { useCallback, useEffect, useRef, useState } from 'react'
import { useFetch } from '@common/hooks/useFetch'
import { useSpeechSynthesis } from '@common/hooks/useSpeechSynthesis'
import { useTopicStore } from '@common/layouts/MainLayout/useTopicStore'
import type { AsyncStatusShape } from '@common/types/async'
import { PAIRS_PER_GAME } from '../constant'
import type { MemoryCardItem, MemoryPairDTO } from '../type'

function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = result[i]!
    result[i] = result[j]!
    result[j] = temp
  }
  return result
}

function createDeck(pairs: MemoryPairDTO[]): MemoryCardItem[] {
  const cards: MemoryCardItem[] = []
  for (const pair of pairs) {
    cards.push({
      uid: `${pair.id}-en`,
      pairId: pair.id,
      text: pair.en,
      lang: 'en',
      phonetic: pair.phonetic,
      isFlipped: false,
      isMatched: false,
    })
    cards.push({
      uid: `${pair.id}-es`,
      pairId: pair.id,
      text: pair.es,
      lang: 'es',
      isFlipped: false,
      isMatched: false,
    })
  }
  return shuffle(cards)
}

function selectGamePairs(allPairs: MemoryPairDTO[], topic: string): MemoryPairDTO[] {
  const filtered = allPairs.filter((p) => p.topic === topic)
  const pool = filtered.length >= PAIRS_PER_GAME ? filtered : allPairs
  return shuffle(pool).slice(0, PAIRS_PER_GAME)
}

export function useMemoryGame() {
  const topic = useTopicStore((s) => s.topic)
  const { data: allPairs, isLoading, error, refetch } = useFetch<MemoryPairDTO[]>('/data/memory.json')

  const [cards, setCards] = useState<MemoryCardItem[]>([])
  const [activePairsCount, setActivePairsCount] = useState(PAIRS_PER_GAME)
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([])
  const [isLocked, setIsLocked] = useState(false)
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const { speak } = useSpeechSynthesis()
  const timerRef = useRef<number | null>(null)

  const isWon = cards.length > 0 && matches === activePairsCount

  const initGame = useCallback((pairs: MemoryPairDTO[], currentTopic: string) => {
    if (timerRef.current) clearInterval(timerRef.current)
    const selected = selectGamePairs(pairs, currentTopic)
    setActivePairsCount(selected.length)
    setCards(createDeck(selected))
    setFlippedIndexes([])
    setIsLocked(false)
    setMoves(0)
    setMatches(0)
    setSeconds(0)
    setIsPlaying(false)
  }, [])

  // Inicializar o reiniciar cuando cambian los datos o el topic global
  useEffect(() => {
    if (!allPairs || allPairs.length === 0) return
    initGame(allPairs, topic)
  }, [allPairs, topic, initGame])

  // Timer loop
  useEffect(() => {
    if (isPlaying && !isWon) {
      timerRef.current = window.setInterval(() => {
        setSeconds((s) => s + 1)
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, isWon])

  const flipCard = useCallback(
    (index: number) => {
      if (isLocked) return
      const target = cards[index]
      if (!target || target.isFlipped || target.isMatched) return

      if (!isPlaying) {
        setIsPlaying(true)
      }

      if (target.lang === 'en') {
        speak(target.text)
      }

      const nextFlipped = [...flippedIndexes, index]

      setCards((prev) =>
        prev.map((c, i) => (i === index ? { ...c, isFlipped: true } : c)),
      )
      setFlippedIndexes(nextFlipped)

      if (nextFlipped.length === 2) {
        setMoves((m) => m + 1)
        const [firstIdx, secondIdx] = nextFlipped
        const first = cards[firstIdx!]!
        const second = target

        if (first.pairId === second.pairId) {
          // Match!
          setMatches((m) => m + 1)
          setCards((prev) =>
            prev.map((c, i) =>
              i === firstIdx || i === secondIdx ? { ...c, isMatched: true } : c,
            ),
          )
          setFlippedIndexes([])
        } else {
          // No match: turn back after delay
          setIsLocked(true)
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c, i) =>
                i === firstIdx || i === secondIdx ? { ...c, isFlipped: false } : c,
              ),
            )
            setFlippedIndexes([])
            setIsLocked(false)
          }, 900)
        }
      }
    },
    [cards, flippedIndexes, isLocked, isPlaying, speak],
  )

  const restart = useCallback(() => {
    if (!allPairs || allPairs.length === 0) return
    initGame(allPairs, topic)
  }, [allPairs, topic, initGame])

  return {
    cards,
    moves,
    matches,
    totalPairs: activePairsCount,
    seconds,
    isWon,
    isLoading,
    error,
    topic,
    refetch,
    flipCard,
    restart,
  } satisfies AsyncStatusShape
}
