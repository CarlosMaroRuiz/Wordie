import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { CardBase } from '@common/CardBase'
import { cn } from '../../cn'
import type { ModuleCardProps } from './type'

export function ModuleCard({ module }: ModuleCardProps) {
  const Icon = module.icon
  const isFeatured = Boolean(module.featured)

  return (
    <CardBase
      as="article"
      padding="none"
      className={cn(
        'group relative flex h-full flex-col justify-between overflow-hidden rounded-[26px] border transition-all duration-200 hover:-translate-y-1',
        isFeatured
          ? 'border-primary bg-primary text-white shadow-md hover:shadow-xl'
          : 'border-border-subtle bg-surface text-text-main hover:border-primary/40 hover:shadow-md',
      )}
    >
      <div className="flex flex-col p-6">
        {/* Top row: Title + Circle Arrow Button */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <span
              aria-hidden="true"
              className={cn(
                'font-mono text-[10px] font-bold uppercase tracking-[0.2em]',
                isFeatured ? 'text-white/70' : 'text-text-secondary',
              )}
            >
              MÓDULO {module.index}
            </span>
            <div className="mt-1 flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className={cn(
                  'grid size-8 place-items-center rounded-xl',
                  isFeatured ? 'bg-white/15 text-white' : module.accent,
                )}
              >
                <Icon size={18} weight="bold" />
              </span>
              <h3
                className={cn(
                  'text-lg font-extrabold tracking-tight',
                  isFeatured ? 'text-white' : 'text-text-main',
                )}
              >
                {module.title}
              </h3>
            </div>
          </div>

          {/* Top-right Circle Arrow Button */}
          <span
            aria-hidden="true"
            className={cn(
              'grid size-10 shrink-0 place-items-center rounded-full transition-transform duration-200 group-hover:scale-110',
              isFeatured
                ? 'bg-accent text-white shadow-xs'
                : 'bg-primary-light text-primary group-hover:bg-primary group-hover:text-white',
            )}
          >
            <ArrowUpRightIcon size={18} weight="bold" />
          </span>
        </div>

        {/* Description */}
        <p
          className={cn(
            'mt-3 text-sm leading-relaxed',
            isFeatured ? 'text-white/85' : 'text-text-secondary',
          )}
        >
          {module.description}
        </p>
      </div>

      {/* Decorative Bottom Preview Area */}
      <div
        className={cn(
          'mt-auto border-t px-6 py-4',
          isFeatured
            ? 'border-white/15 bg-white/5'
            : 'border-border-subtle/80 bg-bg-page/60',
        )}
      >
        <div className="flex items-center justify-between text-xs">
          <span
            className={cn(
              'font-mono font-medium',
              isFeatured ? 'text-white/80' : 'text-text-secondary',
            )}
          >
            {module.id === 'vocabulary' && 'Sistema Leitner · 5 cajas'}
            {module.id === 'grammar' && 'A1 a B1 · Ejemplos dev'}
            {module.id === 'stories' && 'Historias + Glosario + Quiz'}
            {module.id === 'phrases' && 'Dailies, PRs & Blockers'}
          </span>
          <span
            className={cn(
              'font-bold',
              isFeatured ? 'text-yellow' : 'text-primary',
            )}
          >
            Explorar →
          </span>
        </div>
      </div>

      {/* Accessible Hit Area */}
      <Link
        to={module.to}
        aria-label={`Abrir módulo ${module.title}`}
        className="absolute inset-0 rounded-[26px] outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary"
      />
    </CardBase>
  )
}
