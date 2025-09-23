import { useMutation } from '@tanstack/react-query'

import { logout } from '@/services/auth/api'

function useLogout() {
  return useMutation({
    mutationFn: logout,
  })
}

export { useLogout }
