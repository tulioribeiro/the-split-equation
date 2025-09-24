type UserRole = 'admin' | 'user'

interface UserEntity {
  id: string
  email: string
  name: string
  role: UserRole
}

export type { UserEntity }
