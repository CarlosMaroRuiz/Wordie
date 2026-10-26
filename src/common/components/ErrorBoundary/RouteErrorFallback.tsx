import { useRouteError } from 'react-router-dom'
import { ErrorBoundaryFallback } from './ErrorBoundaryFallback'

export function RouteErrorFallback() {
  const error = useRouteError()
  const errorObj =
    error instanceof Error
      ? error
      : new Error(typeof error === 'string' ? error : 'Error inesperado en la ruta de la aplicación')

  return <ErrorBoundaryFallback error={errorObj} />
}
