'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calendar, User } from 'lucide-react'

export function UserControls() {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Link href="/booking" aria-label="Book cleaning service">
        <Button>
          <Calendar className="mr-2 h-4 w-4" aria-hidden="true" />
          Book Now
        </Button>
      </Link>
      <Link href="/login" aria-label="Login to account">
        <Button variant="outline">
          <User className="mr-2 h-4 w-4" aria-hidden="true" />
          Login
        </Button>
      </Link>
    </div>
  )
}
