import { TrophyIcon } from '@phosphor-icons/react'
import { ModalBase } from '@common/ModalBase'
import { Button } from '@common/Button'
import { formatSeconds } from '@common/utils/formatTime'
import type { MemoryWinModalProps } from './type'

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
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-warning-light text-warning shadow-xs">
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
