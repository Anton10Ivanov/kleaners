'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MessageCircle, Clock, MapPin } from 'lucide-react'

interface ContactMethodProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  value: string
  href: string
}

function ContactMethod({ icon: Icon, title, value, href }: ContactMethodProps) {
  return (
    <a
      href={href}
      className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
      aria-label={`${title}: ${value}`}
    >
      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
        <Icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-blue-600 font-medium">{value}</p>
      </div>
    </a>
  )
}

interface BusinessHoursItemProps {
  days: string
  hours: string
}

function BusinessHoursItem({ days, hours }: BusinessHoursItemProps) {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-gray-600">{days}</span>
      <span className="font-medium text-gray-900">{hours}</span>
    </div>
  )
}

export function ContactPageContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return
    }

    setIsSubmitting(true)
    
    // Simulate form submission (replace with actual API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods: ContactMethodProps[] = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'hello@kleaners.de',
      href: 'mailto:hello@kleaners.de'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '1-800-KLEANERS',
      href: 'tel:1-800-KLEANERS'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: 'Message Us',
      href: 'https://wa.me/491234567890'
    }
  ]

  const businessHours = [
    { days: 'Monday - Friday', hours: '8:00 AM - 8:00 PM' },
    { days: 'Saturday', hours: '9:00 AM - 6:00 PM' },
    { days: 'Sunday', hours: '10:00 AM - 4:00 PM' }
  ]

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Message Sent!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
            <Button onClick={() => setSubmitted(false)} variant="outline">
              Send Another Message
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our services? Need a custom quote? We're here to help! 
              Get in touch with our friendly team.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        aria-describedby="name-error"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        aria-describedby="email-error"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+49 123 456 789"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us how we can help you..."
                      className="min-h-[120px]"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      aria-describedby="message-error"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                    aria-describedby={isSubmitting ? "submitting-status" : undefined}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                  
                  {isSubmitting && (
                    <p id="submitting-status" className="sr-only">
                      Your message is being sent
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Get in Touch</CardTitle>
                <p className="text-gray-600">
                  Prefer to contact us directly? Here are all the ways you can reach us.
                </p>
              </CardHeader>
              <CardContent className="space-y-2">
                {contactMethods.map((method, index) => (
                  <ContactMethod
                    key={index}
                    icon={method.icon}
                    title={method.title}
                    value={method.value}
                    href={method.href}
                  />
                ))}
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {businessHours.map((schedule, index) => (
                    <BusinessHoursItem
                      key={index}
                      days={schedule.days}
                      hours={schedule.hours}
                    />
                  ))}
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Emergency Services:</strong> Available 24/7 for urgent cleaning needs.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  Service Area
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We proudly serve Berlin and surrounding areas with professional cleaning services.
                </p>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">Berlin, Germany</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Serving all districts within the Berlin metropolitan area
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
