import type { UserEntity } from '@/entities/user'
import { createStore } from '@/store'

interface AuthStore {
  user: UserEntity | null
  setUser: (user: UserEntity) => void
  clearUser: () => void
}

const useAuthStore = createStore<AuthStore>(
  (set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
  }),
  'AuthStore',
)

export { useAuthStore }
