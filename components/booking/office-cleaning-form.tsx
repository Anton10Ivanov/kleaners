'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Clock, Building, Users } from 'lucide-react'
import { format } from 'date-fns'

export function OfficeCleaningForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    officeSize: '',
    employees: '',
    frequency: 'weekly',
    cleaningLevel: 'standard',
    specialRequests: ''
  })

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', 
    '17:00', '18:00', '19:00', '20:00', '21:00'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const calculateEstimate = () => {
    const basePrice = 50
    const sizeMultiplier = formData.officeSize === 'small' ? 1 : formData.officeSize === 'medium' ? 1.5 : 2
    const frequencyMultiplier = formData.frequency === 'daily' ? 0.8 : formData.frequency === 'weekly' ? 1 : 1.2
    const levelMultiplier = formData.cleaningLevel === 'basic' ? 0.8 : formData.cleaningLevel === 'standard' ? 1 : 1.3
    
    const estimate = basePrice * sizeMultiplier * frequencyMultiplier * levelMultiplier
    return Math.round(estimate)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Office cleaning booking:', { 
      ...formData, 
      date: selectedDate, 
      time: selectedTime,
      estimate: calculateEstimate()
    })
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Office Cleaning Service
          </CardTitle>
          <CardDescription>
            Professional office cleaning services tailored to your business needs.
          </CardDescription>
          
          {/* Progress Indicator */}
          <div className="flex items-center space-x-2 mt-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-8 h-0.5 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Company Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Company Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactName">Contact Person</Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Office Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your office address"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Service Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Service Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Office Size</Label>
                    <Select value={formData.officeSize} onValueChange={(value) => setFormData(prev => ({ ...prev, officeSize: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select office size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (1-10 people)</SelectItem>
                        <SelectItem value="medium">Medium (11-50 people)</SelectItem>
                        <SelectItem value="large">Large (50+ people)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Number of Employees</Label>
                    <Input
                      name="employees"
                      type="number"
                      value={formData.employees}
                      onChange={handleInputChange}
                      placeholder="Approximate number"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Cleaning Frequency</Label>
                    <Select value={formData.frequency} onValueChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Cleaning Level</Label>
                    <Select value={formData.cleaningLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, cleaningLevel: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic Cleaning</SelectItem>
                        <SelectItem value="standard">Standard Cleaning</SelectItem>
                        <SelectItem value="deep">Deep Cleaning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="specialRequests">Special Requirements</Label>
                  <Textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    placeholder="Any specific areas or requirements?"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Schedule & Confirmation */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Schedule & Confirmation</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Preferred Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label>Preferred Time</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4" />
                              {time}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Service Summary</h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p><strong>Company:</strong> {formData.companyName}</p>
                    <p><strong>Office Size:</strong> {formData.officeSize}</p>
                    <p><strong>Frequency:</strong> {formData.frequency}</p>
                    <p><strong>Cleaning Level:</strong> {formData.cleaningLevel}</p>
                    <p><strong>Estimated Cost:</strong> €{calculateEstimate()}/session</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < 3 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Book Office Cleaning
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}