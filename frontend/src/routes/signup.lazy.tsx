import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSignUpMutation } from '@/lib/api/signup/signup.mutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const Route = createLazyFileRoute('/signup')({
    component: () => <SignUpPage />
})



const signUpSchema = z.object({
    username: z.string().min(4),
    password: z.string().min(6).max(255)
})

function SignUpPage() {

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const signUpMutation = useSignUpMutation()

    return (
        <div className='flex flex-col gap-4 h-full w-full items-center justify-center'>

            <div className='border  rounded max-w-[480px] max-h-[420px]  w-full h-full bg-slate-50  p-4 flex flex-col gap-4'>
                <h1 className='font-semibold text-xl  py-6 w-full text-center'>Create account</h1>

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

                        <Button className=' w-full'>Sign Up</Button>


                    </form>
                </Form>

                <Link to='/login' className='text-center w-full py-2 text-primary text-pretty font-medium'>Login your account</Link>

            </div>
        </div>
    )


    function onSubmit(values: z.infer<typeof signUpSchema>) {
        signUpMutation.mutate(values)
    }


}