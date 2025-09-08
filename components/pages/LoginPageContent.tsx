'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import LoginForm from '@/components/auth/LoginForm'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm'
import SocialLogin from '@/components/auth/SocialLogin'
import Link from 'next/link'
import { useState } from 'react'

export function LoginPageContent() {
  const [showResetPassword, setShowResetPassword] = useState(false)

  if (showResetPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ResetPasswordForm />
            <div className="text-center text-sm text-gray-600">
              Remember your password?{' '}
              <button 
                onClick={() => setShowResetPassword(false)}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Sign in
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <SocialLogin />
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          
          <LoginForm onForgotPassword={() => setShowResetPassword(true)} />
          
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
