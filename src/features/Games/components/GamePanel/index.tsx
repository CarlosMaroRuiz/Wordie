import { cn } from '@common/utils/cn'
import { PANEL_BASE, PANEL_HEADER } from './constant'
import type { GamePanelProps } from './type'

/**
 * Tarjeta donde vive el "tablero" del juego. Las partidas futuras pueden meter
 * cualquier cosa dentro; `badge` y `hint` son solo la fila superior opcional.
 */
export function GamePanel({ children, badge, hint, className }: GamePanelProps) {
  const hasHeader = Boolean(badge || hint)

  return (
    <article className={cn(PANEL_BASE, className)}>
      {hasHeader ? (
        <div className={PANEL_HEADER}>
          {badge ?? <span />}
          {hint ? (
            <span className="text-xs font-semibold text-text-secondary">
              {hint}
            </span>
          ) : null}
        </div>
      ) : null}
      {children}
    </article>
  )
}

export type { GamePanelProps } from './type'
