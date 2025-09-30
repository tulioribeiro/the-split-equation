import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { toUserEntity } from '@/features/auth/adapters/user'
import { getCurrentUser } from '@/features/auth/api'
import type { UserResponse } from '@/features/auth/contracts'
import { useAuthStore } from '@/features/auth/store'

function useAuthGuard() {
  const { clearUser, setUser, user } = useAuthStore()
  const navigate = useNavigate()

  // @FIXME: this will make a request on every page, even if the user is already logged in
  // should only do this on initial app load
  const { isPending, isError, data } = useQuery<UserResponse, Error>({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const response = await getCurrentUser()

      return response.data
    },
    retry: false,
  })

  useEffect(() => {
    if (!data) {
      return
    }

    setUser(toUserEntity(data))
  }, [data, setUser])

  useEffect(() => {
    if (!isError) {
      return
    }

    clearUser()
    navigate('/auth/login', { replace: true })
  }, [clearUser, isError, navigate])

  return {
    isPending,
    isError,
    user,
  }
}

export { useAuthGuard }
