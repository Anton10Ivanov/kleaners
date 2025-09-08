#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 Restoring Full Vite Functionality to Next.js...\n');

// 1. Restore HomePage with all sections
function restoreHomePage() {
  console.log('🏠 Restoring HomePage...');
  
  try {
    // Create the full HomePage component
    const homePageContent = `'use client'

import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Hero } from '@/components/hero';
import { ServicesSection } from '@/components/services-section';
import { HowItWorks } from '@/components/how-it-works';
import { Testimonials } from '@/components/testimonials';
import { CTA } from '@/components/cta';

// Error fallback component
const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="text-center py-8 text-red-500">
    <p>Something went wrong loading this section.</p>
    <p className="text-sm">{error?.message}</p>
  </div>
);

// Loading component
const SectionLoading = () => (
  <div className="py-16 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Hero />
      </ErrorBoundary>
      
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoading />}>
          <ServicesSection />
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoading />}>
          <HowItWorks />
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoading />}>
          <Testimonials />
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoading />}>
          <CTA />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}`;

    fs.writeFileSync('app/page.tsx', homePageContent);
    console.log('  ✅ HomePage restored');
    
    return true;
  } catch (error) {
    console.log(`  ❌ Error restoring HomePage: ${error.message}`);
    return false;
  }
}

// 2. Restore Booking System
function restoreBookingSystem() {
  console.log('\n📅 Restoring Booking System...');
  
  try {
    // Create booking form component
    const bookingFormContent = `'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Calendar, Clock, Home, Building, Sparkles, Truck } from 'lucide-react'

const serviceTypes = [
  { id: 'home-cleaning', name: 'Home Cleaning', icon: Home, description: 'Regular house cleaning service' },
  { id: 'office-cleaning', name: 'Office Cleaning', icon: Building, description: 'Commercial office cleaning' },
  { id: 'deep-cleaning', name: 'Deep Cleaning', icon: Sparkles, description: 'Thorough deep cleaning service' },
  { id: 'move-in-out', name: 'Move In/Out', icon: Truck, description: 'Moving cleaning service' }
]

export function BookingForm() {
  const [selectedService, setSelectedService] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Booking submitted:', { service: selectedService, ...formData })
    // Handle booking submission
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Your Cleaning Service</h1>
        <p className="text-lg text-gray-600">Choose your service and schedule your cleaning</p>
      </div>

      {/* Service Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {serviceTypes.map((service) => {
          const Icon = service.icon
          return (
            <Card 
              key={service.id}
              className={\`cursor-pointer transition-all \${
                selectedService === service.id 
                  ? 'ring-2 ring-blue-600 bg-blue-50' 
                  : 'hover:shadow-md'
              }\`}
              onClick={() => setSelectedService(service.id)}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Icon className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Booking Form */}
      {selectedService && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Booking Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time">Preferred Time</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, time: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="12:00">12:00 PM</SelectItem>
                      <SelectItem value="13:00">1:00 PM</SelectItem>
                      <SelectItem value="14:00">2:00 PM</SelectItem>
                      <SelectItem value="15:00">3:00 PM</SelectItem>
                      <SelectItem value="16:00">4:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any special requirements or notes..."
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Book Now
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}`;

    fs.writeFileSync('components/booking-form.tsx', bookingFormContent);
    
    // Create booking page
    const bookingPageContent = `import type { Metadata } from 'next'
import { BookingForm } from '@/components/booking-form'

export const metadata: Metadata = {
  title: 'Book Cleaning Service | Kleaners',
  description: 'Book your professional cleaning service with Kleaners. Choose from home cleaning, office cleaning, deep cleaning, and more.',
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingForm />
      </div>
    </div>
  )
}`;

    fs.writeFileSync('app/booking/page.tsx', bookingPageContent);
    console.log('  ✅ Booking system restored');
    
    return true;
  } catch (error) {
    console.log(`  ❌ Error restoring booking system: ${error.message}`);
    return false;
  }
}

// 3. Create Error Boundary component
function createErrorBoundary() {
  console.log('\n🛡️ Creating Error Boundary...');
  
  try {
    const errorBoundaryContent = `'use client'

import React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
  FallbackComponent?: React.ComponentType<{ error: Error }>
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

const DefaultErrorFallback = ({ error }: { error: Error }) => (
  <div className="text-center py-8 text-red-500">
    <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
    <p className="text-sm">{error?.message}</p>
  </div>
)

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.FallbackComponent || DefaultErrorFallback
      return <FallbackComponent error={this.state.error!} />
    }

    return this.props.children
  }
}`;

    fs.writeFileSync('components/error-boundary.tsx', errorBoundaryContent);
    console.log('  ✅ Error Boundary created');
    
    return true;
  } catch (error) {
    console.log(`  ❌ Error creating Error Boundary: ${error.message}`);
    return false;
  }
}

