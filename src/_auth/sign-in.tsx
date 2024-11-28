import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthContext } from '@/context/AuthProvider'
import { signIn } from '@/lib/api'
import { SignInType } from '@/types/authTypes'
import { useState } from 'react'

const SignIn = () => {
  const {setUser, setToken, setIsLoggedIn, setIsLoading} = useAuthContext();

  const [credentials, setCredentials] = useState<SignInType>({ username: "", password: "" });

  const signInAccountHandler = async () => {
    try {
      setIsLoading(true);
      const token = await signIn(credentials.username, credentials.password);
      setUser({
        username: credentials.username,
        email: "thisEmailIsNotAvailable"
      });
      setToken(token);
      setIsLoggedIn(true);
      setIsLoading(false);
    } catch (error) {
      console.log("Error signing in:", error);
    }
    
    
  }
  return (
    <>
      <h1 className="text-2xl font-semibold">Sign In</h1>
      <p className="text-gray-400 text-center">Your gateway to smarter cooking and organized grocery tracking.</p>
      <Input
        value={credentials.username}
        onChange={({ target }) => setCredentials({ ...credentials, username: target.value })}
        placeholder="Username" />

      <Input
        value={credentials.password}
        onChange={({ target }) => setCredentials({ ...credentials, password: target.value })}
        type="password" placeholder="Password" />
      <p className="text-gray-400">Don't have an account? <a href="sign-up" className="underline cursor-pointer hover:text-white">Sign Up</a></p>
      <Button onClick={()=>signInAccountHandler()}>Sign In</Button>
    </>

  )
}

export default SignIn