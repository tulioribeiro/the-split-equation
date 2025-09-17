import { createBrowserRouter } from 'react-router'

import App from '@/App'
import { ProtectedLayout } from '@/app/layouts/protected'
import { PublicLayout } from '@/app/layouts/public'
import { NotFoundPage } from '@/pages/404'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        Component: App,
      },
    ],
  },
  {
    path: '/login',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        Component: App,
      },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
])

export { router }
