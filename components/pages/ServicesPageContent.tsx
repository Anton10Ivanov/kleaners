'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { Search, Filter, ArrowRight, Star, ChevronDown, ChevronUp, Home, Building2, Sparkles, Shield, Leaf, Square } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Service {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  category: string
  price: string
  rating: number
  reviews: number
  features: string[]
}

interface ServiceCardProps extends Service {}

function ServiceCard({ id, title, description, icon: Icon, category, price, rating, reviews, features }: ServiceCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
            </div>
            <div>
              <CardTitle className="text-xl">{title}</CardTitle>
              <Badge variant="secondary" className="mt-1">{category}</Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 mb-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" aria-hidden="true" />
              <span className="text-sm font-medium">{rating}</span>
              <span className="text-sm text-gray-500">({reviews})</span>
            </div>
            <div className="text-lg font-semibold text-blue-600">{price}</div>
          </div>
        </div>
        <CardDescription className="text-gray-600 mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" aria-hidden="true"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <Link 
            href={
              id === 'windows-cleaning' || id === 'garden-outdoor' || id === 'health-safety'
                ? '/contact'
                : `/booking/${id}`
            }
            aria-label={`Book ${title} service`}
          >
            <Button className="w-full">
              {id === 'windows-cleaning' || id === 'garden-outdoor' || id === 'health-safety' 
                ? 'Get Quote' 
                : 'Book Now'
              }
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export function ServicesPageContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const services: Service[] = [
    {
      id: 'home-cleaning',
      title: 'Home Cleaning',
      description: 'Regular house cleaning service for your home',
      icon: Home,
      category: 'Residential',
      price: 'From €25/hour',
      rating: 4.9,
      reviews: 1234,
      features: ['Weekly/Bi-weekly', 'Eco-friendly products', 'Insured cleaners']
    },
    {
      id: 'office-cleaning',
      title: 'Office Cleaning',
      description: 'Professional commercial cleaning services',
      icon: Building2,
      category: 'Commercial',
      price: 'From €35/hour',
      rating: 4.8,
      reviews: 856,
      features: ['Flexible scheduling', 'After-hours available', 'Specialized equipment']
    },
    {
      id: 'deep-cleaning',
      title: 'Deep Cleaning',
      description: 'Thorough cleaning for special occasions',
      icon: Sparkles,
      category: 'Specialised',
      price: 'From €45/hour',
      rating: 4.9,
      reviews: 642,
      features: ['One-time service', 'Detailed cleaning', 'Move-in/out ready']
    },
    {
      id: 'windows-cleaning',
      title: 'Windows Cleaning',
      description: 'Professional interior and exterior window cleaning',
      icon: Square,
      category: 'Windows',
      price: 'Custom quote',
      rating: 4.7,
      reviews: 312,
      features: ['Streak-free finish', 'Safety-first procedures', 'All window types']
    },
    {
      id: 'garden-outdoor',
      title: 'Garden & Outdoor',
      description: 'Outdoor cleaning and maintenance services',
      icon: Leaf,
      category: 'Garden and Outdoor',
      price: 'Custom quote',
      rating: 4.6,
      reviews: 210,
      features: ['Patios & paths', 'Outdoor furniture', 'Seasonal cleanup']
    },
    {
      id: 'health-safety',
      title: 'Health & Safety',
      description: 'Disinfection and sensitive-area cleaning',
      icon: Shield,
      category: 'Health and Safety',
      price: 'Custom quote',
      rating: 4.8,
      reviews: 188,
      features: ['Medical-grade protocols', 'Sensitive materials', 'Certified products']
    }
  ]

  const categories = ['All', 'Residential', 'Commercial', 'Specialised', 'Windows', 'Garden and Outdoor', 'Health and Safety']

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Cleaning Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of cleaning services. All our cleaners are vetted, 
              insured, and committed to delivering exceptional results.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white border-b" aria-label="Search and filter services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                aria-label="Search services"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
                aria-expanded={showFilters}
                aria-controls="filter-options"
              >
                <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
                Filters
                {showFilters ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
              </Button>
              
              <div className={`${showFilters ? 'block' : 'hidden'} lg:block`} id="filter-options">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      aria-pressed={selectedCategory === category}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No services found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All')
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {selectedCategory === 'All' ? 'All Services' : `${selectedCategory} Services`}
                <span className="text-lg font-normal text-gray-500 ml-2">
                  ({filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'})
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          </>
        )}
        
        <div className="text-center mt-12 p-8 bg-white rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Need a Custom Solution?
          </h3>
          <p className="text-gray-600 mb-4">
            Can't find exactly what you're looking for? Contact us for a personalized cleaning solution.
          </p>
          <Link href="/contact" aria-label="Contact us for custom cleaning solutions">
            <Button size="lg">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
