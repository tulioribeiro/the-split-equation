import { Outlet } from 'react-router'

import { Button } from '@/components/ui/button'
import { useLogout } from '@/features/auth/hooks/use-logout'

export function ProtectedLayout() {
  const logoutMutation = useLogout()

  return (
    <div>
      <header className="mb-10 bg-black p-2 text-white">
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
