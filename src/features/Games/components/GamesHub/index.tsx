import { GameControllerIcon } from '@phosphor-icons/react'
import { FloatingHelpButton } from '@common/components/FloatingHelpButton'
import { GAME_REGISTRY } from '../../constant'
import { GameCard } from '../GameCard'
import { GAMES_HERO_SUBTITLE, GAMES_HERO_TITLE } from './constant'
import type { GamesHubProps } from './type'

const GAMES_GUIDE = (
  <div className="flex flex-col gap-4 text-sm text-text-secondary">
    <section className="rounded-2xl border border-border-subtle bg-surface-muted/50 p-4">
      <h3 className="mb-1 font-bold text-text-main">
        ¿Por qué aprender inglés con minijuegos?
      </h3>
      <p className="leading-relaxed">
        El juego activa la dopamina y la memoria de trabajo mediante el principio de{' '}
        <strong>Active Retrieval</strong> (evocación activa). Al buscar el par en el memorama
        o adivinar letras, tu cerebro crea conexiones neuronales más fuertes que leyendo pasivamente.
      </p>
    </section>
    <section className="rounded-2xl border border-border-subtle bg-surface-muted/50 p-4">
      <h3 className="mb-1 font-bold text-text-main">
        Consejo para aprovechar el Memorama
      </h3>
      <p className="leading-relaxed">
        Cada vez que voltees una carta en inglés, pronúnciala en voz alta aprovechando el
        audio automático. Asociar la imagen acústica con el significado en español acelera
        la retención hasta un 60%.
      </p>
    </section>
  </div>
)

export default function GamesHub({ className = '' }: GamesHubProps) {
  return (
    <div className={`mx-auto flex max-w-7xl flex-col gap-8 p-4 sm:p-6 lg:p-8 ${className}`}>
      <div className="relative overflow-hidden rounded-[32px] border border-border-subtle bg-surface p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
            <GameControllerIcon size={16} weight="bold" />
            <span>LEARNING GAMES HUB · MINIJUEGOS</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-text-main sm:text-4xl">
            {GAMES_HERO_TITLE}
          </h1>

          <p className="mt-3 text-base text-text-secondary leading-relaxed sm:text-lg">
            {GAMES_HERO_SUBTITLE}
          </p>
        </div>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-main">Juegos Disponibles</h2>
          <span className="text-xs text-text-tertiary">
            {GAME_REGISTRY.length} juego(s) en catálogo
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GAME_REGISTRY.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <FloatingHelpButton
        title="Beneficios Pedagógicos de los Juegos"
        subtitle="EDTECH & GAMIFICACIÓN"
        tooltip="¿Por qué jugar para aprender?"
        closeLabel="¡Entendido, a jugar!"
      >
        {GAMES_GUIDE}
      </FloatingHelpButton>
    </div>
  )
}
