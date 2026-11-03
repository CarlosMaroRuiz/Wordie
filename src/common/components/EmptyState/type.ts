import type { ReactNode } from 'react'

export type EmptyStateVariant = 'plain' | 'card' | 'dashed'

export type EmptyStateSize = 'sm' | 'base' | 'lg'

export interface EmptyStateProps {
  title: string
  icon?: ReactNode
  action?: ReactNode
  variant?: EmptyStateVariant
  size?: EmptyStateSize
  className?: string
}
