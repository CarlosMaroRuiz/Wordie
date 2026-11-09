import { useState } from 'react'
import { ClockIcon } from '@phosphor-icons/react'
import { AsyncBoundary } from '@common/components/AsyncBoundary'
import { EmptyState } from '@common/components/EmptyState'
import { GameHelpModal } from '@features/Games/components/GameHelpModal'
import { GameIntroModal } from '@features/Games/components/GameIntroModal'
import { GameProgressHUD } from '@features/Games/components/GameProgressHUD'
import { GameResultModal } from '@features/Games/components/GameResultModal'
import { TENSE_CATALOG, TENSE_CUE } from './constant'
import { TenseFeedback } from './components/TenseFeedback'
import { TenseOptions } from './components/TenseOptions'
import { TenseQuestionCard } from './components/TenseQuestionCard'
import { useTenseDetective } from './hooks/useTenseDetective'

const HELP_SECTIONS = TENSE_CATALOG.map(tense => ({
  title: tense.label,
  body: TENSE_CUE[tense.id],
}))

export default function TenseDetective() {
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [isIntroOpen, setIsIntroOpen] = useState(true)
  const {
    current,
    index,
    total,
    selected,
    isAnswered,
    isCorrect,
    correctCount,
    streak,
    bestStreak,
    isCompleted,
    selectOption,
    next,
    restart,
    isLoading,
    error,
    refetch,
  } = useTenseDetective()

  const isPerfect = correctCount === total

  return (
    <AsyncBoundary
      isLoading={isLoading}
      error={error}
      onRetry={refetch}
      errorTitle="Error al cargar los tiempos verbales"
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
            icon={<ClockIcon size={34} weight="duotone" />}
            title="Detective de Tiempos"
            description="Identifica en qué tiempo verbal está escrito el verbo resaltado."
            steps={[
              'Lee la oración y fíjate en el verbo resaltado.',
              'Elige uno de los cuatro tiempos verbales propuestos.',
              'Cada acierto suma puntos; fallar reinicia la racha.',
            ]}
            note="Modo Enfoque Zero-Scroll: sin scroll, controles al alcance de los pulgares."
          />

          {/* ZONA 2: Play Canvas Central */}
          <div className="flex min-h-0 flex-1 flex-col justify-center gap-3 overflow-y-auto px-3.5 py-2 sm:gap-4 sm:overflow-visible sm:px-4">
            <TenseQuestionCard key={current.id} question={current} />
          </div>

          {/* ZONA 3: Bottom Action Dock (Thumb Zone) */}
          <div className="shrink-0 border-t border-border-subtle bg-bg-page px-3.5 pt-2.5 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:px-4 sm:pb-2">
            {!isAnswered ? (
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-text-secondary">
                  Elige el tiempo verbal correspondiente:
                </span>
                <TenseOptions question={current} selected={selected} onSelect={selectOption} />
              </div>
            ) : (
              <TenseFeedback
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
                ? 'Identificaste todos los tiempos verbales.'
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
            title="Los ocho tiempos del juego"
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
