import { Button } from '@/components/ui/button'
import { useLogin } from '@/services/auth/use-login'
import { useLogout } from '@/services/auth/use-logout'
import { useAuthStore } from '@/store/auth'

function App() {
  const loginMutation = useLogin()
  const logoutMutatiton = useLogout()

  const { user, clearUser } = useAuthStore()

  function handleLogin() {
    loginMutation.mutate(
      { email: 'admin@example.com', password: 'hardpassword' },
      {
        onSuccess: (data) => {
          console.log('Login successful:', data)
        },
        onError: (error) => {
          console.error('Login failed:', error)
        },
      },
    )
  }

  function handleLogout() {
    logoutMutatiton.mutate(undefined, {
      onSuccess: (data) => {
        console.log('Logout successful:', data)

        clearUser()
      },
    })
  }

  return (
    <div>
      hi {user?.name || 'guest'} ({user?.email || 'not logged in'})
      <Button onClick={handleLogin}>Dummy button</Button>
      {user?.name && (
        <>
          <br />
          <Button onClick={handleLogout}>Logout</Button>
        </>
      )}
    </div>
  )
}

export default App
