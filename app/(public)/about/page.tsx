'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Shield, Star, Clock } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Kleaners
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to make professional cleaning services accessible, reliable, and affordable for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <CardTitle className="text-2xl font-bold">10K+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Happy Customers</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <CardTitle className="text-2xl font-bold">100%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Insured & Bonded</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Star className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <CardTitle className="text-2xl font-bold">4.9/5</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Customer Rating</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Clock className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <CardTitle className="text-2xl font-bold">24/7</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Support</p>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-600 mb-6">
            Founded in 2020, Kleaners started with a simple vision: to connect people with trusted, 
            professional cleaning services. We believe that everyone deserves a clean, comfortable 
            space to live and work in.
          </p>
          <p className="text-gray-600 mb-6">
            Our platform makes it easy to book cleaning services, whether you need a one-time deep 
            clean or regular maintenance. All our cleaners are vetted, insured, and committed to 
            providing exceptional service.
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            To provide reliable, high-quality cleaning services that give our customers peace of mind 
            and more time to focus on what matters most to them.
          </p>
        </div>
      </div>
    </div>
  )
}
