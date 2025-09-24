import { useMutation } from '@tanstack/react-query'

import { logout } from '@/services/auth/api'
import { useAuthStore } from '@/store/auth'

function useLogout() {
  const { clearUser } = useAuthStore()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearUser()

      // @TODO: redirect?
    },
  })
}

export { useLogout }
