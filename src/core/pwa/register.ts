function scheduleRegistration(): void {
  const start = () => {
    void navigator.serviceWorker
      .register('/sw.js', { updateViaCache: 'none' })
      .catch(() => undefined)
  }

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(start, { timeout: 3000 })
    return
  }

  window.setTimeout(start, 1500)
}

export function registerPwa(): void {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return

  if (document.readyState === 'complete') {
    scheduleRegistration()
    return
  }

  window.addEventListener('load', scheduleRegistration, { once: true })
}

