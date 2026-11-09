import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from '@common/components/BottomNav'
import { Navbar } from '@common/components/Navbar'
import { OnboardingTour } from '@common/components/OnboardingTour'
import { useTourStore } from '@common/components/OnboardingTour/hooks/useTourStore'
import { cn } from '@common/utils/cn'
import { PATHS } from '@core/routes/types/paths'
import { NAV_ITEMS } from './navItems'
import { TOUR_STEPS } from './tourSteps'

export function MainLayout() {
  const open = useTourStore(s => s.open)
  const close = useTourStore(s => s.close)
  const { pathname } = useLocation()

  /**
   * Partida activa de minijuegos (cualquier subruta de /games/* que no sea el catálogo general).
   * Activa el Focus Mode: se ocultan barras globales para pantalla completa Zero-Scroll.
   */
  const isGameActive = pathname.startsWith('/games/') && pathname !== PATHS.Games

  return (
    <div className="min-h-svh bg-bg-page">
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <div className={isGameActive ? 'hidden sm:block' : undefined}>
        <Navbar items={NAV_ITEMS} hideNavOnMobile showTopicSelector={!isGameActive} />
      </div>
      <main
        id="main"
        tabIndex={-1}
        className={cn(
          'mx-auto w-full max-w-7xl',
          isGameActive
            ? 'h-[100dvh] overflow-hidden p-0 sm:h-auto sm:overflow-visible sm:px-6 sm:pb-8'
            : 'px-4 pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] sm:px-6 lg:pb-10',
        )}
      >
        <Outlet />
      </main>

      {!isGameActive ? <BottomNav items={NAV_ITEMS} /> : null}
      <OnboardingTour open={open} onClose={close} steps={TOUR_STEPS} />
    </div>
  )
}
