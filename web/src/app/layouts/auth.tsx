import { Parentheses } from 'lucide-react'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

import background from '@/assets/auth-bg.jpg'
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
    <div className="flex min-h-svh flex-col justify-center p-6 lg:grid lg:grid-cols-3 lg:p-0">
      <div className="relative gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 lg:justify-start">
          <img
            src={background}
            className="absolute inset-0 hidden h-full w-full object-cover opacity-5 grayscale lg:block"
            alt=""
          />
          <div className="absolute inset-0 hidden bg-gradient-to-b from-black/50 to-black/30 lg:block" />

          <h1 className="relative flex items-center gap-1 font-medium">
            <span className="text-primary">
              <Parentheses size={30} />
            </span>
            <span>
              <span className="font-light">split</span>
              <span className="dark:text-muted-foreground/70">/</span>
              <span className="font-bold">equation</span>
            </span>
          </h1>
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
