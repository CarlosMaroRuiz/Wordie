import { cn } from '@common/utils/cn'
import type { ThumbPaletteProps } from '../../type'

export function ThumbPalette({
  activeSlot,
  selectedAnswer,
  disabled,
  onChooseOption,
}: ThumbPaletteProps) {
  if (!activeSlot) {
    return (
      <div className="flex min-h-[130px] items-center justify-center rounded-[24px] border border-dashed border-border-subtle bg-surface-muted/40 p-4 text-center">
        <p className="text-xs sm:text-sm font-semibold text-text-secondary">
          Toca un slot arriba para ver sus opciones
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2.5 rounded-[24px] border border-border-subtle bg-surface p-3.5 sm:p-4 shadow-soft">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold text-text-secondary">
          Opciones para: <span className="font-black text-primary">{activeSlot.label}</span>
        </span>
        <span className="text-[11px] font-semibold text-text-tertiary">
          Toca con el pulgar
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {activeSlot.options.map(option => {
          const isSelected = selectedAnswer === option

          return (
            <button
              key={option}
              type="button"
              disabled={disabled}
              onClick={() => onChooseOption(option)}
              className={cn(
                'flex min-h-[48px] touch-manipulation cursor-pointer items-center justify-center rounded-2xl border-2 px-3 py-2 text-base font-black transition-all sm:min-h-[52px]',
                isSelected
                  ? 'border-primary bg-primary text-on-primary shadow-brand scale-[1.02]'
                  : 'border-border-subtle bg-surface text-text-main shadow-soft hover:border-primary/50 hover:bg-primary-light/40 active:scale-95',
                disabled && 'cursor-not-allowed opacity-60',
              )}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}
