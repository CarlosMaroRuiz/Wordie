import { SkeletonPage } from '@common/components/SkeletonPage'
import { lazy, Suspense, type ComponentType, type ReactNode } from 'react'

export const LoadSuspense = (
  importFn: () => Promise<{ default: ComponentType }>,
  fallback: ReactNode = <SkeletonPage />
): ReactNode => {
  const LazyComponent = lazy(importFn)

  return (
    <Suspense fallback={fallback}>
      <LazyComponent />
    </Suspense>
  )
}
