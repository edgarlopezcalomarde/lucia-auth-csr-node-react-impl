import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSignInMutation } from '@/lib/api/signin/signin.mutation';
import { zodResolver } from '@hookform/resolvers/zod'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useForm } from "react-hook-form";
import { z } from 'zod'

export const Route = createLazyFileRoute('/login')({
  component: () => <LoginPage />
})



const loginSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(6).max(255)
})

function LoginPage() {

  const signInMutation = useSignInMutation()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  })

  return (
    <div className='flex flex-col gap-4 h-full w-full items-center justify-center'>

      <div className='border  rounded max-w-[480px] max-h-[420px]  w-full h-full bg-slate-50  p-4 flex flex-col gap-4'>
        <h1 className='font-semibold text-xl  py-6 w-full text-center'>Log in your account</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6  w-full '>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username: </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="eddy" autoComplete="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}

            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password: </FormLabel>
                  <FormControl>
                    <Input type="text" autoComplete="current-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}

            />

            <Button className=' w-full'>Log in</Button>


          </form>
        </Form>

        <Link to='/signup' className='text-center w-full py-2 text-primary text-pretty font-medium'>Create your account</Link>

      </div>
    </div>
  )


  function onSubmit(values: z.infer<typeof loginSchema>) {
    signInMutation.mutate(values)
  }

}