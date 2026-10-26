import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { ErrorBoundaryFallback } from './ErrorBoundaryFallback'
import type { ErrorBoundaryProps, ErrorBoundaryState } from './type'

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error }
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo })
    this.props.onError?.(error, errorInfo)
  }

  public handleReset = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  public override render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error ?? new Error('Unknown error'), this.handleReset)
      }

      return (
        <ErrorBoundaryFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onReset={this.handleReset}
        />
      )
    }

    return this.props.children
  }
}

export { ErrorBoundaryFallback } from './ErrorBoundaryFallback'
export { RouteErrorFallback } from './RouteErrorFallback'
export type {
  ErrorBoundaryFallbackProps,
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from './type'
