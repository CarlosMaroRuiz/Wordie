import type { GameActionBarProps } from './type'

/**
 * Barra de acciones persistente de los minijuegos: se ancla sobre el BottomNav
 * para que el regreso y las acciones del juego nunca salgan de pantalla.
 */
export function GameActionBar({ children, className = 'max-w-4xl' }: GameActionBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] z-20 border-t border-border-subtle bg-bg-page/95 px-4 py-2.5 backdrop-blur-md lg:hidden">
      <div className={`mx-auto flex w-full items-center gap-2 ${className}`}>{children}</div>
    </div>
  )
}
