import { useState } from 'react'
import { HandTapIcon, MagnifyingGlassIcon } from '@phosphor-icons/react'
import { AsyncBoundary } from '@common/components/AsyncBoundary'
import { EmptyState } from '@common/components/EmptyState'
import { GameHelpModal } from '@features/Games/components/GameHelpModal'
import { GameIntroModal } from '@features/Games/components/GameIntroModal'
import { GameProgressHUD } from '@features/Games/components/GameProgressHUD'
import { GameResultModal } from '@features/Games/components/GameResultModal'
import { CATEGORY_CUE, CATEGORY_LABEL, CATEGORY_ORDER } from './constant'
import { IntruderFeedback } from './components/IntruderFeedback'
import { IntruderSentence } from './components/IntruderSentence'
import { useIntruderWord } from './hooks/useIntruderWord'

const HELP_SECTIONS = CATEGORY_ORDER.map(category => ({
  title: CATEGORY_LABEL[category],
  body: CATEGORY_CUE[category],
}))

export default function IntruderWord() {
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [isIntroOpen, setIsIntroOpen] = useState(true)
  const {
    current,
    index,
    total,
    selectedIndex,
    isAnswered,
    isCorrect,
    correctCount,
    streak,
    bestStreak,
    isCompleted,
    selectWord,
    next,
    restart,
    isLoading,
    error,
    refetch,
  } = useIntruderWord()

  const isPerfect = correctCount === total

  return (
    <AsyncBoundary
      isLoading={isLoading}
      error={error}
      onRetry={refetch}
      errorTitle="Error al cargar las oraciones"
    >
      {current ? (
        <div className="mx-auto flex h-[100dvh] w-full max-w-3xl flex-col justify-between overflow-hidden bg-bg-page select-none sm:h-auto sm:min-h-[85vh] sm:p-4">
          {/* ZONA 1: Top HUD Duolingo */}
          <GameProgressHUD
            currentRound={index + 1}
            totalRounds={total}
            streak={streak}
            onOpenHelp={() => setIsHelpOpen(true)}
          />

          <GameIntroModal
            open={isIntroOpen}
            onAccept={() => setIsIntroOpen(false)}
            icon={<MagnifyingGlassIcon size={34} weight="duotone" />}
            title="Palabra Intrusa"
            description="En cada oración sobra una palabra. Toca la que no debería estar."
            steps={[
              'Lee la oración completa antes de tocar nada.',
              'Toca la palabra que rompe la gramática o repite una idea.',
              'Si fallas, la correcta se marca en verde con la explicación.',
            ]}
            note="Modo Enfoque Zero-Scroll: sin scroll, controles al alcance de los pulgares."
          />

          {/* ZONA 2: Play Canvas Central */}
          <div className="flex min-h-0 flex-1 flex-col justify-center gap-3 overflow-y-auto px-3.5 py-2 sm:gap-4 sm:overflow-visible sm:px-4">
            <IntruderSentence
              key={current.id}
              question={current}
              selectedIndex={selectedIndex}
              isAnswered={isAnswered}
              onSelect={selectWord}
            />
          </div>

          {/* ZONA 3: Bottom Action Dock (Thumb Zone) */}
          <div className="shrink-0 border-t border-border-subtle bg-bg-page px-3.5 pt-2.5 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:px-4 sm:pb-2">
            {!isAnswered ? (
              <div className="flex min-h-12 items-center justify-center gap-1.5 rounded-2xl border border-dashed border-border-subtle/80 bg-surface-muted/40 px-3 py-2 text-center text-xs font-semibold text-text-tertiary">
                <HandTapIcon size={16} weight="bold" className="text-primary" aria-hidden="true" />
                <span>Toca con el pulgar la palabra que consideres sobrante</span>
              </div>
            ) : (
              <IntruderFeedback
                question={current}
                isAnswered={isAnswered}
                isCorrect={isCorrect}
                isLast={index + 1 >= total}
                onNext={next}
              />
            )}
          </div>

          <GameResultModal
            open={isCompleted}
            title={isPerfect ? '¡Ronda perfecta!' : 'Ronda completada'}
            subtitle={
              isPerfect
                ? 'Encontraste todas las palabras intrusas.'
                : 'Repasa las explicaciones y vuelve a intentarlo.'
            }
            metrics={[
              { label: 'Aciertos', value: `${correctCount}/${total}` },
              { label: 'Mejor racha', value: bestStreak },
            ]}
            onPlayAgain={restart}
          />

          <GameHelpModal
            open={isHelpOpen}
            onClose={() => setIsHelpOpen(false)}
            title="Las seis trampas del juego"
            subtitle="Guía rápida"
            sections={HELP_SECTIONS}
          />
        </div>
      ) : (
        <div className="mx-auto w-full max-w-2xl p-4">
          <EmptyState variant="dashed" title="No hay oraciones para este tema." />
        </div>
      )}
    </AsyncBoundary>
  )
}
