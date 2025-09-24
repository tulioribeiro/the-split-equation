import { useAuthStore } from '@/features/auth/store'

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
