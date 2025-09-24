import { act, waitFor } from '@testing-library/react'

import { useLogout } from '@/features/auth/hooks/use-logout'
import { useAuthStore } from '@/features/auth/store'
import { renderHookWithProviders } from '@/tests/mocks/utils/render-hook-with-providers'

describe('useLogout hook', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: {
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
        id: '1',
      },
    })
  })

  it('should call logout function', async () => {
    const { result } = renderHookWithProviders(() => useLogout())

    act(() => {
      result.current.mutate()
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.isSuccess).toBe(true)

    expect(useAuthStore.getState().user).toBeNull()
  })
})
