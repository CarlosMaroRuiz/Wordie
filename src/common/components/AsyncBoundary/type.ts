import type { ReactNode } from 'react'

export interface AsyncBoundaryProps {
  isLoading: boolean
  error: Error | null
  children: ReactNode
  errorTitle?: string
  errorMessage?: string
  onRetry?: () => void
  retryText?: string
  loadingFallback?: ReactNode
}
