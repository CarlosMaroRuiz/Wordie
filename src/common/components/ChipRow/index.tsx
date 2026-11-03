import { cn } from '@common/utils/cn'
import { CHIP_ROW_BASE, CHIP_ROW_SCROLL, CHIP_ROW_WRAP } from './constant'
import type { ChipRowProps } from './type'

export function ChipRow({
  children,
  as = 'div',
  role,
  label,
  wrap = false,
  className,
}: ChipRowProps) {
  const Tag = as

  return (
    <Tag
      role={role}
      aria-label={label}
      className={cn(CHIP_ROW_BASE, wrap ? CHIP_ROW_WRAP : CHIP_ROW_SCROLL, className)}
    >
      {children}
    </Tag>
  )
}

export type { ChipRowProps, ChipRowRole } from './type'
