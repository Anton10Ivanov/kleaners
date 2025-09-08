'use client'

import React, { useState, useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, MapPin, User, Phone, Mail, Home, Building2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StandardizedFormField, FormSection } from './StandardizedFormField';
import { StandardizedFormLayout, FormFieldGroup } from './StandardizedFormLayout';
import { useScheduleData } from '@/hooks/useScheduleData';
import { FormCalendar } from '@/components/calendar/FormCalendar';

// Service-specific components
import EnhancedDeepCleaningFields from '../booking/deep-cleaning/EnhancedDeepCleaningFields';
import MoveInOutFields from '../booking/move-in-out/MoveInOutFields';
import PostConstructionFields from '../booking/post-construction/PostConstructionFields';
import HomeDetailsSection from '../booking/home/HomeDetailsSection';

// Service-specific schemas
import { 
  HomeCleaningSchema, 
  DeepCleaningSchema, 
  MoveInOutSchema, 
  PostConstructionSchema,
  type HomeBookingForm,
  type DeepCleaningBookingForm,
  type MoveInOutBookingForm,
  type PostConstructionBookingForm
} from '@/schemas/bookingSchemas';

// Service types
export type ServiceType = 'home-cleaning' | 'deep-cleaning' | 'move-in-out' | 'post-construction';

export interface UnifiedBookingFormData {
  // Service details
  serviceType: ServiceType;
  serviceCategory: string;
  hours: number;
  frequency: string;
  
  // Property details
  propertySize: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  cleaningPace: string;
  dirtinessLevel: number;
  
  // Location
  postalCode: string;
  address: string;
  city: string;
  accessMethod: string;
  
  // Scheduling
  selectedDate: Date;
  selectedTime: string;
  timeSlot: string;
  
  // Contact information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Additional details
  extras: string[];
  specialInstructions: string;
  suppliesProvided: boolean;
  insurance: boolean;
  
  // Pricing
  estimatedPrice: number;
  finalPrice: number;
}

interface UnifiedBookingFormProps {
  serviceType: ServiceType;
  onSubmit: (data: UnifiedBookingFormData) => void | Promise<void>;
  onBack?: () => void;
  onNext?: () => void;
  currentStep?: number;
  totalSteps?: number;
  className?: string;
  isLoading?: boolean;
}

// Service configuration
const serviceConfig = {
  'home-cleaning': {
    title: 'Home Cleaning Service',
    description: 'Professional residential cleaning tailored to your needs',
    icon: Home,
    color: 'bg-blue-500',
    defaultHours: 2,
    maxHours: 8,
    schema: HomeCleaningSchema,
    formData: {} as HomeBookingForm
  },
  'deep-cleaning': {
    title: 'Deep Cleaning Service',
    description: 'Comprehensive deep cleaning for thorough results',
    icon: Sparkles,
    color: 'bg-purple-500',
    defaultHours: 4,
    maxHours: 12,
    schema: DeepCleaningSchema,
    formData: {} as DeepCleaningBookingForm
  },
  'move-in-out': {
    title: 'Move In/Out Cleaning',
    description: 'Complete cleaning for property transitions',
    icon: Home,
    color: 'bg-orange-500',
    defaultHours: 6,
    maxHours: 16,
    schema: MoveInOutSchema,
    formData: {} as MoveInOutBookingForm
  },
  'post-construction': {
    title: 'Post-Construction Cleaning',
    description: 'Specialized cleaning after construction work',
    icon: Building2,
    color: 'bg-green-500',
    defaultHours: 8,
    maxHours: 20,
    schema: PostConstructionSchema,
    formData: {} as PostConstructionBookingForm
  }
};

