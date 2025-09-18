import '@/styles/index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

import { router } from '@/app/routers/main-router'
import { enableMocking } from '@/tests/mocks'

const root = document.getElementById('root')
if (!root) throw new Error('No root element found')

enableMocking().then(() => {
  createRoot(root).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
})
