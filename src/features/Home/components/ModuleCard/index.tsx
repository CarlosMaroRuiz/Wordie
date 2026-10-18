import { Link } from 'react-router-dom'
import { CardBase } from '@common/CardBase'
import { cn } from '../../cn'
import type { ModuleCardProps } from './type'

export function ModuleCard({ module }: ModuleCardProps) {
  const Icon = module.icon

  return (
    <CardBase
      as="article"
      padding="md"
      className="group relative h-full overflow-hidden transition-colors hover:border-primary/30 focus-within:border-primary/50"
    >
      <span aria-hidden="true" className={cn('absolute inset-x-0 top-0 h-1', module.bar)} />
      <span
        aria-hidden="true"
        className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-text-secondary"
      >
        {module.index}
      </span>

      <div className="mt-3 flex min-w-0 items-center gap-3">
        <span
          aria-hidden="true"
          className={cn(
            'grid size-9 shrink-0 place-items-center rounded-2xl min-[360px]:size-10',
            module.accent,
          )}
        >
          <Icon size={20} weight="bold" />
        </span>
        <h3 className="min-w-0 break-words text-[15px] font-bold leading-tight text-text-main">
          {module.title}
        </h3>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{module.description}</p>

      <Link
        to={module.to}
        aria-label={`Explorar ${module.title}`}
        className="absolute inset-0 rounded-[22px] outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary"
      />
    </CardBase>
  )
}
