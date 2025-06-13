import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthContext } from '@/context/AuthProvider'
import { useToast } from '@/hooks/use-toast'
import { signIn } from '@/lib/api/user'
import { SignInType } from '@/types/authTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const SignIn = () => {
  const {toast} = useToast();
  const {setUser, setToken, setIsLoggedIn, setIsLoading} = useAuthContext();

  const signInSchema = z.object({
    username: z.string().min(1, {message: "Required"}),
    password: z.string().min(1, {message: "Required"})
})

const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
        username: "",
        password: ""
    }
})

  const signInAccountHandler = async (credentials:SignInType) => {
    try {
      setIsLoading(true);
      const token = await signIn(credentials.username, credentials.password);
      console.log("Token:", token);
      // TODO: get email from token
      setUser({
        username: credentials.username,
        email: "thisEmailIsNotAvailable"
      });
      setToken(token);
      setIsLoggedIn(true);
      setIsLoading(false);
    } catch (error) {
      toast({
        title:"Error signing in",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
      setToken("");
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }
  return (
    <>
      <h1 className="text-2xl font-semibold">Sign In</h1>
      <p className="text-gray-400 text-center">Your gateway to smarter cooking and organized grocery tracking.</p>
      <Form {...form}>
                <form onSubmit={form.handleSubmit(signInAccountHandler)} className='w-full flex flex-col gap-4'>
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
                    <p className="text-gray-400 self-center">Don't have an account? <a href="sign-up" className="underline cursor-pointer hover:text-white">Sign Up</a></p>
                    <Button className='w-max self-center' type="submit">Sign In</Button>
                </form>
            </Form>      
    </>

  )
}

export default SignIn