import { createBrowserRouter, Navigate } from 'react-router'

import { ProtectedLayout } from '@/app/layouts/protected'
import { PublicLayout } from '@/app/layouts/public'
import { NotFoundPage } from '@/pages/404'
import { Hello } from '@/pages/hello'
import { LoginPage } from '@/services/auth/login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        Component: Hello,
      },
    ],
  },
  {
    path: 'auth',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="login" />,
      },
      {
        path: 'login',
        Component: LoginPage,
      },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
])

export { router }
