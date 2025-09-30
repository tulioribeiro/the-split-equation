import { Link } from 'react-router'

import { useForgotPassword } from '@/features/auth/hooks/use-forgot-password'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'

function ForgotPassword() {
  const forgotPasswordMutation = useForgotPassword()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string

    forgotPasswordMutation.mutate({
      email,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-bold">Reset password</h2>
        <p className="text-muted-foreground text-sm text-balance">
          Enter the email linked to your account, and we'll send you a message
          with steps to reset your password.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            type="text"
            placeholder="email@example.com"
            value="adminxample.com"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Send reset instructions
        </Button>
      </div>
      <div className="text-center text-sm">
        Remember your password?{' '}
        <Link to="/auth/login" className="underline underline-offset-4">
          Log in
        </Link>
      </div>
    </form>
  )
}

export { ForgotPassword }
