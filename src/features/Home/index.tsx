import { CompassIcon } from '@phosphor-icons/react'
import { Button } from '@common/Button'
import { useTourStore } from '@common/components/OnboardingTour/hooks/useTourStore'

export default function Home() {
  const start = useTourStore(s => s.start)
  const seen = useTourStore(s => s.seen)

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Inicio</h1>
      <p className="mt-2 text-text-secondary">
        Dashboard de progreso y accesos a los módulos de estudio.
      </p>

      <div className="mt-6 max-w-md">
        <Button
          variant="secondary"
          size="md"
          fullWidth={false}
          onClick={start}
          aria-label={seen ? 'Repetir tour de la aplicación' : 'Déjame darte un tour por la aplicación'}
        >
          <CompassIcon size={18} weight="bold" aria-hidden="true" />
          {seen ? 'Repetir tour' : 'Déjame darte un tour'}
        </Button>
        <p className="mt-2 text-[13px] text-text-secondary">
          Un recorrido corto por los módulos. Puedes cerrarlo cuando quieras.
        </p>
      </div>
    </section>
  )
}
