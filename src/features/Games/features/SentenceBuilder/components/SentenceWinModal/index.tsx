import { Link } from 'react-router-dom'
import { Trophy, Flame, CheckCircle, ArrowCounterClockwise } from '@phosphor-icons/react'
import { ModalBase } from '@common/ModalBase'
import { Button } from '@common/Button'
import type { SentenceWinModalProps } from './type'

export function SentenceWinModal({
  open,
  score,
  streak,
  mistakes,
  totalRounds,
  onPlayAgain,
  onClose,
}: SentenceWinModalProps) {
  const accuracy = Math.max(
    0,
    Math.round((totalRounds / (totalRounds + mistakes)) * 100),
  )

  return (
    <ModalBase
      open={open}
      onClose={onClose}
      size="md"
      title={
        <div className="flex items-center gap-2.5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-warning-light text-warning">
            <Trophy size={22} weight="fill" />
          </span>
          <div className="min-w-0">
            <span className="block text-lg font-extrabold leading-tight text-text-main sm:text-xl">
              ¡Ronda completada!
            </span>
            <span className="text-[11px] leading-snug text-text-secondary sm:text-xs">
              Armaste todas las oraciones del set.
            </span>
          </div>
        </div>
      }
      footer={
        <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/games" className="w-full sm:w-auto">
            <Button variant="ghost" size="sm" className="w-full sm:w-auto">
              Volver a Minijuegos
            </Button>
          </Link>

          <Button
            variant="primary"
            size="sm"
            onClick={onPlayAgain}
            className="w-full gap-1.5 sm:w-auto"
          >
            <ArrowCounterClockwise size={16} weight="bold" />
            <span>Jugar otra ronda</span>
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-3 py-1 sm:gap-4 sm:py-2">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border-subtle bg-bg-page/60 p-2.5 text-center sm:p-3">
            <Trophy size={18} weight="bold" className="text-warning" />
            <span className="mt-1 text-[10px] text-text-tertiary sm:text-xs">Puntos</span>
            <span className="text-sm font-extrabold text-text-main sm:text-base">{score}</span>
          </div>

          <div className="flex flex-col items-center justify-center rounded-2xl border border-border-subtle bg-bg-page/60 p-2.5 text-center sm:p-3">
            <Flame size={18} weight="fill" className="text-warning" />
            <span className="mt-1 text-[10px] text-text-tertiary sm:text-xs">Racha final</span>
            <span className="text-sm font-extrabold text-text-main sm:text-base">{streak}</span>
          </div>

          <div className="flex flex-col items-center justify-center rounded-2xl border border-border-subtle bg-bg-page/60 p-2.5 text-center sm:p-3">
            <CheckCircle size={18} weight="bold" className="text-success" />
            <span className="mt-1 text-[10px] text-text-tertiary sm:text-xs">Precisión</span>
            <span className="text-sm font-extrabold text-text-main sm:text-base">{accuracy}%</span>
          </div>
        </div>

        <p className="rounded-xl border border-primary/10 bg-primary/5 p-3 text-center text-[11px] leading-relaxed text-text-secondary sm:text-xs">
          Practicar la estructura de oraciones refuerza patrones naturales de comunicación en
          desarrollo, viajes y oficina.
        </p>
      </div>
    </ModalBase>
  )
}
