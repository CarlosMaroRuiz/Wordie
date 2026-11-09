import { cn } from '@common/utils/cn'
import {
  SLOT_ACTIVE,
  SLOT_BASE,
  SLOT_CORRECT,
  SLOT_EMPTY,
  SLOT_FILLED,
  SLOT_WRONG,
} from '../../constant'
import type { ConnectorParagraphProps } from './type'

export function ConnectorParagraph({
  paragraph,
  answers,
  activeSeam,
  isChecked,
  onSelectSeam,
}: ConnectorParagraphProps) {
  return (
    <div className="flex flex-col gap-2.5 text-base leading-relaxed text-text-main sm:text-lg">
      <p>{paragraph.opening}</p>

      {paragraph.seams.map((seam, seamIndex) => {
        const given = answers[seamIndex]
        const isRight = given === seam.answer
        const isActive = seamIndex === activeSeam && !isChecked

        const style = !given
          ? SLOT_EMPTY
          : isChecked
            ? isRight
              ? SLOT_CORRECT
              : SLOT_WRONG
            : SLOT_FILLED

        return (
          <p key={seamIndex} className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
            <button
              type="button"
              disabled={isChecked}
              onClick={() => onSelectSeam(seamIndex)}
              aria-label={`Conector ${seamIndex + 1}: ${given ?? 'sin elegir'}`}
              className={cn(SLOT_BASE, style, isActive ? SLOT_ACTIVE : '')}
            >
              {given ?? 'elegir'}
            </button>
            <span>{seam.rest}</span>
          </p>
        )
      })}
    </div>
  )
}

export type { ConnectorParagraphProps } from './type'
