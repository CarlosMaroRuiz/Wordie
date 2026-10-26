import { useState } from 'react'
import { HelpModalDialog } from '@common/components/FloatingHelpButton'
import { MemoryCard } from './components/MemoryCard'
import { MemoryHeader } from './components/MemoryHeader'
import { MemoryStats } from './components/MemoryStats'
import { MemoryWinModal } from './components/MemoryWinModal'
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
  const {
    cards,
    moves,
    matches,
    totalPairs,
    seconds,
    isWon,
    flipCard,
    restart,
  } = useMemoryGame()

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:gap-6 p-2 sm:p-6 lg:p-8">
      <MemoryHeader
        onRestart={restart}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      <MemoryStats
        moves={moves}
        matches={matches}
        totalPairs={totalPairs}
        seconds={seconds}
      />

      <div className="grid grid-cols-4 gap-1.5 sm:gap-4">
        {cards.map((card, index) => (
          <MemoryCard
            key={card.uid}
            card={card}
            onClick={() => flipCard(index)}
          />
        ))}
      </div>

      <MemoryWinModal
        isOpen={isWon}
        moves={moves}
        seconds={seconds}
        onPlayAgain={restart}
      />

      <HelpModalDialog
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        title="Consejos para el Memorama"
        subtitle="ESTRATEGIA COGNITIVA"
        closeLabel="¡Entendido, a jugar!"
      >
        {MEMORY_TIPS}
      </HelpModalDialog>
    </div>
  )
}
