import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ProviderRouter } from '@core/routes/provider'
import { registerPwa } from '@core/pwa/register'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProviderRouter />
  </StrictMode>,
)

registerPwa()
