'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, User, CheckCircle } from 'lucide-react'

interface StepCardProps {
  step: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  isLast: boolean
}

function StepCard({ step, title, description, icon: Icon, isLast }: StepCardProps) {
  return (
    <Card className="text-center relative">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Icon className="h-8 w-8 text-white" aria-hidden="true" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-900">
              {step}
            </div>
          </div>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
      {!isLast && (
        <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2" aria-hidden="true">
          <div className="w-8 h-0.5 bg-gray-300"></div>
        </div>
      )}
    </Card>
  )
}

export function HowItWorks() {
  const steps = [
    {
      step: 1,
      title: 'Book Online',
      description: 'Choose your service, date, and time through our easy online booking system.',
      icon: Calendar
    },
    {
      step: 2,
      title: 'We Match You',
      description: 'We connect you with a vetted, professional cleaner in your area.',
      icon: User
    },
    {
      step: 3,
      title: 'Enjoy Clean',
      description: 'Relax while we clean your space to your satisfaction. 100% guaranteed.',
      icon: CheckCircle
    }
  ]

  return (
    <section className="py-16 bg-white" role="region" aria-labelledby="how-it-works-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Getting your space cleaned has never been easier. Follow these simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <StepCard
              key={step.step}
              step={step.step}
              title={step.title}
              description={step.description}
              icon={step.icon}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
