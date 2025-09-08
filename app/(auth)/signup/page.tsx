import type { Metadata } from 'next'
import { SignupPageContent } from '@/components/pages/SignupPageContent'

export const metadata: Metadata = {
  title: 'Sign Up | Kleaners',
  description: 'Create your account with Kleaners and start booking professional cleaning services in Berlin, Germany.',
  keywords: ['sign up Kleaners', 'create account', 'register cleaning service', 'Berlin cleaners signup'],
  openGraph: {
    title: 'Sign Up | Kleaners',
    description: 'Create your account with Kleaners and start booking professional cleaning services.',
    type: 'website',
    url: 'https://kleaners.de/signup',
  },
}

export default function SignupPage() {
  return <SignupPageContent />
}