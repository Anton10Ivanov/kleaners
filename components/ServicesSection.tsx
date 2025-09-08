'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Home, Building2, Sparkles, Square, Leaf, Shield } from 'lucide-react'
import Link from 'next/link'

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}

function ServiceCard({ title, description, icon: Icon, href }: ServiceCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription className="text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={href} aria-label={`Learn more about ${title}`}>
          <Button variant="outline" className="w-full">
            Learn More
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export function ServicesSection() {
  const services = [
    {
      title: 'Residential Cleaning',
      description: 'Professional home cleaning services for every room in your house.',
      icon: Home,
      href: '/booking/home-cleaning'
    },
    {
      title: 'Commercial Cleaning',
      description: 'Office and commercial space cleaning to keep your business spotless.',
      icon: Building2,
      href: '/booking/office-cleaning'
    },
    {
      title: 'Specialized Cleaning',
      description: 'Deep cleaning, move-in/out, and post-construction cleaning services.',
      icon: Sparkles,
      href: '/booking/deep-cleaning'
    },
    {
      title: 'Windows',
      description: 'Crystal clear windows inside and out for a brighter view.',
      icon: Square,
      href: '/contact'
    },
    {
      title: 'Garden & Outdoor',
      description: 'Outdoor cleaning and maintenance to enhance your property.',
      icon: Leaf,
      href: '/contact'
    },
    {
      title: 'Health & Safety',
      description: 'Sanitization and health-focused cleaning solutions.',
      icon: Shield,
      href: '/contact'
    }
  ]

  return (
    <section className="py-16 bg-gray-50" role="region" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="services-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Cleaning Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional cleaning services tailored to your needs. Choose from our comprehensive range of offerings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
              href={service.href}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services" aria-label="View all cleaning services">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
