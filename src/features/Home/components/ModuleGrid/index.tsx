import { SparkleIcon } from '@phosphor-icons/react'
import { HOME_COPY, HOME_MODULES } from '../../constant'
import { ModuleCard } from '../ModuleCard'

export function ModuleGrid() {
  return (
    <section aria-labelledby="home-modules-title" className="flex flex-col gap-4">
      {/* Cabecera de sección estilo "Popular Now" de la referencia */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between px-1">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-primary">
            <SparkleIcon size={14} weight="fill" aria-hidden="true" />
            <span>Rutas Estructuradas</span>
          </div>
          <h2
            id="home-modules-title"
            className="mt-0.5 text-xl font-black tracking-tight text-text-main sm:text-2xl"
          >
            {HOME_COPY.modulesSectionTitle}
          </h2>
        </div>

        <p className="max-w-md text-xs sm:text-sm leading-relaxed text-text-secondary sm:text-right">
          {HOME_COPY.modulesSectionHint}
        </p>
      </div>

      {/* Cuadrícula responsiva de tarjetas visuales */}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HOME_MODULES.map(module => (
          <li key={module.id} className="h-full">
            <ModuleCard module={module} />
          </li>
        ))}
      </ul>
    </section>
  )
}
