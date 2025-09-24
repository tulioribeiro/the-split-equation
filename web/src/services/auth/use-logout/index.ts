import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { logout } from '@/services/auth/api'
import { useAuthStore } from '@/store/auth'

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
