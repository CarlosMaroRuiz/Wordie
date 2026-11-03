import type { ReactNode } from 'react'

export type BadgeTone =
  | 'primary'
  | 'primary-soft'
  | 'primary-tint'
  | 'brand-soft'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral'
  | 'outline'

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'

export type BadgeWeight = 'semibold' | 'bold'

export interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  size?: BadgeSize
  weight?: BadgeWeight
  uppercase?: boolean
  icon?: ReactNode
  className?: string
}
