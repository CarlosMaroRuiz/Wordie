import { cn } from '@common/utils/cn'
import { BADGE_BASE, BADGE_SIZE, BADGE_TONE, BADGE_UPPERCASE, BADGE_WEIGHT } from './constant'
import type { BadgeProps } from './type'

export function Badge({
  children,
  tone = 'neutral',
  size = 'sm',
  weight = 'bold',
  uppercase = false,
  icon,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        BADGE_BASE,
        BADGE_SIZE[size],
        BADGE_WEIGHT[weight],
        BADGE_TONE[tone],
        uppercase ? BADGE_UPPERCASE : '',
        className,
      )}
    >
      {icon ? (
        <span className="shrink-0" aria-hidden>
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  )
}

export type { BadgeProps, BadgeSize, BadgeTone, BadgeWeight } from './type'
