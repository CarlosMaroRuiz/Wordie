import { useState } from 'react';
import { useSound } from '@common/hooks/useSound';
import type { UseGrammarQuizProps } from './type';

export const useGrammarQuiz = ({ quizzes }: UseGrammarQuizProps) => {
  // Guarda el índice seleccionado por cada pregunta { quizIndex: selectedOptionIndex }
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const { play: playCorrect } = useSound('/sound/correct-cuestion.wav');
  const { play: playError } = useSound('/sound/error-question.mp3');

  const handleSelect = (quizIndex: number, optionIndex: number) => {
    if (answers[quizIndex] !== undefined) return;

    setAnswers(prev => ({ ...prev, [quizIndex]: optionIndex }));

    if (optionIndex === quizzes[quizIndex].correctIndex) {
      playCorrect();
    } else {
      playError();
    }
  };

  const getOptionStyle = (quizIndex: number, optionIndex: number): string => {
    const selected = answers[quizIndex];
    const checkOk = quizzes[quizIndex].correctIndex;
    const isAnswered = selected !== undefined;

    const base =
      'w-full flex items-center gap-3 text-left border-[1.5px] rounded-2xl px-[18px] py-[14px] text-[15px] font-semibold cursor-pointer transition-colors duration-150';

    if (!isAnswered) {
      return `${base} border-border-subtle bg-surface text-text-main hover:border-primary`;
    }
    if (optionIndex === checkOk) {
      return `${base} border-success bg-success-light text-text-main font-bold`;
    }
    if (optionIndex === selected && selected !== checkOk) {
      return `${base} border-error bg-error-light text-text-main font-bold`;
    }
    return `${base} border-border-subtle bg-surface text-text-main opacity-50`;
  };

  const getOptionState = (quizIndex: number, optionIndex: number) => {
    const selected = answers[quizIndex];
    const isAnswered = selected !== undefined;
    const isCorrect = optionIndex === quizzes[quizIndex].correctIndex;
    const isSelected = optionIndex === selected;

    return {
      isCorrect: isAnswered && isCorrect,
      isIncorrect: isAnswered && isSelected && !isCorrect,
      isEmpty: !isAnswered || (!isCorrect && !isSelected),
      isAnswered,
    };
  };

  return {
    handleSelect,
    getOptionStyle,
    getOptionState,
  };
};