import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from '@common/components/ErrorBoundary'
import { ProviderRouter } from '@core/routes/provider'
import { registerPwa } from '@core/pwa/register'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ProviderRouter />
    </ErrorBoundary>
  </StrictMode>,
)

registerPwa()
