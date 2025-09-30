import { Link } from 'react-router'

import { useRegister } from '@/features/auth/hooks/use-register'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'

function RegisterPage() {
  const registerMutation = useRegister()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string

    registerMutation.mutate({
      email,
      password,
      name,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-bold">Register for an account</h2>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            id="name"
            type="text"
            placeholder="John Doe"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="email@example.com"
            value="newuser@example.com"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            id="password"
            type="password"
            value="newpassword"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirm your password</Label>
          <Input
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            value="newpassword"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Create your account
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link to="/auth/login" className="underline underline-offset-4">
          Log in
        </Link>
      </div>
    </form>
  )
}

export { RegisterPage }
