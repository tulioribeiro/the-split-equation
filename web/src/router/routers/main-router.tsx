import { createBrowserRouter, Navigate } from 'react-router'

import { ForgotPassword } from '@/features/auth/pages/forgot'
import { LoginPage } from '@/features/auth/pages/login'
import { RegisterPage } from '@/features/auth/pages/register'
import { NotFoundPage } from '@/pages/404'
import { Hello } from '@/pages/hello'
import { AuthLayout } from '@/router/layouts/auth'
import { ProtectedLayout } from '@/router/layouts/protected'

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
      {
        path: 'signup',
        Component: RegisterPage,
      },
      {
        path: 'forgot-password',
        Component: ForgotPassword,
      },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
])

export { router }
