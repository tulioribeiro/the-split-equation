import { act, waitFor } from '@testing-library/react'

import { useRegister } from '@/features/auth/hooks/use-register'
import { useAuthStore } from '@/features/auth/store'
import { renderHookWithProviders } from '@/tests/mocks/utils/render-hook-with-providers'

describe('useRegister hook', () => {
  it('should succeed with valid credentials', async () => {
    const { result } = renderHookWithProviders(() => useRegister())

    act(() => {
      result.current.mutate({
        name: 'John Doe',
        email: 'test@example.com',
        password: 'newpassword',
      })
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toMatchObject({
      user: {
        name: 'John Doe',
        email: 'test@example.com',
      },
    })
  })

  it('should fail with invalid credentials', async () => {
    const { result } = renderHookWithProviders(() => useRegister())

    act(() => {
      result.current.mutate({
        email: 'invalidexample.com',
        password: 'wrongpassword',
        name: 'Jane Doe',
      })
    })

    await waitFor(() => result.current.isError)

    expect(useAuthStore.getState().user).toBeNull()

    expect(result.current.error).toBeInstanceOf(Error)
  })
})
