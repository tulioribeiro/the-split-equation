import z from 'zod'

const LoginRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

const LoginResponseSchema = z.object({
  user: z.object({
    id: z.uuid(),
    email: z.email(),
    name: z.string(),
    role: z.string(),
  }),
})

type LoginRequest = z.infer<typeof LoginRequestSchema>
type LoginResponse = z.infer<typeof LoginResponseSchema>

export { LoginRequestSchema, LoginResponseSchema }
export type { LoginRequest, LoginResponse }
