import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { logout } from '@/features/auth/api'
import { useAuthStore } from '@/features/auth/store'

function useLogout() {
  const { clearUser } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearUser()

      navigate('/auth/login')
    },
  })
}

export { useLogout }
