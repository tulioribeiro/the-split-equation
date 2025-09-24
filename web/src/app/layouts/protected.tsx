import { Outlet } from 'react-router'

import { Button } from '@/components/ui/button'
import { useLogout } from '@/services/auth/use-logout'

export function ProtectedLayout() {
  const logoutMutation = useLogout()

  return (
    <div>
      <header className="bg-black p-2 mb-10 text-white">
        <div className="w-full m-auto max-w-6xl flex justify-between items-center">
          <h1>The Split/Equation</h1>
          <Button variant="secondary" onClick={() => logoutMutation.mutate()}>
            Logout
          </Button>
        </div>
      </header>

      <div className="w-full m-auto max-w-6xl">
        <Outlet />
      </div>
    </div>
  )
}
