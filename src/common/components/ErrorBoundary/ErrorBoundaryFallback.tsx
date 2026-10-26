import { HouseIcon } from '@phosphor-icons/react'
import { Button } from '@common/Button'
import { ERROR_BOUNDARY_TEXTS } from './constant'
import { ErrorLottieAnimation } from './ErrorLottieAnimation'
import { ErrorTechnicalDetails } from './ErrorTechnicalDetails'
import type { ErrorBoundaryFallbackProps } from './type'

export function ErrorBoundaryFallback({
  error,
  errorInfo,
}: ErrorBoundaryFallbackProps) {
  const handleGoHome = () => {
    window.location.href = '/'
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-bg-page p-4 sm:p-6">
      <div className="w-full max-w-xl rounded-3xl border border-border-subtle bg-surface p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <ErrorLottieAnimation />

          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-rose-500">
            {ERROR_BOUNDARY_TEXTS.SUBTITLE}
          </span>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-text-main sm:text-3xl">
            {ERROR_BOUNDARY_TEXTS.TITLE}
          </h1>
          <p className="mt-2 text-sm text-text-secondary leading-relaxed max-w-md">
            {ERROR_BOUNDARY_TEXTS.MESSAGE}
          </p>

          <div className="mt-6 flex items-center justify-center">
            <Button
              variant="primary"
              size="md"
              onClick={handleGoHome}
              className="flex items-center gap-2 px-6"
            >
              <HouseIcon size={18} weight="bold" />
              <span>{ERROR_BOUNDARY_TEXTS.HOME_BUTTON}</span>
            </Button>
          </div>
        </div>

        <ErrorTechnicalDetails error={error} errorInfo={errorInfo} />
      </div>
    </div>
  )
}
