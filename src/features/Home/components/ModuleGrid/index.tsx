import { HOME_MODULES } from '../../constant'
import { ModuleCard } from '../ModuleCard'

export function ModuleGrid() {
  return (
    <ul className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-4 lg:grid-cols-4">
      {HOME_MODULES.map(module => (
        <li key={module.id}>
          <ModuleCard module={module} />
        </li>
      ))}
    </ul>
  )
}
