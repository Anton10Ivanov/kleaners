'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Shield, Users, Lightbulb, Award, Clock } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description: "Every decision we make is guided by what's best for our customers. Their satisfaction is our top priority."
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "We maintain the highest standards of safety and security. All our cleaners are vetted, insured, and background-checked."
  },
  {
    icon: Users,
    title: "Community",
    description: "We believe in building strong relationships with both our customers and our cleaning professionals."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously improve our platform and services using the latest technology and best practices."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from customer service to the quality of our cleaning services."
  },
  {
    icon: Clock,
    title: "Reliability",
    description: "We understand the importance of being on time and delivering consistent, high-quality results."
  }
]

export default function CompanyValues() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Company Values
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These core values guide everything we do and shape the culture of our company.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Our Commitment to You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">For Our Customers</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Transparent pricing with no hidden fees</li>
                <li>• 100% satisfaction guarantee</li>
                <li>• Easy booking and rescheduling</li>
                <li>• 24/7 customer support</li>
                <li>• Secure payment processing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">For Our Cleaners</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Fair compensation and flexible schedules</li>
                <li>• Professional development opportunities</li>
                <li>• Supportive work environment</li>
                <li>• Regular training and feedback</li>
                <li>• Recognition and rewards program</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
