import '@/styles/index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

import { router } from '@/app/routers/main-router'
import { APP_ENV } from '@/config/env'

async function enableMocking() {
  const isMockingEnabled = APP_ENV.VITE_APP_ENABLE_API_MOCKING

  if (isMockingEnabled) {
    const { worker } = await import('./tests/mocks/browser')

    return await worker.start()
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
})
