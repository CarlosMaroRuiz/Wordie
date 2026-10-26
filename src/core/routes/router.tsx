import { LoadSuspense } from '@core/helpers/WithSuspense'
import { PATHS } from '@core/routes/types/paths'
import { MainLayout } from '@common/layouts/MainLayout'
import { RouteErrorFallback } from '@common/components/ErrorBoundary'
import { createBrowserRouter } from 'react-router-dom'

export const routers = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <RouteErrorFallback />,
    children: [
      {
        path: PATHS.Home,
        element: LoadSuspense(() => import('@features/Home')),
      },
      {
        path: PATHS.Grammar,
        element: LoadSuspense(() => import('@features/Grammar')),
      },
      {
        path: PATHS.Vocabulary,
        element: LoadSuspense(() => import('@features/Vocabulary')),
      },
      {
        path: PATHS.Stories,
        element: LoadSuspense(() => import('@features/Stories')),
      },
      {
        path: PATHS.Phrases,
        element: LoadSuspense(() => import('@features/Phrases')),
      },
      {
        path: PATHS.Phonetics,
        element: LoadSuspense(() => import('@features/Phonetics')),
      },
      {
        path: PATHS.PhrasalVerbs,
        element: LoadSuspense(() => import('@features/PhrasalVerbs')),
      },
      {
        path: PATHS.Games,
        element: LoadSuspense(() => import('@features/Games')),
        children: [
          {
            path: 'memory',
            element: LoadSuspense(() => import('@features/Games/features/Memory')),
          },
        ],
      },
    ],
  },
])
