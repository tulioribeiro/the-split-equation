import { waitFor } from '@testing-library/react'
import { http } from 'msw'

import { useAuthGuard } from '@/features/auth/hooks/use-auth-guard'
import { useAuthStore } from '@/features/auth/store'
import { server } from '@/tests/mocks/node'
import { renderHookWithProviders } from '@/tests/mocks/utils/render-hook-with-providers'

describe('useAuthGuard', () => {
  afterEach(() => {
    useAuthStore.getState().clearUser()
  })

  it('sets user on successful fetch', async () => {
    server.use(
      http.get('/auth/me', () =>
        Response.json({
          user: {
            id: '1',
            email: 'test@example.com',
            name: 'Test User',
            role: 'user',
          },
        }),
      ),
    )

    const { result } = renderHookWithProviders(() => useAuthGuard())

    await waitFor(() => expect(result.current.isPending).toBe(false))

    expect(result.current.user).toMatchObject({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user',
    })
  })

  it('clears user and redirects on error', async () => {
    server.use(
      http.get('/auth/me', () => {
        return new Response(null, { status: 401 })
      }),
    )

    const { result } = renderHookWithProviders(() => useAuthGuard())

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.user).toBeNull()
  })
})
