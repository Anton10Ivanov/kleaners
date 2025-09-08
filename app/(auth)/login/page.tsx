import type { Metadata } from 'next'
import { LoginPageContent } from '@/components/pages/LoginPageContent'

export const metadata: Metadata = {
  title: 'Login | Kleaners',
  description: 'Sign in to your Kleaners account and manage your cleaning service bookings in Berlin, Germany.',
  keywords: ['login Kleaners', 'sign in', 'cleaning service login', 'Berlin cleaners login'],
  openGraph: {
    title: 'Login | Kleaners',
    description: 'Sign in to your Kleaners account and manage your cleaning service bookings.',
    type: 'website',
    url: 'https://kleaners.de/login',
  },
}

export default function LoginPage() {
  return <LoginPageContent />
}