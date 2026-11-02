import { TrophyIcon } from '@phosphor-icons/react'
import { ModalBase } from '@common/ModalBase'
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
    <ModalBase
      open={isOpen}
      onClose={() => {}}
      size="sm"
      hideCloseButton
      headerSlot={
        <div className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 shadow-xs">
            <TrophyIcon size={36} weight="fill" />
          </div>
          <h2 className="text-2xl font-extrabold text-text-main">
            ¡Completado con Éxito!
          </h2>
          <p className="mt-1 text-xs text-text-secondary">
            Encontraste todos los pares de vocabulario correctamente.
          </p>
        </div>
      }
      footer={
        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={onPlayAgain}
        >
          Jugar otra vez
        </Button>
      }
    >
      <div className="my-2 grid grid-cols-2 gap-3 rounded-2xl bg-surface-muted/60 p-4 text-center">
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
    </ModalBase>
  )
}

export type { MemoryWinModalProps } from './type'
