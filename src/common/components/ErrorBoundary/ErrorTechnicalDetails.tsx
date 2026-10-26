import { useState } from 'react'
import { CheckIcon, CopyIcon } from '@phosphor-icons/react'
import { ERROR_BOUNDARY_TEXTS } from './constant'
import type { ErrorBoundaryFallbackProps } from './type'

export function ErrorTechnicalDetails({
  error,
  errorInfo,
}: Pick<ErrorBoundaryFallbackProps, 'error' | 'errorInfo'>) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const errorDetails = [
      `Mensaje: ${error?.name ?? 'Error'}: ${error?.message ?? 'Sin mensaje'}`,
      error?.stack ? `\nStack trace:\n${error.stack}` : '',
      errorInfo?.componentStack ? `\nComponent stack:\n${errorInfo.componentStack}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    navigator.clipboard.writeText(errorDetails)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-8 border-t border-border-subtle pt-5 text-left">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-text-tertiary">
          {ERROR_BOUNDARY_TEXTS.DETAILS_LABEL}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition hover:underline"
        >
          {copied ? (
            <>
              <CheckIcon size={14} weight="bold" className="text-emerald-500" />
              <span className="text-emerald-500">{ERROR_BOUNDARY_TEXTS.COPIED_BUTTON}</span>
            </>
          ) : (
            <>
              <CopyIcon size={14} weight="bold" />
              <span>{ERROR_BOUNDARY_TEXTS.COPY_BUTTON}</span>
            </>
          )}
        </button>
      </div>

      <div className="max-h-48 overflow-y-auto rounded-xl border border-border-subtle bg-surface-muted/60 p-3 font-mono text-xs text-rose-600 dark:text-rose-400 select-all">
        <p className="font-bold">
          {error?.name || 'Error'}: {error?.message || 'Error desconocido sin mensaje proporcionado.'}
        </p>
        {error?.stack ? (
          <pre className="mt-2 text-[11px] text-text-tertiary whitespace-pre-wrap break-all">
            {error.stack}
          </pre>
        ) : null}
      </div>
    </div>
  )
}
