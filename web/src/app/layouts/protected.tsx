import { Outlet } from 'react-router'

import { useAuthGuard } from '@/features/auth/hooks/use-auth-guard'
import { useLogout } from '@/features/auth/hooks/use-logout'
import { Button } from '@/shared/components/ui/button'

export function ProtectedLayout() {
  const { isPending } = useAuthGuard()

  const logoutMutation = useLogout()

  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <header className="mb-10">
        <div className="m-auto flex w-full max-w-6xl items-center justify-between">
          <h1>The Split/Equation</h1>
          <Button variant="secondary" onClick={() => logoutMutation.mutate()}>
            Logout
          </Button>
        </div>
      </header>

      <div className="m-auto w-full max-w-6xl">
        <Outlet />
      </div>
    </div>
  )
}
