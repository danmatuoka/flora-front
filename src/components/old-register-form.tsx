import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { useForm, type SubmitHandler } from "react-hook-form"

type RegisterInputs = {
  username: string;
  password: string
  email: string
}

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>()
  const onSubmit: SubmitHandler<RegisterInputs> = (data) => console.log(data)

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="John Doe" {...register('username', { required: 'This field is required' })} />
        {errors.username && <span className="text-xs text-red-600">{errors.username.message}</span>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" {...register('email', { required: 'This field is required' })} />
        {errors.email && <span className="text-xs text-red-600">{errors.email.message}</span>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register('password', { required: 'This field is required', minLength: { value: 6, message: 'Min 6 characteres' } })} />
        {errors.password && <span className="text-xs text-red-600">{errors.password.message}</span>}
      </div>
      <Button type="submit" className="w-full">Create account</Button>
    </form>
  )
}
