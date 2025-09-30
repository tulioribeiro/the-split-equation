import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

import { useAuthGuard } from '@/features/auth/hooks/use-auth-guard'

export function AuthLayout() {
  const { isPending, user } = useAuthGuard()

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      return
    }

    navigate('/', { replace: true })
  }, [user, navigate])

  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}
