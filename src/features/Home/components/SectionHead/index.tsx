import { HOME_SECTION_HEAD, HOME_SECTION_HINT, HOME_SECTION_TITLE } from '../../constant'
import type { SectionHeadProps } from './type'

export function SectionHead({ id, title, hint }: SectionHeadProps) {
  return (
    <header className={HOME_SECTION_HEAD}>
      <h2 id={id} className={HOME_SECTION_TITLE}>
        {title}
      </h2>
      <p className={HOME_SECTION_HINT}>{hint}</p>
    </header>
  )
}
