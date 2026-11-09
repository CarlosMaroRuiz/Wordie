import { Trophy } from '@phosphor-icons/react'
import { ModalBase } from '@common/ModalBase'
import { Button } from '@common/Button'
import { cn } from '@common/utils/cn'
import { metricColumns } from './constant'
import type { GameResultModalProps } from './type'

/**
 * Cierre de partida estilo Friendly EdTech: trofeo elevado, métricas en baldosas suaves
 * y botón de acción en píldora con sombra de marca.
 */
export function GameResultModal({
  open,
  title,
  subtitle,
  metrics,
  onPlayAgain,
  playAgainLabel = 'Jugar otra ronda',
  note,
  secondaryAction,
}: GameResultModalProps) {
  return (
    <ModalBase
      open={open}
      onClose={() => {}}
      size="sm"
      hideCloseButton
      headerSlot={
        <div className="text-center pt-2">
          <div className="mx-auto mb-3 flex size-16 items-center justify-center rounded-3xl bg-warning-light text-warning shadow-soft border border-warning/20">
            <Trophy size={36} weight="fill" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-text-main">{title}</h2>
          {subtitle ? (
            <p className="mt-1 text-xs sm:text-sm text-text-secondary leading-relaxed">{subtitle}</p>
          ) : null}
        </div>
      }
      footer={
        <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
          {secondaryAction}
          <Button
            variant="primary"
            size="md"
            onClick={onPlayAgain}
            className="min-h-12 w-full text-base font-bold rounded-full shadow-brand sm:ml-auto sm:w-auto"
          >
            {playAgainLabel}
          </Button>
        </div>
      }
    >
      <div
        className={cn(
          'my-2 grid gap-2.5 rounded-2xl border border-border-subtle bg-surface-muted/50 p-3.5 text-center',
          metricColumns(metrics),
        )}
      >
        {metrics.map(metric => (
          <div
            key={metric.label}
            className="flex flex-col items-center justify-center rounded-xl border border-border-subtle/60 bg-surface p-2.5 shadow-soft"
          >
            <span className="text-[11px] font-bold text-text-secondary">{metric.label}</span>
            <p className="mt-0.5 text-lg font-black tabular-nums text-text-main">{metric.value}</p>
          </div>
        ))}
      </div>

      {note ? (
        <p className="mt-3 text-center text-xs leading-relaxed text-text-secondary">{note}</p>
      ) : null}
    </ModalBase>
  )
}

export type { GameResultMetric, GameResultModalProps } from './type'
