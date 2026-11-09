import { Badge } from '@common/components/Badge'
import { SHIFT_TYPE_BADGES } from '../../constant'
import type { ShiftPromptProps } from '../../type'

export function ShiftPrompt({ baseSentence, shiftInstruction, shiftType }: ShiftPromptProps) {
  const badgeConfig = SHIFT_TYPE_BADGES[shiftType] ?? { label: 'Mutación', tone: 'primary' }

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-border-subtle bg-surface-muted/60 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <Badge tone={badgeConfig.tone} size="sm">
          {badgeConfig.label}
        </Badge>
        <span className="text-xs font-bold text-primary">
          {shiftInstruction}
        </span>
      </div>

      <div className="mt-1">
        <p className="text-base font-bold leading-snug text-text-main sm:text-lg">
          "{baseSentence}"
        </p>
      </div>
    </div>
  )
}
