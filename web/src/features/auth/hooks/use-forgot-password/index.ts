import { useMutation } from '@tanstack/react-query'

import { forgotPassword } from '@/features/auth/api'

function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
  })
}

export { useForgotPassword }
