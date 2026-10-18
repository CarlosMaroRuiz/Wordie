import { useState, useEffect } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { PracticeHeader } from './PracticeHeader';
import { PracticeComplete } from './PracticeComplete';
import { PracticeCard } from './PracticeCard';
import type { PracticeModalProps } from './type';

export function PracticeModal({ open, onClose, cards, onEasy, onHard }: PracticeModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (open) {
      setCurrentIndex(0);
      setIsRevealed(false);
      setIsDone(cards.length === 0);
    }
  }, [open, cards]);

  const currentCard = cards[currentIndex];

  const handleNext = (difficulty: 'easy' | 'hard') => {
    if (currentCard) {
      if (difficulty === 'easy') onEasy(currentCard.id);
      else onHard(currentCard.id);
    }

    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsRevealed(false);
    } else {
      setIsDone(true);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md bg-bg-page rounded-3xl shadow-xl overflow-hidden flex flex-col min-h-[500px]">
          <PracticeHeader onClose={onClose} />
          
          <div className="flex-grow flex flex-col relative p-6">
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
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export type { PracticeModalProps } from './type';

