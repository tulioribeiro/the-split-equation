import { Outlet } from 'react-router'

export function PublicLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  )
}
