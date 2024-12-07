import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SignUpType } from '../types/authTypes'
import { createAccount } from "@/lib/api"
import { useAuthContext } from '@/context/AuthProvider'
import { useToast } from '@/hooks/use-toast'
import { z } from 'zod'
import {  useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form,FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'

function SignUp() {
    const { setUser, setToken, setIsLoggedIn, setIsLoading } = useAuthContext();
    const { toast } = useToast();

    const signUpSchema = z.object({
        username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(8, { message: "Password must be at least 8 characters long" })
    })

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    })
        

    const signUpAccountHandler = async (credentials:SignUpType) => {
        try {
            setIsLoading(true);
            const token = await createAccount(credentials.username, credentials.email, credentials.password);
            setUser({
                username: credentials.username,
                email: credentials.email
            });
            setToken(token);
            setIsLoggedIn(true);
            setIsLoading(false);
        } catch (error) {
            toast({
                title: "Error creating account",
                description: "Please try again later",
                variant: "destructive"
            });
            setToken("");
            setIsLoggedIn(false);
            setIsLoading(false);
        }
    }

    return (
        <>
            <h1 className="text-2xl font-semibold">Sign Up</h1>
            <p className="text-gray-400 text-center">Your gateway to smarter cooking and organized grocery tracking.</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(signUpAccountHandler)} className='w-full flex flex-col gap-4'>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder="Username" />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder="Email" />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder="Password" />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <p className="text-muted-foreground self-center">Already have an account? <a href="sign-in" className="underline cursor-pointer hover:text-white">Sign In</a></p>
                    <Button className='w-max self-center' type="submit">Sign Up</Button>
                </form>
            </Form>
        </>
    )
}

export default SignUp