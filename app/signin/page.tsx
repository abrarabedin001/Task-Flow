'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
// import { toast } from 'react-toastify'
import { useUserStore } from '@/Controller/userStore'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn, signInWithGoogle } from '@/Database/auth'
import { ToastContainer, toast } from 'react-toastify';
function Page(): JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    // Attempt to sign in with provided email and password
    const { result, error } = await signIn(email, password)

    if (error) {
      if (error.code === 'auth/invalid-login-credentials') {
        toast("Wow so easy!")
      } else {
        
        // result?.currentUser?.displayName
      }
      console.log(error)
      return
    }else{
      toast("Wow so easy!")
      router.push('/')
    }
    toast("Wow so easy!")
    // Redirect to the admin page
    // 
  }

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    const { user, error } = await signInWithGoogle()

    if (error) {
      // Display and log any sign-in errors
      console.log(error)
      return
    } else{toast.success('Login Successful')} 

    // Sign in successful
    console.log(user)

    // router.push('/')
  }

  return (
    <div className="flex justify-center items-center container h-screen">
      <Card className="w-1/3">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Good to see you again
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button variant="outline" onClick={handleGoogleSignIn}>
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
          <form onSubmit={handleForm} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or Continue With
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="m@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
              />
            </div>
            <Button disabled={!password} className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Page