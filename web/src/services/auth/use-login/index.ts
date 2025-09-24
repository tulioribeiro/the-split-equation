import { useMutation } from '@tanstack/react-query'

import { toUserEntity } from '@/adapters/user'
import type { LoginRequest, LoginResponse } from '@/contracts/auth'
import { login } from '@/services/auth/api'
import { useAuthStore } from '@/store/auth'

function useLogin() {
  const { setUser } = useAuthStore()

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(toUserEntity(data))

      // @TODO: redirect to intended page?
    },
  })
}

export { useLogin }
