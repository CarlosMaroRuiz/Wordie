import { useRef, useState } from 'react'
import { CaretLeftIcon, CaretRightIcon, GameControllerIcon } from '@phosphor-icons/react'
import { Badge } from '@common/components/Badge'
import { FloatingHelpButton } from '@common/components/FloatingHelpButton'
import { cn } from '@common/utils/cn'
import { GAME_REGISTRY } from '../../constant'
import type { GameCategory } from '../../type'
import { GameCard } from '../GameCard'
import { GAMES_HERO_SUBTITLE, GAMES_HERO_TITLE } from './constant'
import type { GamesHubProps } from './type'

const CATEGORY_TABS: { id: 'all' | GameCategory; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'grammar', label: 'Gramática & Reflejo' },
  { id: 'structure', label: 'Estructura' },
  { id: 'vocabulary', label: 'Vocabulario' },
]

const GAMES_GUIDE = (
  <div className="flex flex-col gap-4 text-sm text-text-secondary">
    <section className="rounded-2xl border border-border-subtle bg-surface-muted/50 p-4">
      <h3 className="mb-1 font-bold text-text-main">
        ¿Por qué aprender inglés con minijuegos?
      </h3>
      <p className="leading-relaxed">
        El juego activa la dopamina y la memoria de trabajo mediante el principio de{' '}
        <strong>Active Retrieval</strong> (evocación activa). Al buscar el par en el memorama
        o transformar oraciones en milisegundos, tu cerebro crea conexiones neuronales más fuertes que leyendo pasivamente.
      </p>
    </section>
    <section className="rounded-2xl border border-border-subtle bg-surface-muted/50 p-4">
      <h3 className="mb-1 font-bold text-text-main">
        Entrenamiento ágil en móvil
      </h3>
      <p className="leading-relaxed">
        Diseñados con ergonomía de pulgares para sesiones breves de 2 a 5 minutos.
        Desliza horizontalmente en el catálogo para elegir tu modo de juego preferido.
      </p>
    </section>
  </div>
)

export default function GamesHub({ className = '' }: GamesHubProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | GameCategory>('all')
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const filteredGames =
    activeCategory === 'all'
      ? GAME_REGISTRY
      : GAME_REGISTRY.filter(game => game.category === activeCategory)

  function handleCategoryChange(category: 'all' | GameCategory) {
    setActiveCategory(category)
    setActiveCardIndex(0)
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }

  function handleScroll() {
    if (!carouselRef.current) return
    const el = carouselRef.current
    const scrollLeft = el.scrollLeft
    const itemWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth : 300
    const newIndex = Math.round(scrollLeft / (itemWidth + 14))
    if (newIndex !== activeCardIndex && newIndex >= 0 && newIndex < filteredGames.length) {
      setActiveCardIndex(newIndex)
    }
  }

  function scrollToIndex(index: number) {
    if (!carouselRef.current) return
    const el = carouselRef.current
    const children = el.children
    if (children[index]) {
      ;(children[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      })
      setActiveCardIndex(index)
    }
  }

  return (
    <div className={`mx-auto flex max-w-7xl flex-col gap-4 p-3 sm:gap-8 sm:p-6 lg:p-8 ${className}`}>
      {/* Hero compacto Mobile-First */}
      <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-surface p-4 shadow-xs sm:rounded-3xl sm:p-8">
        <div className="max-w-3xl">
          <Badge
            tone="primary"
            size="md"
            className="mb-2.5 gap-2 sm:mb-3"
            icon={<GameControllerIcon size={16} weight="bold" />}
          >
            Minijuegos interactivos
          </Badge>

          <h1 className="text-2xl font-extrabold tracking-tight text-text-main sm:text-4xl">
            {GAMES_HERO_TITLE}
          </h1>

          <p className="mt-1.5 text-xs text-text-secondary leading-relaxed sm:mt-3 sm:text-base">
            {GAMES_HERO_SUBTITLE}
          </p>
        </div>
      </div>

      <section className="flex flex-col gap-3 sm:gap-4">
        {/* Cabecera de sección con pestañas de categoría */}
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-text-main sm:text-lg">Catálogo de Práctica</h2>
            <span className="text-xs font-semibold text-text-tertiary">
              {filteredGames.length} juego(s)
            </span>
          </div>

          <div
            role="tablist"
            aria-label="Filtro de minijuegos por categoría"
            className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none sm:pb-0"
          >
            {CATEGORY_TABS.map(tab => {
              const isSelected = activeCategory === tab.id
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => handleCategoryChange(tab.id)}
                  className={cn(
                    'inline-flex min-h-9 shrink-0 touch-manipulation items-center rounded-full px-3.5 text-xs font-bold transition-all focus-visible:outline-2 focus-visible:outline-primary active:scale-95 sm:min-h-11 sm:px-4 sm:text-sm',
                    isSelected
                      ? 'border border-primary bg-primary text-on-primary shadow-brand'
                      : 'border border-border-subtle bg-surface text-text-secondary hover:border-primary/40 hover:text-text-main shadow-soft',
                  )}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* 1. MÓVIL: Carrusel Horizontal con Snap y Peek (<sm) */}
        <div className="block sm:hidden">
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-3.5 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-smooth px-3 py-1 -mx-3 scrollbar-none touch-pan-x"
          >
            {filteredGames.map(game => (
              <GameCard
                key={game.id}
                game={game}
                className="w-[82vw] max-w-[310px] shrink-0 snap-center min-h-[310px]"
              />
            ))}
          </div>

          {/* Indicadores de paginación y controles táctiles para móvil */}
          <div className="mt-2.5 flex items-center justify-between px-1">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => scrollToIndex(Math.max(0, activeCardIndex - 1))}
                disabled={activeCardIndex === 0}
                aria-label="Juego anterior"
                className="flex size-8 touch-manipulation items-center justify-center rounded-full border border-border-subtle bg-surface text-text-secondary shadow-soft transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-30"
              >
                <CaretLeftIcon size={16} weight="bold" />
              </button>
              <button
                type="button"
                onClick={() => scrollToIndex(Math.min(filteredGames.length - 1, activeCardIndex + 1))}
                disabled={activeCardIndex >= filteredGames.length - 1}
                aria-label="Siguiente juego"
                className="flex size-8 touch-manipulation items-center justify-center rounded-full border border-border-subtle bg-surface text-text-secondary shadow-soft transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-30"
              >
                <CaretRightIcon size={16} weight="bold" />
              </button>
              <span className="ml-1 text-[11px] font-semibold text-text-tertiary">
                {activeCardIndex + 1} de {filteredGames.length}
              </span>
            </div>

            {/* Dots interactivos */}
            <div className="flex items-center gap-1">
              {filteredGames.map((game, i) => (
                <button
                  key={game.id}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Ir a ${game.title}`}
                  className={cn(
                    'h-1.5 touch-manipulation rounded-full transition-all duration-200',
                    i === activeCardIndex
                      ? 'w-5 bg-primary'
                      : 'w-1.5 bg-border-subtle hover:bg-primary/40',
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 2. TABLET Y DESKTOP: Cuadrícula responsiva (>=sm) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {filteredGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <FloatingHelpButton
        title="Beneficios Pedagógicos de los Juegos"
        subtitle="Entrenamiento cognitivo"
        tooltip="¿Por qué jugar para aprender?"
        closeLabel="¡Entendido, a jugar!"
      >
        {GAMES_GUIDE}
      </FloatingHelpButton>
    </div>
  )
}
