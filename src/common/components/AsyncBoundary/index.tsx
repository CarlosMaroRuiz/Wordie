import { ErrorState } from '@common/components/ErrorState'
import { SkeletonPage } from '@common/components/SkeletonPage'
import type { AsyncBoundaryProps } from './type'

/**
 * Resuelve los tres estados de una vista con datos remotos: cargando, error y
 * contenido. No captura errores de render (para eso está `ErrorBoundary`): solo
 * decide qué mostrar y en qué orden.
 *
 * Espera el contrato `AsyncStatus`: `isLoading`, `error: Error | null`, `refetch`.
 */
export function AsyncBoundary({
  isLoading,
  error,
  children,
  errorTitle,
  errorMessage,
  onRetry,
  retryText,
  loadingFallback,
}: AsyncBoundaryProps) {
  if (isLoading) {
    return <>{loadingFallback ?? <SkeletonPage />}</>
  }

  if (error) {
    return (
      <ErrorState
        title={errorTitle}
        message={errorMessage ?? (error.message || undefined)}
        onRetry={onRetry}
        retryText={retryText}
      />
    )
  }

  return <>{children}</>
}

export type { AsyncBoundaryProps } from './type'
