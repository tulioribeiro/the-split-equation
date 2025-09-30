import '@/styles/index.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

import { router } from '@/app/routers/main-router'
import { IS_DEV } from '@/config/consts'
import { queryClient } from '@/lib/react-query'
import { ThemeProvider } from '@/shared/components/theme-provider'
import { enableMocking } from '@/tests/mocks'

const root = document.getElementById('root')
if (!root) throw new Error('No root element found')

enableMocking().then(() => {
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />

          {IS_DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>,
  )
})
