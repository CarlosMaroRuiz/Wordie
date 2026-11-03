import { cn } from '@common/utils/cn'
import { EMPTY_BASE, EMPTY_SIZE, EMPTY_VARIANT } from './constant'
import type { EmptyStateProps } from './type'

export function EmptyState({
  title,
  icon,
  action,
  variant = 'plain',
  size = 'base',
  className,
}: EmptyStateProps) {
  return (
    <div className={cn(EMPTY_BASE, EMPTY_VARIANT[variant], className)}>
      {icon ? <div className="mx-auto mb-3 text-text-tertiary">{icon}</div> : null}
      <p className={EMPTY_SIZE[size]}>{title}</p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  )
}

export type { EmptyStateProps, EmptyStateSize, EmptyStateVariant } from './type'
