import { useMutation } from '@tanstack/react-query'

import type { LoginRequest, LoginResponse } from '@/contracts/auth'
import { login } from '@/services/auth/api'

function useLogin() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
  })
}

export { useLogin }
