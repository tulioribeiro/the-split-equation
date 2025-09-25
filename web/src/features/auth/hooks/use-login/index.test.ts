import { act, waitFor } from '@testing-library/react'

import { useLogin } from '@/features/auth/hooks/use-login'
import { useAuthStore } from '@/features/auth/store'
import { renderHookWithProviders } from '@/tests/mocks/utils/render-hook-with-providers'

describe('useLogin hook', () => {
  beforeEach(() => {
    useAuthStore.getState().clearUser()
  })

  it('should succeed with valid credentials', async () => {
    const { result } = renderHookWithProviders(() => useLogin())

    act(() => {
      result.current.mutate({
        email: 'admin@example.com',
        password: 'hardpassword',
      })
    })

    await waitFor(() => result.current.isSuccess)

    console.log(result.current)

    expect(result.current.data).toMatchObject({
      user: {
        name: 'Admin User',
        email: 'admin@example.com',
      },
    })

    expect(useAuthStore.getState().user).toMatchObject({
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
    })
  })

  it('should fail with invalid credentials', async () => {
    const { result } = renderHookWithProviders(() => useLogin())

    act(() => {
      result.current.mutate({
        email: 'invalid@example.com',
        password: 'wrongpassword',
      })
    })

    await waitFor(() => result.current.isError)

    expect(useAuthStore.getState().user).toBeNull()

    expect(result.current.error).toBeInstanceOf(Error)
  })
})
