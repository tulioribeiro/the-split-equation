import { NavLink, Outlet } from 'react-router'

export function PublicLayout() {
  return (
    <div>
      <h1>Public layout</h1>
      <NavLink to="/">Home</NavLink> | <NavLink to="/login">Login</NavLink>
      <hr />
      <Outlet />
    </div>
  )
}