// 4. Create enhanced layouts
function createLayouts() {
  console.log('\n🏗️ Creating Enhanced Layouts...');
  
  try {
    // Create Navbar component
    const navbarContent = `'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, User, Calendar, Phone } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Kleaners
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link href="/services" className="text-gray-700 hover:text-blue-600">Services</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            <Link href="/booking">
              <Button>
                <Calendar className="mr-2 h-4 w-4" />
                Book Now
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">
                <User className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link href="/" className="block px-3 py-2 text-gray-700">Home</Link>
              <Link href="/services" className="block px-3 py-2 text-gray-700">Services</Link>
              <Link href="/about" className="block px-3 py-2 text-gray-700">About</Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-700">Contact</Link>
              <Link href="/booking" className="block px-3 py-2">
                <Button className="w-full">Book Now</Button>
              </Link>
              <Link href="/login" className="block px-3 py-2">
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}`;

    fs.writeFileSync('components/navbar.tsx', navbarContent);

    // Create Footer component
    const footerContent = `'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Kleaners</h3>
            <p className="text-gray-300 mb-4">
              Professional cleaning services you can trust. We make your space spotless.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services/home-cleaning" className="text-gray-300 hover:text-white">Home Cleaning</Link></li>
              <li><Link href="/services/office-cleaning" className="text-gray-300 hover:text-white">Office Cleaning</Link></li>
              <li><Link href="/services/deep-cleaning" className="text-gray-300 hover:text-white">Deep Cleaning</Link></li>
              <li><Link href="/services/move-in-out" className="text-gray-300 hover:text-white">Move In/Out</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link href="/about/faq" className="text-gray-300 hover:text-white">FAQ</Link></li>
              <li><Link href="/about/company-values" className="text-gray-300 hover:text-white">Our Values</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-gray-300">1-800-KLEANERS</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-gray-300">hello@kleaners.de</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-gray-300">Berlin, Germany</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 Kleaners. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}`;

    fs.writeFileSync('components/footer.tsx', footerContent);
    console.log('  ✅ Enhanced layouts created');
    
    return true;
  } catch (error) {
    console.log(`  ❌ Error creating layouts: ${error.message}`);
    return false;
  }
}

// 5. Update main layout to include navbar and footer
function updateMainLayout() {
  console.log('\n📐 Updating Main Layout...');
  
  try {
    const layoutContent = `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://kleaners.de'),
  title: {
    default: 'Kleaners - Professional Cleaning Services',
    template: '%s | Kleaners'
  },
  description: 'Professional cleaning services for homes and offices. Book online and get your space spotless with Kleaners.',
  keywords: ['cleaning services', 'home cleaning', 'office cleaning', 'professional cleaners', 'Berlin', 'Germany'],
  authors: [{ name: 'Kleaners' }],
  creator: 'Kleaners',
  publisher: 'Kleaners',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kleaners.de',
    title: 'Kleaners - Professional Cleaning Services',
    description: 'Professional cleaning services for homes and offices. Book online and get your space spotless.',
    siteName: 'Kleaners',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kleaners - Professional Cleaning Services',
    description: 'Professional cleaning services for homes and offices. Book online and get your space spotless.',
    creator: '@kleaners',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Kleaners",
              "description": "Professional cleaning services for homes and offices",
              "url": "https://kleaners.de",
              "telephone": "1-800-KLEANERS",
              "email": "hello@kleaners.de",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Berlin",
                "addressCountry": "Germany"
              },
              "serviceArea": {
                "@type": "Place",
                "name": "Berlin, Germany"
              },
              "priceRange": "€€",
              "openingHours": "Mo-Fr 08:00-18:00",
              "sameAs": [
                "https://facebook.com/kleaners",
                "https://twitter.com/kleaners",
                "https://instagram.com/kleaners"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}`;

    fs.writeFileSync('app/layout.tsx', layoutContent);
    console.log('  ✅ Main layout updated');
    
    return true;
  } catch (error) {
    console.log(`  ❌ Error updating main layout: ${error.message}`);
    return false;
  }
}

// Run restoration
async function main() {
  console.log('🚀 Starting Full Functionality Restoration...\n');
  
  let successCount = 0;
  let totalCount = 0;

  const tasks = [
    { name: 'Error Boundary', fn: createErrorBoundary },
    { name: 'Enhanced Layouts', fn: createLayouts },
    { name: 'Main Layout', fn: updateMainLayout },
    { name: 'HomePage', fn: restoreHomePage },
    { name: 'Booking System', fn: restoreBookingSystem },
  ];

  for (const task of tasks) {
    totalCount++;
    if (task.fn()) {
      successCount++;
    }
  }

  console.log(`\n📈 Restoration Summary:`);
  console.log(`   ✅ Successful operations: ${successCount}/${totalCount}`);
  
  if (successCount === totalCount) {
    console.log('\n🎉 Full Functionality Restoration Completed Successfully!');
    console.log('   Your Next.js app now has the full feature set!');
  } else {
    console.log('\n⚠️ Restoration completed with some issues');
    console.log('   Please check the logs above for any errors');
  }
}

main().catch(error => {
  console.log(`Restoration failed: ${error.message}`, 'error');
  process.exit(1);
});
