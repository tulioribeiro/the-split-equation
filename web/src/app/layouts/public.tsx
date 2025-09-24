import { Outlet } from 'react-router'

export function PublicLayout() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  )
}
