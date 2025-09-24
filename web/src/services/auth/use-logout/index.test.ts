import { act, waitFor } from '@testing-library/react'

import { useLogout } from '@/services/auth/use-logout'
import { useAuthStore } from '@/store/auth'
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
