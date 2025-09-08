'use client'

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function ResponsiveNavbar({
  user,
  userProfile,
  userRole,
  onLogin,
  onLogout,
  className
}: any) {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Kleaners
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/services">
              <Button variant="ghost">Services</Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost">About</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost">Contact</Button>
            </Link>
            {user ? (
              <Button onClick={onLogout} variant="outline">
                Logout
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}