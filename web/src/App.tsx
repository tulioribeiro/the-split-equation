import { useEffect, useState } from 'react'

import { Hello } from '@/components/hello'
import { Button } from '@/components/ui/button'
import { API_URL } from '@/config/consts'
import { API_URLS } from '@/lib/api-urls'

function App() {
  const [apiResult, setApiResult] = useState<string | null>(null)

  async function checkAPIHealth() {
    try {
      const res = await fetch(`${API_URL}/health`)
      const data = await res.json()

      setApiResult(data.status)
    } catch (err) {
      setApiResult('error')
      console.error(err)
    }
  }

  async function login() {
    try {
      const res = await fetch(API_URLS.auth.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@example.com',
          password: 'hardpassword',
        }),
      })

      const data = await res.json()
      console.log('login response', { data })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    checkAPIHealth()
    login()
  }, [])

  return (
    <div>
      <Hello />
      <div data-testid="api-result">{apiResult}</div>
      <Button>Dummy button</Button>
    </div>
  )
}

export default App
