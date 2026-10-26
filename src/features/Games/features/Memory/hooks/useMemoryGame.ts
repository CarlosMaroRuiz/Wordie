import { useCallback, useEffect, useRef, useState } from 'react'
import { useSpeechSynthesis } from '@common/hooks/useSpeechSynthesis'
import { MEMORY_WORD_PAIRS } from '../constant'
import type { MemoryCardItem } from '../type'

function createDeck(): MemoryCardItem[] {
  const cards: MemoryCardItem[] = []
  for (const pair of MEMORY_WORD_PAIRS) {
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

  // Fisher-Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = cards[i]!
    cards[i] = cards[j]!
    cards[j] = temp
  }

  return cards
}

export function useMemoryGame() {
  const [cards, setCards] = useState<MemoryCardItem[]>(createDeck)
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([])
  const [isLocked, setIsLocked] = useState(false)
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const { speak } = useSpeechSynthesis()
  const timerRef = useRef<number | null>(null)

  const isWon = matches === MEMORY_WORD_PAIRS.length

  // Timer loop
  useEffect(() => {
    if (isPlaying && !isWon) {
      timerRef.current = window.setInterval(() => {
        setSeconds(s => s + 1)
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

      setCards(prev =>
        prev.map((c, i) => (i === index ? { ...c, isFlipped: true } : c)),
      )
      setFlippedIndexes(nextFlipped)

      if (nextFlipped.length === 2) {
        setMoves(m => m + 1)
        const [firstIdx, secondIdx] = nextFlipped
        const first = cards[firstIdx!]!
        const second = target

        if (first.pairId === second.pairId) {
          // Match!
          setMatches(m => m + 1)
          setCards(prev =>
            prev.map((c, i) =>
              i === firstIdx || i === secondIdx ? { ...c, isMatched: true } : c,
            ),
          )
          setFlippedIndexes([])
        } else {
          // No match: turn back after delay
          setIsLocked(true)
          setTimeout(() => {
            setCards(prev =>
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
    if (timerRef.current) clearInterval(timerRef.current)
    setCards(createDeck())
    setFlippedIndexes([])
    setIsLocked(false)
    setMoves(0)
    setMatches(0)
    setSeconds(0)
    setIsPlaying(false)
  }, [])

  return {
    cards,
    moves,
    matches,
    totalPairs: MEMORY_WORD_PAIRS.length,
    seconds,
    isWon,
    flipCard,
    restart,
  }
}
