import { BookOpen, Check, Clock, Sparkle } from '@phosphor-icons/react'
import { cn } from '@common/utils/cn'
import type { StorySelectorProps } from './type'

export function StorySelector({
  stories,
  selectedStoryId,
  onSelectStory,
}: StorySelectorProps) {
  if (stories.length <= 1) {
    return null
  }

  return (
    <nav aria-label="Historias disponibles" className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between px-1">
        <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-text-secondary">
          <Sparkle size={13} weight="fill" className="text-primary" />
          <span>Destinos de Lectura ({stories.length})</span>
        </span>
        <span className="hidden text-xs font-semibold text-text-secondary sm:inline">
          Selecciona una historia para leerla y practicar comprensión
        </span>
      </div>

      {/* Carrusel móvil con snap / cuadrícula en desktop estilo referencia */}
      <div className="flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible">
        {stories.map(story => {
          const isSelected = story.id === selectedStoryId

          return (
            <button
              key={story.id}
              type="button"
              onClick={() => onSelectStory(story.id)}
              aria-pressed={isSelected}
              className={cn(
                'group relative flex w-[75vw] sm:w-auto shrink-0 snap-start flex-col overflow-hidden rounded-[24px] border text-left transition-all duration-200 cursor-pointer',
                isSelected
                  ? 'border-primary bg-surface ring-2 ring-primary/25 shadow-brand'
                  : 'border-border-subtle bg-surface hover:border-primary/40 hover:shadow-soft',
              )}
            >
              {/* Miniatura visual superior estilo tarjeta de destino */}
              <div className="relative flex h-24 flex-col justify-between overflow-hidden border-b border-border-subtle/50 bg-gradient-to-b from-primary-light/70 to-surface-muted/60 p-3">
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center rounded-full border border-primary/20 bg-surface/90 px-2.5 py-0.5 text-xs font-black text-primary shadow-soft backdrop-blur-xs">
                    {story.level}
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-surface/90 px-2 py-0.5 text-[11px] font-bold text-text-secondary shadow-soft">
                    <Clock size={12} weight="bold" />
                    <span>{story.readTime}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-xl border border-border-subtle bg-surface text-primary shadow-icon transition-transform group-hover:scale-105">
                    <BookOpen size={16} weight="duotone" />
                  </div>
                  {isSelected ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-black text-on-primary shadow-icon">
                      <Check size={10} weight="bold" />
                      <span>Leyendo ahora</span>
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Contenido de la tarjeta */}
              <div className="flex flex-1 flex-col justify-between p-3.5">
                <div>
                  <h3
                    className={cn(
                      'line-clamp-1 text-sm sm:text-base font-black tracking-tight transition-colors',
                      isSelected ? 'text-primary' : 'text-text-main group-hover:text-primary',
                    )}
                  >
                    {story.title}
                  </h3>
                  <p className="mt-1 line-clamp-1 text-xs text-text-secondary">
                    {story.keywords.length} términos clave · {story.quiz.length} preguntas quiz
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
