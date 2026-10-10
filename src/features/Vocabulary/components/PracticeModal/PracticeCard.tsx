import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowClockwise } from '@phosphor-icons/react';
import { Button } from '@common/Button';
import type { PracticeCardProps } from './types';

export const PracticeCard = ({ 
  card, 
  currentIndex, 
  totalCards, 
  isRevealed, 
  onReveal, 
  onNext 
}: PracticeCardProps) => {
  return (
    <>
      <div className="text-sm font-medium text-text-secondary text-center mb-6">
        Tarjeta {currentIndex + 1} de {totalCards}
      </div>
      
      <div className="relative flex-grow flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={card.id}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-surface border border-border-subtle rounded-2xl p-8 flex flex-col items-center text-center shadow-sm"
          >
            <h2 className="text-4xl font-bold text-text-main mb-2">{card.word}</h2>
            <p className="text-text-secondary text-lg mb-8">{card.phonetic}</p>
            
            <div className="w-full relative min-h-[120px] flex flex-col items-center justify-center">
              {!isRevealed && (
                <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md bg-bg-page/50 rounded-xl z-10 border border-border-subtle">
                  <Button variant="primary" onClick={onReveal}>
                    Mostrar respuesta
                  </Button>
                </div>
              )}
              
              <div className={`transition-opacity duration-300 w-full ${!isRevealed ? 'opacity-20 blur-sm pointer-events-none' : 'opacity-100'}`}>
                <p className="text-2xl font-bold text-primary mb-4">{card.translation}</p>
                
                {card.definition && (
                  <div className="bg-bg-page p-3 rounded-xl w-full mb-3 text-left">
                    <p className="text-[11px] font-bold text-text-secondary uppercase tracking-widest mb-1">Definición</p>
                    <p className="text-sm text-text-main leading-relaxed">{card.definition}</p>
                  </div>
                )}

                {card.examples[0] && (
                  <div className="bg-bg-page p-3 rounded-xl w-full text-left">
                    <p className="text-[11px] font-bold text-text-secondary uppercase tracking-widest mb-1">Ejemplo</p>
                    <p className="text-sm font-medium text-text-main italic mb-1">"{card.examples[0].en}"</p>
                    <p className="text-sm text-text-secondary">"{card.examples[0].es}"</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {isRevealed && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4 mt-6"
        >
          <Button 
            variant="danger" 
            onClick={() => onNext('hard')}
            className="flex items-center justify-center gap-2"
          >
            <ArrowClockwise weight="bold" />
            Difícil
          </Button>
          <Button 
            variant="success" 
            onClick={() => onNext('easy')}
            className="flex items-center justify-center gap-2"
          >
            <Check weight="bold" />
            Fácil
          </Button>
        </motion.div>
      )}
    </>
  );
};
