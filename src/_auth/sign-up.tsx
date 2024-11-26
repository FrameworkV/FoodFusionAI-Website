import React, { useState } from 'react'
import AuthLayout from './_layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SignUpType } from '../types/authTypes'
import { createAccount } from "@/lib/api"

function SignUp() {
    const [credentials, setCredentials] = useState<SignUpType>({ username: "", password: "", email: "", })

    const signUpAccountHandler = () => {
        const result = createAccount(credentials.username, credentials.email, credentials.password);
        console.log(result);
    }

    return (
        <>
            <h1 className="text-2xl font-semibold">Sign Up</h1>
            <p className="text-gray-400 text-center">Your gateway to smarter cooking and organized grocery tracking.</p>
            <Input
                value={credentials.username}
                onChange={({ target }) => setCredentials({ ...credentials, username: target.value })}
                placeholder="Username" />
            <Input
                value={credentials.email}
                onChange={({ target }) => setCredentials({ ...credentials, email: target.value })}
                placeholder="Email" />
            <Input
                value={credentials.password}
                onChange={({ target }) => setCredentials({ ...credentials, password: target.value })}
                type="password" placeholder="Password" />
            <p className="text-gray-400">Already have an account? <a href="sign-in" className="underline cursor-pointer hover:text-white">Sign In</a></p>
            <Button onClick={() => signUpAccountHandler()}>Sign Up</Button>
        </>
    )
}

export default SignUp