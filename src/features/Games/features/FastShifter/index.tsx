import { useState } from 'react'
import { ArrowsClockwiseIcon } from '@phosphor-icons/react'
import { Button } from '@common/Button'
import { AsyncBoundary } from '@common/components/AsyncBoundary'
import { EmptyState } from '@common/components/EmptyState'
import { GameIntroModal } from '@features/Games/components/GameIntroModal'
import { GameProgressHUD } from '@features/Games/components/GameProgressHUD'
import { GameResultModal } from '@features/Games/components/GameResultModal'
import { MorphingSentence } from './components/MorphingSentence'
import { ShiftFeedback } from './components/ShiftFeedback'
import { ShiftPrompt } from './components/ShiftPrompt'
import { ThumbPalette } from './components/ThumbPalette'
import { FAST_SHIFTER_INTRO } from './constant'
import { useFastShifter } from './hooks/useFastShifter'

export default function FastShifter() {
  const [isIntroOpen, setIsIntroOpen] = useState(true)

  const {
    current,
    index,
    total,
    answers,
    activeSlot,
    activeSlotId,
    allSlotsFilled,
    isAnswered,
    isCorrect,
    isCompleted,
    elapsedSeconds,
    reflexRating,
    stats,
    selectSlot,
    chooseOption,
    check,
    next,
    restart,
    isLoading,
    error,
    refetch,
  } = useFastShifter()

  const isPerfect = stats.correctCount === total && total > 0

  return (
    <AsyncBoundary
      isLoading={isLoading}
      error={error}
      onRetry={refetch}
      errorTitle="Error al cargar los desafíos de transformación"
    >
      {current ? (
        <div className="mx-auto flex h-[100dvh] w-full max-w-3xl flex-col justify-between overflow-hidden bg-bg-page select-none sm:h-auto sm:min-h-[85vh] sm:p-4">
          {/* ZONA 1: Top HUD Duolingo (fijo, ~44px) */}
          <GameProgressHUD
            currentRound={index + 1}
            totalRounds={total}
            streak={stats.streak}
            elapsedSeconds={elapsedSeconds}
            speedMultiplier={reflexRating?.multiplier}
            reflexTone={reflexRating?.speed ?? 'analytical'}
            isTimerStopped={isAnswered}
            onOpenHelp={() => setIsIntroOpen(true)}
          />

          {/* Modal de instrucciones al inicio */}
          <GameIntroModal
            open={isIntroOpen}
            onAccept={() => setIsIntroOpen(false)}
            icon={<ArrowsClockwiseIcon size={34} weight="duotone" />}
            title={FAST_SHIFTER_INTRO.title}
            description={FAST_SHIFTER_INTRO.description}
            steps={[...FAST_SHIFTER_INTRO.steps]}
            note="Juego optimizado para uso rápido con los pulgares en móvil (Modo Enfoque Zero-Scroll)."
          />

          {/* ZONA 2: Play Canvas Central (centrado, flex-1) */}
          <div className="flex min-h-0 flex-1 flex-col justify-center gap-3 overflow-y-auto px-3.5 py-2 sm:gap-4 sm:overflow-visible sm:px-4">
            <ShiftPrompt
              baseSentence={current.baseSentence}
              shiftInstruction={current.shiftInstruction}
              shiftType={current.shiftType}
            />

            <MorphingSentence
              tokens={current.tokens}
              answers={answers}
              activeSlotId={activeSlotId}
              isAnswered={isAnswered}
              onSelectSlot={selectSlot}
            />
          </div>

          {/* ZONA 3: Bottom Action Dock (anclado en la Thumb Zone) */}
          <div className="shrink-0 border-t border-border-subtle bg-bg-page px-3.5 pt-2.5 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:px-4 sm:pb-2">
            <div className="flex flex-col gap-2.5">
              {!isAnswered ? (
                <>
                  <ThumbPalette
                    activeSlot={activeSlot}
                    selectedAnswer={activeSlot ? answers[activeSlot.id] : undefined}
                    disabled={isAnswered}
                    onChooseOption={chooseOption}
                  />
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={!allSlotsFilled}
                    onClick={check}
                    className="min-h-12 rounded-full text-base font-bold shadow-brand sm:min-h-[50px]"
                  >
                    Comprobar Mutación
                  </Button>
                </>
              ) : (
                <>
                  <ShiftFeedback
                    isCorrect={isCorrect}
                    trapExplanation={current.trapExplanation}
                    fullCorrect={current.fullCorrect}
                    translation={current.translation}
                    reflexRating={reflexRating}
                  />
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={next}
                    className="min-h-12 rounded-full text-base font-bold shadow-brand sm:min-h-[50px]"
                  >
                    {index + 1 >= total ? 'Ver Resultados' : 'Siguiente Mutación'}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Modal de cierre de partida */}
          <GameResultModal
            open={isCompleted}
            title={isPerfect ? '¡Reflejos Perfectos!' : '¡Ronda Completada!'}
            subtitle={
              isPerfect
                ? 'Completaste todas las transformaciones sin cometer errores sintácticos.'
                : 'Buen entrenamiento de automatización. Revisa los auxiliares para mejorar tu tiempo.'
            }
            metrics={[
              { label: 'Puntos', value: stats.score },
              { label: 'Aciertos', value: `${stats.correctCount}/${total}` },
              { label: 'Reflejos Nativos', value: stats.nativeReflexCount },
              { label: 'Mejor Racha', value: stats.bestStreak },
            ]}
            onPlayAgain={restart}
          />
        </div>
      ) : (
        <div className="mx-auto w-full max-w-2xl p-4">
          <EmptyState variant="dashed" title="No hay transformaciones disponibles para este tema." />
        </div>
      )}
    </AsyncBoundary>
  )
}
