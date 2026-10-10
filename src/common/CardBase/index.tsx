import { CARD_BASE, CARD_HEADER, CARD_PADDING, CARD_VARIANT } from './constant'
import type { CardProps } from './type'

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function CardBase({
  variant = 'default',
  padding = 'md',
  heading,
  action,
  as: Tag = 'div',
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Tag className={cn(CARD_BASE, CARD_VARIANT[variant], CARD_PADDING[padding], className)} {...props}>
      {heading || action ? (
        <div className={CARD_HEADER}>
          {typeof heading === 'string' ? (
            <h3 className="text-[17px] font-bold">{heading}</h3>
          ) : (
            heading
          )}
          {action}
        </div>
      ) : null}
      {children}
    </Tag>
  )
}

export type { CardPadding, CardProps, CardVariant } from './type'
