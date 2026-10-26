import { HOME_COPY, HOME_MODULES } from '../../constant'
import { ModuleCard } from '../ModuleCard'

export function ModuleGrid() {
  return (
    <div className="rounded-[32px] border-[1.5px] border-border-subtle bg-surface p-6 sm:p-10 shadow-sm">
      {/* Header matching 'Our Class' from reference image */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-8 pb-4 border-b border-border-subtle">
        <div>
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
            PLAN DE APRENDIZAJE
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-text-main sm:text-3xl mt-1">
            {HOME_COPY.modulesSectionTitle}
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-text-secondary sm:text-right">
          {HOME_COPY.modulesSectionHint}
        </p>
      </div>

      {/* Grid of 4 Cards */}
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {HOME_MODULES.map(module => (
          <li key={module.id} className="h-full">
            <ModuleCard module={module} />
          </li>
        ))}
      </ul>

      {/* Decorative dots indicator like in reference image */}
      <div className="mt-8 flex items-center justify-center gap-1.5" aria-hidden="true">
        <span className="size-2 rounded-full bg-primary" />
        <span className="size-1.5 rounded-full bg-border-subtle" />
        <span className="size-1.5 rounded-full bg-border-subtle" />
        <span className="size-1.5 rounded-full bg-border-subtle" />
      </div>
    </div>
  )
}
