import { useLogin } from '@/features/auth/hooks/use-login'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'

function LoginPage() {
  const loginMutation = useLogin()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    loginMutation.mutate({
      email,
      password,
    })
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <h1 className="mb-4">Login Page</h1>
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email:</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value="admin@example.com"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="password">Password:</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value="hardpassword"
            />
          </div>

          <Button type="submit">Login</Button>
        </div>
      </form>
    </main>
  )
}

export { LoginPage }
