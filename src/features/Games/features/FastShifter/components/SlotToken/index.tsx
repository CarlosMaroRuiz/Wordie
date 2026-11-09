import { CaretDownIcon } from '@phosphor-icons/react'
import { cn } from '@common/utils/cn'
import type { SlotTokenProps } from '../../type'

export function SlotToken({
  slot,
  value,
  isSelected,
  isEvaluated,
  isCorrect,
  onClick,
}: SlotTokenProps) {
  let stateStyles = 'border-dashed border-primary/40 bg-primary/5 text-primary hover:border-primary'

  if (isEvaluated) {
    stateStyles = isCorrect
      ? 'border-solid border-success/50 bg-success-light text-success font-extrabold'
      : 'border-solid border-error/50 bg-error-light text-error font-extrabold line-through'
  } else if (value) {
    stateStyles = isSelected
      ? 'border-solid border-primary bg-primary-light text-primary font-extrabold ring-2 ring-primary/25 shadow-xs'
      : 'border-solid border-border-subtle bg-surface text-text-main font-bold shadow-xs hover:border-primary/50'
  } else if (isSelected) {
    stateStyles = 'border-solid border-primary bg-primary-light text-primary font-bold ring-2 ring-primary/25 shadow-xs'
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isEvaluated}
      aria-label={`Slot ${slot.label}: ${value ?? 'vacío'}`}
      className={cn(
        'inline-flex min-h-[44px] min-w-[76px] items-center justify-center gap-1.5 rounded-xl border px-3 py-1.5 text-base transition-colors duration-150 sm:min-h-[48px] sm:min-w-[90px]',
        stateStyles,
      )}
    >
      <span>{value ?? slot.label}</span>
      {!isEvaluated && <CaretDownIcon size={14} weight="bold" className="shrink-0 opacity-60" />}
    </button>
  )
}