export const UnifiedBookingForm: React.FC<UnifiedBookingFormProps> = ({
  serviceType,
  onSubmit,
  onBack,
  onNext,
  currentStep = 1,
  totalSteps = 4,
  className,
  isLoading = false
}) => {
  const { cleaners, bookingRules } = useScheduleData();
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  
  const config = serviceConfig[serviceType];
  const ServiceIcon = config.icon;

  // Initialize form with service-specific schema
  const form = useForm<UnifiedBookingFormData>({
    resolver: zodResolver(config.schema),
    defaultValues: {
      // Service details
      serviceType,
      serviceCategory: serviceType === 'post-construction' ? 'commercial' : 'residential',
      hours: config.defaultHours,
      frequency: 'one-time',
      
      // Property details
      propertySize: serviceType === 'post-construction' ? 200 : 70,
      bedrooms: serviceType === 'post-construction' ? 0 : 2,
      bathrooms: 1,
      propertyType: serviceType === 'post-construction' ? 'commercial' : 'apartment',
      cleaningPace: serviceType === 'home-cleaning' ? 'standard' : 'thorough',
      dirtinessLevel: serviceType === 'post-construction' ? 5 : 3,
      
      // Location
      postalCode: '',
      address: '',
      city: '',
      accessMethod: '',
      
      // Scheduling
      selectedDate: new Date(),
      selectedTime: '',
      timeSlot: '',
      
      // Contact information
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      
      // Additional details
      extras: [],
      specialInstructions: '',
      suppliesProvided: false,
      insurance: false,
      
      // Pricing
      estimatedPrice: 0,
      finalPrice: 0,
      
      // Service-specific fields
      ...config.formData
    }
  });

  // Form steps configuration
  const steps = [
    {
      id: 'service-details',
      title: 'Service Details',
      description: 'Configure your cleaning service'
    },
    {
      id: 'property-details',
      title: 'Property Details',
      description: 'Tell us about your space'
    },
    {
      id: 'scheduling',
      title: 'Schedule',
      description: 'Choose date and time'
    },
    {
      id: 'contact-info',
      title: 'Contact Info',
      description: 'Your contact details'
    }
  ];

  // Service type options
  const serviceTypeOptions = [
    { value: 'home-cleaning', label: 'Home Cleaning' },
    { value: 'deep-cleaning', label: 'Deep Cleaning' },
    { value: 'move-in-out', label: 'Move In/Out' },
    { value: 'post-construction', label: 'Post-Construction' }
  ];

  // Frequency options
  const frequencyOptions = [
    { value: 'one-time', label: 'One-time' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'bi-weekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  // Property type options
  const propertyTypeOptions = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'office', label: 'Office' },
    { value: 'commercial', label: 'Commercial Space' }
  ];

  // Cleaning pace options
  const cleaningPaceOptions = [
    { value: 'quick', label: 'Quick (Standard cleaning)' },
    { value: 'standard', label: 'Standard (Thorough cleaning)' },
    { value: 'thorough', label: 'Thorough (Deep cleaning)' }
  ];

  // Dirtiness level options
  const dirtinessLevelOptions = [
    { value: 1, label: 'Very Clean (Maintenance cleaning)' },
    { value: 2, label: 'Clean (Light cleaning needed)' },
    { value: 3, label: 'Average (Regular cleaning)' },
    { value: 4, label: 'Dirty (Heavy cleaning needed)' },
    { value: 5, label: 'Very Dirty (Deep cleaning required)' }
  ];

  // Extra services options
  const extraServicesOptions = [
    { value: 'windows', label: 'Window Cleaning', price: 50 },
    { value: 'appliances', label: 'Appliance Cleaning', price: 75 },
    { value: 'carpets', label: 'Carpet Cleaning', price: 100 },
    { value: 'upholstery', label: 'Upholstery Cleaning', price: 80 },
    { value: 'garage', label: 'Garage Cleaning', price: 60 },
    { value: 'basement', label: 'Basement Cleaning', price: 90 }
  ];

  // Calculate estimated price
  const calculatePrice = () => {
    const basePrice = form.watch('hours') * 25; // $25 per hour base rate
    const extrasPrice = selectedExtras.reduce((total, extra) => {
      const service = extraServicesOptions.find(s => s.value === extra);
      return total + (service?.price || 0);
    }, 0);
    return basePrice + extrasPrice;
  };

  const estimatedPrice = calculatePrice();

  // Update form when extras change
  useEffect(() => {
    form.setValue('extras', selectedExtras);
    form.setValue('estimatedPrice', estimatedPrice);
  }, [selectedExtras, estimatedPrice, form]);

  // Render service-specific fields
  const renderServiceSpecificFields = () => {
    switch (serviceType) {
      case 'home-cleaning':
        return <HomeDetailsSection form={form} />;
      case 'deep-cleaning':
        return <EnhancedDeepCleaningFields form={form} />;
      case 'move-in-out':
        return <MoveInOutFields form={form} />;
      case 'post-construction':
        return <PostConstructionFields form={form} />;
      default:
        return null;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Service Type */}
            <FormFieldGroup title="Service Type" description="Choose the type of cleaning service you need">
              <StandardizedFormField
                form={form}
                name="serviceType"
                type="select"
                label="Service Type"
                options={serviceTypeOptions}
                required
              />
            </FormFieldGroup>

            {/* Service Configuration */}
            <FormFieldGroup title="Service Configuration" columns={2}>
              <StandardizedFormField
                form={form}
                name="hours"
                type="number"
                label="Duration (hours)"
                placeholder="Enter hours"
                validation={{ min: 1, max: config.maxHours }}
                required
              />
              <StandardizedFormField
                form={form}
                name="frequency"
                type="select"
                label="Frequency"
                options={frequencyOptions}
                required
              />
            </FormFieldGroup>

            {/* Service-Specific Fields */}
            {renderServiceSpecificFields()}

            {/* Extra Services */}
            <FormSection title="Extra Services" description="Add additional services to your booking">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {extraServicesOptions.map((service) => (
                  <div
                    key={service.value}
                    className={cn(
                      "flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all",
                      selectedExtras.includes(service.value)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => {
                      setSelectedExtras(prev =>
                        prev.includes(service.value)
                          ? prev.filter(e => e !== service.value)
                          : [...prev, service.value]
                      );
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedExtras.includes(service.value)}
                      onChange={() => {}}
                      className="h-4 w-4 text-primary"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{service.label}</div>
                      <div className="text-sm text-muted-foreground">
                        +${service.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FormSection>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Property Type */}
            <FormFieldGroup title="Property Details" columns={2}>
              <StandardizedFormField
                form={form}
                name="propertyType"
                type="select"
                label="Property Type"
                options={propertyTypeOptions}
                required
              />
              <StandardizedFormField
                form={form}
                name="propertySize"
                type="number"
                label="Size (sq ft)"
                placeholder="Enter square footage"
                validation={{ min: 100, max: 10000 }}
                required
              />
            </FormFieldGroup>

            {/* Room Details */}
            <FormFieldGroup title="Room Details" columns={3}>
              <StandardizedFormField
                form={form}
                name="bedrooms"
                type="number"
                label="Bedrooms"
                validation={{ min: 0, max: 10 }}
                required
              />
              <StandardizedFormField
                form={form}
                name="bathrooms"
                type="number"
                label="Bathrooms"
                validation={{ min: 0, max: 10 }}
                required
              />
              <StandardizedFormField
                form={form}
                name="dirtinessLevel"
                type="select"
                label="Dirtiness Level"
                options={dirtinessLevelOptions}
                required
              />
            </FormFieldGroup>

            {/* Cleaning Preferences */}
            <FormFieldGroup title="Cleaning Preferences" columns={2}>
              <StandardizedFormField
                form={form}
                name="cleaningPace"
                type="select"
                label="Cleaning Pace"
                options={cleaningPaceOptions}
                required
              />
              <StandardizedFormField
                form={form}
                name="suppliesProvided"
                type="checkbox"
                label="I will provide cleaning supplies"
              />
            </FormFieldGroup>

            {/* Special Instructions */}
            <StandardizedFormField
              form={form}
              name="specialInstructions"
              type="textarea"
              label="Special Instructions"
              placeholder="Any specific requirements or areas of focus..."
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Location Details */}
            <FormFieldGroup title="Location Details" columns={2}>
              <StandardizedFormField
                form={form}
                name="postalCode"
                type="text"
                label="Postal Code"
                placeholder="Enter postal code"
                required
              />
              <StandardizedFormField
                form={form}
                name="city"
                type="text"
                label="City"
                placeholder="Enter city"
                required
              />
            </FormFieldGroup>

            <StandardizedFormField
              form={form}
              name="address"
              type="text"
              label="Address"
              placeholder="Enter full address"
              required
            />

            <StandardizedFormField
              form={form}
              name="accessMethod"
              type="select"
              label="Access Method"
              options={[
                { value: 'key', label: 'I will provide a key' },
                { value: 'keypad', label: 'Keypad code' },
                { value: 'doorman', label: 'Doorman/Reception' },
                { value: 'meet', label: 'I will meet the cleaner' }
              ]}
              required
            />

            {/* Scheduling */}
            <FormSection title="Schedule Your Service" description="Choose your preferred date and time">
              <StandardizedFormField
                form={form}
                name="selectedDate"
                type="calendar"
                label="Select Date & Time"
                showTimeSlots={true}
                required
              />
            </FormSection>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {/* Contact Information */}
            <FormFieldGroup title="Contact Information" columns={2}>
              <StandardizedFormField
                form={form}
                name="firstName"
                type="text"
                label="First Name"
                placeholder="Enter first name"
                required
              />
              <StandardizedFormField
                form={form}
                name="lastName"
                type="text"
                label="Last Name"
                placeholder="Enter last name"
                required
              />
            </FormFieldGroup>

            <FormFieldGroup title="Contact Details" columns={2}>
              <StandardizedFormField
                form={form}
                name="email"
                type="email"
                label="Email Address"
                placeholder="Enter email address"
                required
              />
              <StandardizedFormField
                form={form}
                name="phone"
                type="tel"
                label="Phone Number"
                placeholder="Enter phone number"
                required
              />
            </FormFieldGroup>

            {/* Insurance */}
            <StandardizedFormField
              form={form}
              name="insurance"
              type="checkbox"
              label="I understand that the service includes insurance coverage"
            />

            {/* Booking Summary */}
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ServiceIcon className="h-5 w-5" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Service:</span>
                    <div className="font-medium">{config.title}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <div className="font-medium">{form.watch('hours')} hours</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date:</span>
                    <div className="font-medium">
                      {form.watch('selectedDate')?.toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Time:</span>
                    <div className="font-medium">{form.watch('timeSlot')}</div>
                  </div>
                </div>
                
                {selectedExtras.length > 0 && (
                  <div>
                    <span className="text-muted-foreground text-sm">Extra Services:</span>
                    <div className="mt-1 space-y-1">
                      {selectedExtras.map(extra => {
                        const service = extraServicesOptions.find(s => s.value === extra);
                        return (
                          <div key={extra} className="flex justify-between text-sm">
                            <span>{service?.label}</span>
                            <span>+${service?.price}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <Separator />
                
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total Estimated Price:</span>
                  <span className="text-primary">${estimatedPrice}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <StandardizedFormLayout
      form={form}
      title={config.title}
      description={config.description}
      steps={steps}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onSubmit={onSubmit}
      onBack={onBack}
      onNext={onNext}
      submitButtonText="Complete Booking"
      backButtonText="Previous Step"
      nextButtonText="Next Step"
      showProgress={true}
      showCard={true}
      className={className}
      isLoading={isLoading}
      isValid={true}
    >
      {renderStepContent()}
    </StandardizedFormLayout>
  );
};

export default UnifiedBookingForm;
