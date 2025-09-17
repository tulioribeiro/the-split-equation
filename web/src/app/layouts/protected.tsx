import { NavLink, Outlet } from 'react-router'

export function ProtectedLayout() {
  return (
    <div>
      <h1>Protected layout</h1>
      <NavLink to="/">Home</NavLink> | <NavLink to="/login">Login</NavLink>
      <hr />
      <Outlet />
    </div>
  )
}
