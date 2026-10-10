import type { ReactNode } from 'react'

export interface ErrorStateProps {
  title?: string
  message?: string
  retryText?: string
  onRetry?: () => void
  action?: ReactNode
  className?: string
}
