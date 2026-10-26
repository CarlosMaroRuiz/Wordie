import type { ErrorInfo, ReactNode } from 'react'

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, reset: () => void) => ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

export interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export interface ErrorBoundaryFallbackProps {
  error: Error | null
  errorInfo?: ErrorInfo | null
  onReset?: () => void
}
