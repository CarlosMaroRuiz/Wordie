import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { TrophyIcon } from '@phosphor-icons/react'
import { Button } from '@common/Button'
import type { MemoryWinModalProps } from './type'

function formatSeconds(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export function MemoryWinModal({
  isOpen,
  moves,
  seconds,
  onPlayAgain,
}: MemoryWinModalProps) {
  return (
    <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-200" />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPanel className="mx-auto w-full max-w-sm rounded-[32px] border border-border-subtle bg-surface p-6 sm:p-8 text-center shadow-2xl">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 shadow-xs">
            <TrophyIcon size={36} weight="fill" />
          </div>

          <DialogTitle className="text-2xl font-extrabold text-text-main">
            ¡Completado con Éxito!
          </DialogTitle>
          <p className="mt-1 text-xs text-text-secondary">
            Encontraste todos los pares de vocabulario correctamente.
          </p>

          <div className="my-6 grid grid-cols-2 gap-3 rounded-2xl bg-surface-muted/60 p-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary">
                Intentos
              </span>
              <p className="text-lg font-extrabold text-text-main">{moves}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary">
                Tiempo Total
              </span>
              <p className="text-lg font-extrabold font-mono text-text-main">
                {formatSeconds(seconds)}
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={onPlayAgain}
          >
            Jugar otra vez
          </Button>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export type { MemoryWinModalProps } from './type'
