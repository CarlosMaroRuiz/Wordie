import { ArrowsLeftRightIcon } from '@phosphor-icons/react'
import { Badge } from '@common/components/Badge'
import { CATEGORY_LABEL, CATEGORY_TONE } from '../../constant'
import { LEVEL_TONE } from './constant'
import type { CardHeaderProps } from './type'

export function PhrasalVerbCardHeader({ item }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-border-subtle bg-surface-muted/50 px-5 py-3">
      <div className="flex items-center gap-2">
        <Badge tone={CATEGORY_TONE[item.category]} size="sm" uppercase>
          {CATEGORY_LABEL[item.category]}
        </Badge>
        <Badge tone={LEVEL_TONE[item.level] ?? LEVEL_TONE.B1} size="xs">
          {item.level}
        </Badge>
      </div>

      <Badge
        tone={item.separable ? 'primary-soft' : 'neutral'}
        size="xs"
        weight="semibold"
        icon={<ArrowsLeftRightIcon size={10} weight="bold" />}
      >
        {item.separable ? 'Separable' : 'Inseparable'}
      </Badge>
    </div>
  )
}

export type { CardHeaderProps } from './type'
