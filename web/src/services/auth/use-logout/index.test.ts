import { act, waitFor } from '@testing-library/react'

import { useLogout } from '@/services/auth/use-logout'
import { renderHookWithProviders } from '@/tests/mocks/utils/render-hook-with-providers'

describe('useLogout hook', () => {
  it('should call logout function', async () => {
    const { result } = renderHookWithProviders(() => useLogout())

    act(() => {
      result.current.mutate()
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.isSuccess).toBe(true)
  })
})
