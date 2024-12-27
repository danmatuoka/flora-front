import { useActionState } from "react"
import { signup } from "~/app/actions/auth"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

export function RegisterForm() {
  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" name='username' placeholder="John Doe" />
        {state?.errors?.username && <p>{state.errors.username}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name='email' placeholder="m@example.com" />
        {state?.errors?.email && <p>{state.errors.email}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name='password' type="password" />
        {state?.errors?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Button disabled={pending} type="submit" className="w-full">Create account</Button>
    </form>
  )
}
