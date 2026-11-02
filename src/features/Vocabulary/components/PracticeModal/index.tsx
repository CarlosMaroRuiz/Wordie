import { useState, useEffect } from 'react'
import { Lightning } from '@phosphor-icons/react'
import { ModalBase } from '@common/ModalBase'
import { PracticeComplete } from './PracticeComplete'
import { PracticeCard } from './PracticeCard'
import type { PracticeModalProps } from './type'

export function PracticeModal({ open, onClose, cards, onEasy, onHard }: PracticeModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if (open) {
      setCurrentIndex(0)
      setIsRevealed(false)
      setIsDone(cards.length === 0)
    }
  }, [open, cards])

  const currentCard = cards[currentIndex]

  const handleNext = (difficulty: 'easy' | 'hard') => {
    if (currentCard) {
      if (difficulty === 'easy') onEasy(currentCard.id)
      else onHard(currentCard.id)
    }

    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setIsRevealed(false)
    } else {
      setIsDone(true)
    }
  }

  return (
    <ModalBase
      open={open}
      onClose={onClose}
      size="md"
      variant="page"
      className="min-h-[500px]"
      title={
        <div className="flex items-center gap-2 text-lg font-bold text-text-main">
          <Lightning weight="fill" className="text-primary" />
          <span>Sesión de práctica</span>
        </div>
      }
    >
      <div className="relative flex flex-grow flex-col">
        {isDone ? (
          <PracticeComplete totalPracticed={cards.length} onClose={onClose} />
        ) : currentCard ? (
          <PracticeCard
            card={currentCard}
            currentIndex={currentIndex}
            totalCards={cards.length}
            isRevealed={isRevealed}
            onReveal={() => setIsRevealed(true)}
            onNext={handleNext}
          />
        ) : null}
      </div>
    </ModalBase>
  )
}

export type { PracticeModalProps } from './type'
