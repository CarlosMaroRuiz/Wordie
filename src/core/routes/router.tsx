import { LoadSuspense } from '@core/helpers/WithSuspense'
import { PATHS } from '@core/routes/types/paths'
import { MainLayout } from '@common/layouts/MainLayout'
import { createBrowserRouter } from 'react-router-dom'

export const routers = createBrowserRouter([
  {
    element: <MainLayout />,
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
    ],
  },
])