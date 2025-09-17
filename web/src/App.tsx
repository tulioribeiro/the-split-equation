import { useEffect, useState } from 'react'

import { Hello } from '@/components/hello'
import { Button } from '@/components/ui/button'
import { API_URL } from '@/config/consts'

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

  useEffect(() => {
    checkAPIHealth()
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
