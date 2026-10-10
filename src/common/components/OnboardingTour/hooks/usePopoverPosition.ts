import type { CSSProperties } from 'react'
import { POPOVER_HEIGHT, POPOVER_WIDTH, TOUR_GAP, TOUR_MARGIN } from '../constant'
import type { TourPosition, TourRect } from '../type'

export function usePopoverPosition(rect: TourRect | null, position: TourPosition): CSSProperties {
  if (!rect) {
    return { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }
  }

  const maxLeft = Math.max(window.innerWidth - POPOVER_WIDTH - TOUR_MARGIN, TOUR_MARGIN)
  const left = Math.min(Math.max(rect.left, TOUR_MARGIN), maxLeft)

  const top =
    position === 'bottom'
      ? Math.min(rect.top + rect.height + TOUR_GAP, window.innerHeight - POPOVER_HEIGHT)
      : Math.max(rect.top - TOUR_GAP - POPOVER_HEIGHT, TOUR_MARGIN)

  return { left, top }
}
