import { act, waitFor } from '@testing-library/react'

import { useForgotPassword } from '@/features/auth/hooks/use-forgot-password'
import { renderHookWithProviders } from '@/tests/mocks/utils/render-hook-with-providers'

describe('useForgotPassword hook', () => {
  it('should succeed with valid email', async () => {
    const { result } = renderHookWithProviders(() => useForgotPassword())

    act(() => {
      result.current.mutate({
        email: 'admin@example.com',
      })
    })

    await waitFor(() => result.current.isSuccess)
  })

  it('should fail with invalid email', async () => {
    const { result } = renderHookWithProviders(() => useForgotPassword())

    act(() => {
      result.current.mutate({
        email: 'invalid-email',
      })
    })

    await waitFor(() => result.current.isError)

    expect(result.current.error).toBeInstanceOf(Error)
  })
})
