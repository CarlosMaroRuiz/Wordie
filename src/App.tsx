import { CopyIcon, SpeakerHighIcon, XIcon } from '@phosphor-icons/react'
import { Button } from './common/Button'

function App() {
  return (
    <main className="min-h-svh bg-bg-page px-4 py-10 font-sans text-text-main">
      <div className="mx-auto flex max-w-xl flex-col gap-8">
        <header>
          <p className="text-sm font-semibold text-primary">Sistema de diseño</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight">Button</h1>
          <p className="mt-2 text-text-secondary">
            Variantes alineadas al mockup: CTA principal, secundario, estados y botón de icono.
          </p>
        </header>

        <section className="rounded-[22px] border-[1.5px] border-border-subtle bg-surface p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <h2 className="mb-4 text-lg font-bold">Primario</h2>
          <Button arrow>Repasar 8 palabras hoy</Button>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="md" fullWidth={false} arrow>
              Practicar tarjetas (8)
            </Button>
            <Button size="sm" fullWidth={false}>
              Reintentar
            </Button>
          </div>
        </section>

        <section className="rounded-[22px] border-[1.5px] border-border-subtle bg-surface p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <h2 className="mb-4 text-lg font-bold">Secundario y ghost</h2>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="secondary">
              <CopyIcon size={16} weight="bold" aria-hidden />
              Copiar frase
            </Button>
            <Button variant="secondary" size="sm">
              Explorar vocabulario
            </Button>
            <Button variant="ghost" size="md" fullWidth={false}>
              Ver más
            </Button>
          </div>
        </section>

        <section className="rounded-[22px] border-[1.5px] border-border-subtle bg-surface p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <h2 className="mb-4 text-lg font-bold">Práctica y acciones</h2>
          <div className="flex gap-2">
            <Button variant="danger">Difícil</Button>
            <Button variant="success">Fácil</Button>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Button variant="icon" size="sm" aria-label="Cerrar">
              <XIcon size={18} weight="bold" />
            </Button>
            <Button variant="icon" size="sm" aria-label="Pronunciar">
              <SpeakerHighIcon size={18} weight="bold" />
            </Button>
            <Button variant="iconPrimary" size="sm" aria-label="Acción principal">
              <SpeakerHighIcon size={18} weight="bold" />
            </Button>
            <Button disabled>Deshabilitado</Button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
