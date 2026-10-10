import type { HTMLAttributes, ReactNode } from 'react'

export type CardVariant = 'default' | 'filled' | 'goal'

export type CardPadding = 'none' | 'sm' | 'md'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant
  padding?: CardPadding
  heading?: ReactNode
  action?: ReactNode
  as?: 'div' | 'article' | 'section' | 'aside'
  children?: ReactNode
}
