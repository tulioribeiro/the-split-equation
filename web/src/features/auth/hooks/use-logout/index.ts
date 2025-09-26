import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { logout } from '@/features/auth/api'
import { useAuthStore } from '@/features/auth/store'

function useLogout() {
  const { clearUser } = useAuthStore()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })
      clearUser()

      navigate('/auth/login', { replace: true })
    },
  })
}

export { useLogout }
