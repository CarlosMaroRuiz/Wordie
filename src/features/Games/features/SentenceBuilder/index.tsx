import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CursorClick,
  Flame,
  Lightbulb,
  PuzzlePieceIcon,
  SpeakerHigh,
} from '@phosphor-icons/react'
import { AsyncBoundary } from '@common/components/AsyncBoundary'
import { Button } from '@common/Button'
import { cn } from '@common/utils/cn'
import { PATHS } from '@core/routes/types/paths'
import { GameHelpModal } from '@features/Games/components/GameHelpModal'
import { GameIntroModal } from '@features/Games/components/GameIntroModal'
import { GameProgressHUD } from '@features/Games/components/GameProgressHUD'
import { GameResultModal } from '@features/Games/components/GameResultModal'
import { useSentenceBuilder } from './hooks/useSentenceBuilder'
import { SentenceBuilderControls } from './components/SentenceBuilderControls'
import { SentencePromptCard } from './components/SentencePromptCard'
import { SentenceStrip } from './components/SentenceWorkspace/SentenceStrip'
import { WordBank } from './components/SentenceWorkspace/WordBank'

const HELP_SECTIONS = [
  {
    title: '1. Arma la oración',
    body: 'Toca los bloques de palabras del banco para colocarlos en orden lógico. Si te equivocas, toca cualquier palabra colocada para regresarla.',
    icon: <CursorClick size={20} className="text-primary" />,
  },
  {
    title: '2. Consejos gramaticales',
    body: 'Usa "Ver pista gramatical" para recordar reglas de gerundios, preposiciones y verbos modales del inglés diario.',
    icon: <Lightbulb size={20} className="text-warning" />,
  },
  {
    title: '3. Multiplicador de racha',
    body: 'Cada acierto consecutivo suma puntos extra por racha activa.',
    icon: <Flame size={20} className="text-warning" />,
  },
  {
    title: '4. Pronunciación auditiva',
    body: 'Al acertar, escucharás la oración leída con voz nativa para reforzar entonación y ritmo.',
    icon: <SpeakerHigh size={20} className="text-primary" />,
  },
]

export default function SentenceBuilder() {
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [isIntroOpen, setIsIntroOpen] = useState(true)
  const {
    currentSentence,
    currentIndex,
    totalRounds,
    availableChips,
    placedChips,
    gameStatus,
    score,
    streak,
    mistakes,
    isHintActive,
    isCompleted,
    isSpeaking,
    isAllTargetWordsPlaced,
    isLoading,
    error,
    refetch,
    placeChip,
    removeChip,
    clearPlacedChips,
    checkAnswer,
    nextSentence,
    toggleHint,
    placeNextWordHint,
    speakCurrentSentence,
    restartGame,
  } = useSentenceBuilder()

  const accuracy = Math.round((totalRounds / (totalRounds + mistakes)) * 100)

  return (
    <AsyncBoundary
      isLoading={isLoading}
      error={error}
      onRetry={refetch}
      errorTitle="Error al cargar las oraciones"
    >
      {currentSentence ? (
        <div className="mx-auto flex h-[100dvh] w-full max-w-3xl flex-col justify-between overflow-hidden bg-bg-page select-none sm:h-auto sm:min-h-[85vh] sm:p-4">
          {/* ZONA 1: Top HUD Duolingo */}
          <GameProgressHUD
            currentRound={currentIndex + 1}
            totalRounds={totalRounds}
            streak={streak}
            onOpenHelp={() => setIsHelpOpen(true)}
          />

          <GameIntroModal
            open={isIntroOpen}
            onAccept={() => setIsIntroOpen(false)}
            icon={<PuzzlePieceIcon size={34} weight="duotone" />}
            title="Sentence Builder"
            description="Arma la frase correcta en inglés con las fichas disponibles."
            steps={[
              'Toca las fichas en orden para construir la oración.',
              'Usa la pista si te bloqueas o limpia la franja para empezar de nuevo.',
              'Comprueba la respuesta para avanzar a la siguiente oración.',
            ]}
            note="Modo Enfoque Zero-Scroll: sin scroll, controles al alcance de los pulgares."
          />

          {/* ZONA 2: Play Canvas Central */}
          <div className="flex min-h-0 flex-1 flex-col justify-center gap-2.5 overflow-y-auto px-3.5 py-1.5 sm:gap-4 sm:overflow-visible sm:px-4">
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <SentencePromptCard
                  sentence={currentSentence}
                  isHintActive={isHintActive}
                  onToggleHint={toggleHint}
                />
              </div>
              <button
                type="button"
                onClick={speakCurrentSentence}
                title="Escuchar pronunciación correcta"
                aria-label="Escuchar pronunciación de la oración en inglés"
                className={cn(
                  'flex size-11 shrink-0 touch-manipulation items-center justify-center rounded-xl border transition-all mt-1',
                  isSpeaking
                    ? 'border-primary bg-primary text-on-primary shadow-xs animate-pulse'
                    : 'border-border-subtle bg-surface text-text-secondary hover:border-primary/40 hover:text-primary',
                )}
              >
                <SpeakerHigh size={18} weight="bold" />
              </button>
            </div>

            <SentenceStrip
              placedChips={placedChips}
              gameStatus={gameStatus}
              onRemoveChip={removeChip}
            />
          </div>

          {/* ZONA 3: Bottom Action Dock (Thumb Zone) */}
          <div className="shrink-0 border-t border-border-subtle bg-bg-page px-3.5 pt-2.5 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:px-4 sm:pb-2">
            <div className="flex flex-col gap-2.5">
              <WordBank
                availableChips={availableChips}
                gameStatus={gameStatus}
                onPlaceChip={placeChip}
              />

              <SentenceBuilderControls
                gameStatus={gameStatus}
                hasPlacedChips={placedChips.length > 0}
                canPlaceWordHint={!isAllTargetWordsPlaced && gameStatus !== 'correct'}
                onClear={clearPlacedChips}
                onHintWord={placeNextWordHint}
                onCheck={checkAnswer}
                onNext={nextSentence}
              />
            </div>
          </div>

          <GameResultModal
            open={isCompleted}
            title="¡Ronda completada!"
            subtitle="Armaste todas las oraciones del set."
            metrics={[
              { label: 'Puntos', value: score },
              { label: 'Racha final', value: streak },
              { label: 'Precisión', value: `${accuracy}%` },
            ]}
            note="Practicar la estructura de oraciones refuerza patrones naturales de comunicación en desarrollo, viajes y oficina."
            onPlayAgain={restartGame}
            playAgainLabel="Jugar otra ronda"
            secondaryAction={
              <Link to={PATHS.Games} className="w-full sm:w-auto">
                <Button variant="ghost" size="sm" className="w-full sm:w-auto">
                  Volver a Minijuegos
                </Button>
              </Link>
            }
          />

          <GameHelpModal
            open={isHelpOpen}
            onClose={() => setIsHelpOpen(false)}
            title="¿Cómo jugar Sentence Builder?"
            subtitle="Guía rápida"
            sections={HELP_SECTIONS}
          />
        </div>
      ) : null}
    </AsyncBoundary>
  )
}
