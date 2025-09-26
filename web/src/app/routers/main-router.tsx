import { createBrowserRouter, Navigate } from 'react-router'

import { AuthLayout } from '@/app/layouts/auth'
import { ProtectedLayout } from '@/app/layouts/protected'
import { LoginPage } from '@/features/auth/pages/login'
import { NotFoundPage } from '@/pages/404'
import { Hello } from '@/pages/hello'

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
    element: <AuthLayout />,
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
