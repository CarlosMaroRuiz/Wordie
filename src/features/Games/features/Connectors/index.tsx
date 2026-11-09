import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen } from '@phosphor-icons/react'
import { AsyncBoundary } from '@common/components/AsyncBoundary'
import { Badge } from '@common/components/Badge'
import { Button } from '@common/Button'
import { EmptyState } from '@common/components/EmptyState'
import { GameIntroModal } from '@features/Games/components/GameIntroModal'
import { GameProgressHUD } from '@features/Games/components/GameProgressHUD'
import { GameResultModal } from '@features/Games/components/GameResultModal'
import { PATHS } from '@core/routes/types/paths'
import { ConnectorFeedback } from './components/ConnectorFeedback'
import { ConnectorHelpModal } from './components/ConnectorHelpModal'
import { ConnectorParagraph } from './components/ConnectorParagraph'
import { ConnectorTray } from './components/ConnectorTray'
import { useConnectors } from './hooks/useConnectors'

export default function Connectors() {
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [isIntroOpen, setIsIntroOpen] = useState(true)
  const {
    current,
    index,
    total,
    totalSeams,
    answers,
    activeSeam,
    allFilled,
    isChecked,
    results,
    correctSeams,
    perfectRounds,
    streak,
    bestStreak,
    isCompleted,
    selectSeam,
    choose,
    check,
    next,
    restart,
    isLoading,
    error,
    refetch,
  } = useConnectors()

  const activeSeamData = current?.seams[activeSeam] ?? current?.seams[0] ?? null

  return (
    <AsyncBoundary
      isLoading={isLoading}
      error={error}
      onRetry={refetch}
      errorTitle="Error al cargar los conectores"
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
            icon={<BookOpen size={34} weight="duotone" />}
            title="Engranajes"
            description="Cada párrafo pierde tres conectores. Elige el que encaje en significado y en estructura."
            steps={[
              'Toca un hueco y luego una ficha; el orden da igual.',
              'Las fichas muestran su relación y si piden cláusula o sustantivo.',
              'Comprueba las tres a la vez y lee por qué fallaban las trampas.',
            ]}
            note="Modo Enfoque Zero-Scroll: sin scroll, controles al alcance de los pulgares."
          />

          {/* ZONA 2: Play Canvas Central */}
          <div className="flex min-h-0 flex-1 flex-col justify-center gap-3 overflow-y-auto px-3.5 py-2 sm:gap-4 sm:overflow-visible sm:px-4">
            <div className="flex flex-col gap-2 rounded-2xl border border-border-subtle bg-surface p-4 shadow-xs sm:p-5">
              <div className="flex items-center justify-between">
                <Badge tone="primary-tint" size="sm">
                  {current.level}
                </Badge>
                <span className="text-xs font-semibold text-text-tertiary">
                  Costura {activeSeam + 1} de {current.seams.length}
                </span>
              </div>
              <ConnectorParagraph
                key={current.id}
                paragraph={current}
                answers={answers}
                activeSeam={activeSeam}
                isChecked={isChecked}
                onSelectSeam={selectSeam}
              />
            </div>
          </div>

          {/* ZONA 3: Bottom Action Dock (Thumb Zone) */}
          <div className="shrink-0 border-t border-border-subtle bg-bg-page px-3.5 pt-2.5 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:px-4 sm:pb-2">
            {!isChecked && activeSeamData ? (
              <div className="flex flex-col gap-2.5">
                <ConnectorTray
                  seam={activeSeamData}
                  selected={answers[activeSeam]}
                  disabled={isChecked}
                  onChoose={choose}
                />
                <Button
                  variant="primary"
                  size="md"
                  onClick={check}
                  disabled={!allFilled}
                  className="min-h-12 w-full text-base font-bold shadow-xs sm:min-h-11 sm:text-sm"
                >
                  Comprobar Costuras
                </Button>
              </div>
            ) : (
              <ConnectorFeedback
                results={results}
                isChecked={isChecked}
                allFilled={allFilled}
                isLast={index + 1 >= total}
                onCheck={check}
                onNext={next}
              />
            )}
          </div>

          <GameResultModal
            open={isCompleted}
            title={correctSeams === totalSeams ? '¡Ronda perfecta!' : 'Ronda completada'}
            subtitle={`${perfectRounds} de ${total} párrafos con las tres costuras correctas.`}
            metrics={[
              { label: 'Costuras', value: `${correctSeams}/${totalSeams}` },
              { label: 'Perfectos', value: `${perfectRounds}/${total}` },
              { label: 'Mejor racha', value: bestStreak },
            ]}
            onPlayAgain={restart}
            secondaryAction={
              <Link to={PATHS.Games} className="w-full sm:w-auto">
                <Button variant="ghost" size="sm" className="w-full sm:w-auto">
                  Volver a Minijuegos
                </Button>
              </Link>
            }
          />

          <ConnectorHelpModal open={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
        </div>
      ) : (
        <div className="mx-auto w-full max-w-2xl p-4">
          <EmptyState variant="dashed" title="No hay párrafos para este tema." />
        </div>
      )}
    </AsyncBoundary>
  )
}
