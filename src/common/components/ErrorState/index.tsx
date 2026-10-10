import { CardBase } from '@common/CardBase'
import { Button } from '@common/Button'
import type { ErrorStateProps } from './type'

export function ErrorState({
  title = 'Error de Red',
  message = 'No se pudo sincronizar el progreso.',
  retryText = 'Reintentar',
  onRetry,
  action,
  className = '',
}: ErrorStateProps) {
  return (
    <CardBase
      className={`mx-auto flex w-full max-w-sm flex-col items-center justify-center text-center p-6 sm:p-8 ${className}`}
    >
      <b className="text-[17px] font-bold text-text-main">{title}</b>
      <p className="mt-2 mb-4 text-[13px] text-text-secondary leading-relaxed">
        {message}
      </p>
      {action ?? (
        onRetry ? (
          <Button
            variant="primary"
            size="sm"
            onClick={onRetry}
            className="mx-auto"
          >
            {retryText}
          </Button>
        ) : null
      )}
    </CardBase>
  )
}

export type { ErrorStateProps } from './type'
