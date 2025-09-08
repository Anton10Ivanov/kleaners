'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calendar, User } from 'lucide-react'

interface MobileMenuProps {
  onClose: () => void
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="py-6">
        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto space-y-4 pb-6">
        <Link href="/booking" className="block" onClick={onClose}>
          <Button className="w-full">
            <Calendar className="mr-2 h-4 w-4" />
            Book Now
          </Button>
        </Link>
        <Link href="/login" className="block" onClick={onClose}>
          <Button variant="outline" className="w-full">
            <User className="mr-2 h-4 w-4" />
            Login
          </Button>
        </Link>
      </div>
    </div>
  )
}
