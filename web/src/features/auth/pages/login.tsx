import { Link } from 'react-router'

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-bold">Log in to your account</h2>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your username and password to access your account.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="email@example.com"
            value="admin@example.com"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/auth/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            name="password"
            id="password"
            type="password"
            value="hardpassword"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Log in
        </Button>
      </div>
      <div className="text-center text-sm">
        Don't have an account?{' '}
        <Link to="/auth/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  )
}

export { LoginPage }
