import z from 'zod'

const UserSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string(),
  role: z.string(),
})

const LoginRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

const UserResponseSchema = z.object({
  user: UserSchema,
})

const ForgotPasswordRequestSchema = z.object({
  email: z.email(),
})

type LoginRequest = z.infer<typeof LoginRequestSchema>
type UserResponse = z.infer<typeof UserResponseSchema>
type ForgotPasswordRequest = z.infer<typeof ForgotPasswordRequestSchema>

export { ForgotPasswordRequestSchema, LoginRequestSchema, UserResponseSchema }
export type { ForgotPasswordRequest, LoginRequest, UserResponse }
