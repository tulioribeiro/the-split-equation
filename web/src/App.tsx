import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { useLogin } from '@/services/auth/use-login'
import { useLogout } from '@/services/auth/use-logout'

function App() {
  const [user, setUser] = useState({ name: '', email: '' })
  const loginMutation = useLogin()
  const logoutMutatiton = useLogout()

  function handleLogin() {
    loginMutation.mutate(
      { email: 'user@example.com', password: 'hardpassword' },
      {
        onSuccess: (data) => {
          setUser({
            name: data.user.name,
            email: data.user.email,
          })

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

        setUser({ name: '', email: '' })
      },
    })
  }

  return (
    <div>
      hi {user.name || 'guest'} ({user.email || 'not logged in'})
      <Button onClick={handleLogin}>Dummy button</Button>
      {user.name && (
        <>
          <br />
          <Button onClick={handleLogout}>Logout</Button>
        </>
      )}
    </div>
  )
}

export default App
