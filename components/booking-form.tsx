'use client'

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
              className={`cursor-pointer transition-all ${
                selectedService === service.id 
                  ? 'ring-2 ring-blue-600 bg-blue-50' 
                  : 'hover:shadow-md'
              }`}
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
}