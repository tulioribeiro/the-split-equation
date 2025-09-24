import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { toUserEntity } from '@/adapters/user'
import type { LoginRequest, LoginResponse } from '@/contracts/auth'
import { login } from '@/services/auth/api'
import { useAuthStore } from '@/store/auth'

function useLogin() {
  const { setUser } = useAuthStore()
  const navigate = useNavigate()

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(toUserEntity(data))

      navigate('/')
    },
  })
}

export { useLogin }
