import { useState } from 'react'
import { BrainIcon } from '@phosphor-icons/react'
import { AsyncBoundary } from '@common/components/AsyncBoundary'
import { HelpModalDialog } from '@common/components/FloatingHelpButton'
import { formatSeconds } from '@common/utils/formatTime'
import { GameIntroModal } from '@features/Games/components/GameIntroModal'
import { GameProgressHUD } from '@features/Games/components/GameProgressHUD'
import { GameResultModal } from '@features/Games/components/GameResultModal'
import { MemoryCard } from './components/MemoryCard'
import { useMemoryGame } from './hooks/useMemoryGame'

const MEMORY_TIPS = (
  <div className="flex flex-col gap-4 text-sm text-text-secondary">
    <section className="rounded-2xl border border-border-subtle bg-surface-muted/50 p-4">
      <h3 className="mb-1 font-bold text-text-main">
        Técnica de Vocabulario Bidireccional
      </h3>
      <p className="leading-relaxed">
        El juego empareja la palabra en inglés con su concepto en español. Al voltear la carta
        en inglés, escucha el audio con atención y repite la palabra imitando la entonación.
      </p>
    </section>
    <section className="rounded-2xl border border-border-subtle bg-surface-muted/50 p-4">
      <h3 className="mb-1 font-bold text-text-main">Mapeo Espacial</h3>
      <p className="leading-relaxed">
        Intenta recordar las cartas por esquinas y cuadrantes (arriba izquierda, abajo derecha).
        Esto estimula la corteza visual y refuerza el active recall.
      </p>
    </section>
  </div>
)

export default function MemoryGameModule() {
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [isIntroOpen, setIsIntroOpen] = useState(true)
  const {
    cards,
    moves,
    matches,
    totalPairs,
    seconds,
    isWon,
    isLoading,
    error,
    refetch,
    flipCard,
    restart,
  } = useMemoryGame()

  return (
    <AsyncBoundary
      isLoading={isLoading}
      error={error}
      onRetry={refetch}
      errorTitle="Error al cargar el memorama"
    >
      <div className="mx-auto flex h-[100dvh] w-full max-w-4xl flex-col justify-between overflow-hidden bg-bg-page select-none sm:h-auto sm:min-h-[85vh] sm:p-4">
        {/* ZONA 1: Top HUD Duolingo */}
        <GameProgressHUD
          currentRound={matches}
          totalRounds={totalPairs}
          elapsedSeconds={seconds}
          streak={moves > 0 ? moves : undefined}
          onOpenHelp={() => setIsHelpOpen(true)}
        />

        <GameIntroModal
          open={isIntroOpen}
          onAccept={() => setIsIntroOpen(false)}
          icon={<BrainIcon size={34} weight="duotone" />}
          title="Memorama de Vocabulario"
          description="Encuentra el par correcto entre la palabra en inglés y su traducción al español."
          steps={[
            'Voltea dos cartas por turno.',
            'Si forman pareja, se quedan boca arriba.',
            'Completa todos los pares con los menos intentos posible.',
          ]}
          note="Modo Enfoque Zero-Scroll: pantalla completa, cartas al alcance sin scroll."
        />

        {/* ZONA 2: Play Canvas Central con la cuadrícula 4x4 de cartas */}
        <div className="flex min-h-0 flex-1 flex-col justify-center overflow-y-auto px-2 py-1.5 sm:overflow-visible sm:px-4 sm:py-3">
          <div className="grid grid-cols-4 gap-1.5 sm:gap-3.5">
            {cards.map((card, index) => (
              <MemoryCard key={card.uid} card={card} onClick={() => flipCard(index)} />
            ))}
          </div>
        </div>

        {/* ZONA 3: Bottom Status Bar */}
        <div className="shrink-0 border-t border-border-subtle bg-bg-page px-3.5 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] text-center text-xs font-semibold text-text-tertiary sm:px-4">
          <span>Intentos: <strong className="text-text-main">{moves}</strong></span>
          <span className="mx-2">•</span>
          <span>Pares restantes: <strong className="text-text-main">{totalPairs - matches}</strong></span>
        </div>

        <GameResultModal
          open={isWon}
          title="¡Completado con Éxito!"
          subtitle="Encontraste todos los pares de vocabulario correctamente."
          metrics={[
            { label: 'Intentos', value: moves },
            { label: 'Tiempo Total', value: formatSeconds(seconds) },
          ]}
          onPlayAgain={restart}
          playAgainLabel="Jugar otra vez"
        />

        <HelpModalDialog
          isOpen={isHelpOpen}
          onClose={() => setIsHelpOpen(false)}
          title="Consejos para el Memorama"
          subtitle="Estrategia cognitiva"
          closeLabel="¡Entendido, a jugar!"
        >
          {MEMORY_TIPS}
        </HelpModalDialog>
      </div>
    </AsyncBoundary>
  )
}
