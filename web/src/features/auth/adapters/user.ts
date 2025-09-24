import type { UserEntity } from '@/entities/user'
import type { LoginResponse } from '@/features/auth/contracts'

function toUserEntity(data: LoginResponse): UserEntity {
  const role: UserEntity['role'] = ['admin', 'user'].includes(data.user.role)
    ? (data.user.role as UserEntity['role'])
    : 'user'

  return {
    id: data.user.id,
    email: data.user.email,
    name: data.user.name,
    role,
  }
}

export { toUserEntity }
