import { Button } from '@common/Button'
import { CardBase } from '@common/CardBase'
import { cn } from '../../cn'
import { HOME_CARD, HOME_COPY, HOME_LABEL, HOME_VALUE } from '../../constant'
import { ProgressRing } from '../ProgressRing'
import type { VocabProgressCardProps } from './type'

export function VocabProgressCard({
  stats,
  isLoading,
  hasError,
  onPractice,
  className,
}: VocabProgressCardProps) {
  const summary = hasError
    ? 'No se pudo leer tu progreso.'
    : isLoading
      ? 'Leyendo tu progreso.'
      : stats.hasProgress
        ? `${stats.mastered} de ${stats.total} palabras dominadas`
        : 'Aún no has practicado. Empieza con cinco tarjetas.'

  const values: Array<number | string> =
    hasError || isLoading ? ['—', '—', '—'] : [stats.mastered, stats.reviewing, stats.fresh]

  return (
    <CardBase
      as="article"
      variant="goal"
      padding="md"
      aria-labelledby="home-vocab-title"
      aria-busy={isLoading}
      className={cn(HOME_CARD, className)}
    >
      <div className="flex flex-col items-start gap-3 min-[400px]:flex-row min-[400px]:items-center min-[400px]:gap-5">
        <ProgressRing
          value={isLoading || hasError ? 0 : stats.percent}
          label="Porcentaje de palabras dominadas"
        />
        <div className="min-w-0">
          <h3 id="home-vocab-title" className="text-[17px] font-bold text-text-main">
            {HOME_COPY.vocabTitle}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-text-secondary" aria-live="polite">
            {summary}
          </p>
        </div>
      </div>

      <dl className="grid grid-cols-3 gap-3">
        {HOME_COPY.vocabRows.map((row, index) => (
          <div key={row}>
            <dt className={HOME_LABEL}>{row}</dt>
            <dd className={HOME_VALUE}>{values[index]}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-auto pt-1">
        <Button size="md" fullWidth={false} arrow onClick={onPractice} className="w-full sm:w-auto">
          {HOME_COPY.practice}
        </Button>
      </div>
    </CardBase>
  )
}
