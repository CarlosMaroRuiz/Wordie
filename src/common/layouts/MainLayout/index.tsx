import { Outlet } from 'react-router-dom'
import { BottomNav } from '@common/components/BottomNav'
import { Navbar } from '@common/components/Navbar'
import { OnboardingTour } from '@common/components/OnboardingTour'
import { useTourStore } from '@common/components/OnboardingTour/hooks/useTourStore'
import { NAV_ITEMS } from './navItems'
import { TOUR_STEPS } from './tourSteps'

export function MainLayout() {
  const open = useTourStore(s => s.open)
  const close = useTourStore(s => s.close)

  return (
    <div className="min-h-svh bg-bg-page">
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <Navbar items={NAV_ITEMS} hideNavOnMobile />
      <main
        id="main"
        tabIndex={-1}
        className="mx-auto w-full max-w-7xl px-4 pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] sm:px-6 lg:pb-10"
      >
        <Outlet />
      </main>

      <BottomNav items={NAV_ITEMS} />
      <OnboardingTour open={open} onClose={close} steps={TOUR_STEPS} />
    </div>
  )
}
