import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { register } from '@/features/auth/api'
import type { RegisterRequest, UserResponse } from '@/features/auth/contracts'

function useRegister() {
  const navigate = useNavigate()

  return useMutation<UserResponse, Error, RegisterRequest>({
    mutationFn: register,
    onSuccess: () => {
      navigate('/auth/login')
    },
  })
}

export { useRegister }
