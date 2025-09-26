import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { toUserEntity } from '@/features/auth/adapters/user'
import { login } from '@/features/auth/api'
import type { LoginRequest, UserResponse } from '@/features/auth/contracts'
import { useAuthStore } from '@/features/auth/store'

function useLogin() {
  const { setUser } = useAuthStore()
  const navigate = useNavigate()

  return useMutation<UserResponse, Error, LoginRequest>({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(toUserEntity(data))

      navigate('/')
    },
  })
}

export { useLogin }
