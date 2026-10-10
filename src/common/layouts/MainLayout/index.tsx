import { Outlet } from 'react-router-dom'
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
      <Navbar items={NAV_ITEMS} />
      <main id="main" tabIndex={-1} className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6">
        <Outlet />
      </main>

      <OnboardingTour open={open} onClose={close} steps={TOUR_STEPS} />
    </div>
  )
}
