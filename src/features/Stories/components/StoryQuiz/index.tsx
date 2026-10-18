import { CardBase } from '@common/CardBase'
import type { StoryQuizProps } from './type'
import { QuizQuestion } from './QuizQuestion'
import { QuizScoreCard } from './QuizScoreCard'

export function StoryQuiz({
  quiz,
  answers,
  score,
  onSelectAnswer,
  onResetQuiz,
}: StoryQuizProps) {
  if (quiz.length === 0) return null

  return (
    <CardBase padding="md" className="flex flex-col gap-4">
      <div className="border-b border-border-subtle/60 pb-2">
        <h3 className="text-base font-bold text-text-main">Preguntas de comprensión</h3>
      </div>

      <div className="flex flex-col gap-5">
        {quiz.map((q, idx) => (
          <QuizQuestion
            key={q.id}
            question={q}
            questionIndex={idx}
            selectedAnswer={answers[q.id]}
            onSelectAnswer={onSelectAnswer}
          />
        ))}
      </div>

      {score.completed && (
        <QuizScoreCard
          correct={score.correct}
          total={score.total}
          onReset={onResetQuiz}
        />
      )}
    </CardBase>
  )
}
