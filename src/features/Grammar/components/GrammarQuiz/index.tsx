import { CheckCircle, XCircle } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { useGrammarQuiz } from './useGrammarQuiz';
import type { GrammarQuizProps } from './type';

export const GrammarQuiz = ({ quizzes }: GrammarQuizProps) => {
  const { handleSelect, getOptionStyle, getOptionState } = useGrammarQuiz({ quizzes });

  return (
    <div className="border-t border-border-subtle pt-5 mt-5 flex flex-col gap-6">
      {quizzes.map((quiz, quizIndex) => (
        <div key={quizIndex} className="flex flex-col gap-3">
          <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">
            {quizzes.length > 1 ? `PREGUNTA ${quizIndex + 1}` : 'MINI CHEQUEO DE COMPRENSIÓN'}
          </span>

          <p className="font-bold text-text-main text-base">{quiz.question}</p>

          <div className="flex flex-col gap-2">
            {quiz.options.map((opt, optionIndex) => {
              const { isCorrect, isIncorrect, isEmpty, isAnswered } = getOptionState(quizIndex, optionIndex);

              return (
                <motion.button
                  key={optionIndex}
                  className={getOptionStyle(quizIndex, optionIndex)}
                  onClick={() => handleSelect(quizIndex, optionIndex)}
                  disabled={isAnswered}
                  whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  animate={
                    isIncorrect ? { x: [-4, 4, -4, 4, 0], transition: { duration: 0.3 } } :
                    isCorrect ? { scale: [1, 1.02, 1], transition: { duration: 0.3 } } :
                    {}
                  }
                >
                  {isCorrect && (
                    <CheckCircle size={18} weight="fill" className="text-success shrink-0" />
                  )}
                  {isIncorrect && (
                    <XCircle size={18} weight="fill" className="text-error shrink-0" />
                  )}
                  {isEmpty && (
                    <span className="w-[18px] shrink-0" />
                  )}
                  {opt}
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};