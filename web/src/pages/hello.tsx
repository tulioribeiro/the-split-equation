import { useAuthStore } from '@/store/auth'

function Hello() {
  const { user } = useAuthStore()

  return (
    <>
      <div>Hello, world!</div>
      {user && user.name}
    </>
  )
}

export { Hello }
