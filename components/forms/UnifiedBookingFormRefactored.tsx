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
import { getServiceConfig } from './config/ServiceConfig';

// Import step components
import { ServiceConfigurationStep } from './steps/ServiceConfigurationStep';
import { SchedulingStep } from './steps/SchedulingStep';
import { ServiceDetailsStep } from './steps/ServiceDetailsStep';
import { ContactDetailsStep } from './steps/ContactDetailsStep';

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
  
  // Scheduling
  selectedDate: Date | null;
  selectedTime: string;
  cleanerPreference: string;
  
  // Service-specific fields
  extras: string[];
  specialInstructions: string;
  
  // Contact information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  accessMethod: string;
  accessInstructions: string;
  
  // Pricing
  estimatedPrice: number;
  finalPrice: number;
}

interface UnifiedBookingFormProps {
  serviceType: ServiceType;
  onSubmit: (data: UnifiedBookingFormData) => void;
  onBack?: () => void;
  onNext?: () => void;
  currentStep?: number;
  totalSteps?: number;
  className?: string;
  isLoading?: boolean;
}

const serviceTypeOptions = [
  { value: 'home-cleaning', label: 'Home Cleaning' },
  { value: 'deep-cleaning', label: 'Deep Cleaning' },
  { value: 'move-in-out', label: 'Move In/Out' },
  { value: 'post-construction', label: 'Post-Construction' }
];

export const UnifiedBookingFormRefactored: React.FC<UnifiedBookingFormProps> = ({
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
  
  const config = getServiceConfig(serviceType);
  const ServiceIcon = config.icon;

  // Initialize form with service-specific schema
  const form = useForm({
    resolver: zodResolver(config.schema),
    defaultValues: {
      serviceType,
      serviceCategory: 'residential',
      hours: config.defaultHours,
      frequency: 'one-time',
      propertySize: 0,
      bedrooms: 0,
      bathrooms: 0,
      propertyType: 'apartment',
      cleaningPace: 'normal',
      dirtinessLevel: 3,
      selectedDate: null,
      selectedTime: '',
      cleanerPreference: 'any',
      extras: [],
      specialInstructions: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      accessMethod: '',
      accessInstructions: '',
      estimatedPrice: 0,
      finalPrice: 0
    }
  });

  // Calculate estimated price
  const estimatedPrice = React.useMemo(() => {
    const hours = form.watch('hours') || 0;
    const baseRate = 50; // €50/hour
    const extrasPrice = selectedExtras.length * 25; // €25 per extra
    return (hours * baseRate) + extrasPrice;
  }, [form.watch('hours'), selectedExtras]);

  // Update form when extras or price change
  useEffect(() => {
    form.setValue('extras', selectedExtras);
    form.setValue('estimatedPrice', estimatedPrice);
  }, [selectedExtras, estimatedPrice, form]);

  const handleSubmit = (data: any) => {
    const finalData: UnifiedBookingFormData = {
      ...data,
      extras: selectedExtras,
      estimatedPrice,
      finalPrice: estimatedPrice
    };
    onSubmit(finalData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceConfigurationStep
            form={form}
            config={config}
            serviceTypeOptions={serviceTypeOptions}
          />
        );
      case 2:
        return (
          <SchedulingStep
            form={form}
            cleaners={cleaners}
            bookingRules={bookingRules}
          />
        );
      case 3:
        return (
          <ServiceDetailsStep
            form={form}
            serviceType={serviceType}
            selectedExtras={selectedExtras}
            onExtrasChange={setSelectedExtras}
          />
        );
      case 4:
        return (
          <ContactDetailsStep form={form} />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Service Configuration';
      case 2: return 'Scheduling';
      case 3: return 'Service Details';
      case 4: return 'Contact Information';
      default: return 'Booking Form';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return 'Configure your cleaning service';
      case 2: return 'Choose your preferred date and time';
      case 3: return 'Add any additional services or special requirements';
      case 4: return 'Provide your contact and address information';
      default: return 'Complete your booking';
    }
  };

  return (
    <StandardizedFormLayout
      title={getStepTitle()}
      description={getStepDescription()}
      currentStep={currentStep}
      totalSteps={totalSteps}
      className={className}
    >
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Service Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${config.color} text-white`}>
                <ServiceIcon className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl">{config.title}</CardTitle>
                <p className="text-muted-foreground">{config.description}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStepContent()}
        </motion.div>

        {/* Price Summary */}
        {estimatedPrice > 0 && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Estimated Total</h3>
                  <p className="text-sm text-muted-foreground">
                    {form.watch('hours')} hours × €50/hour
                    {selectedExtras.length > 0 && ` + ${selectedExtras.length} extras`}
                  </p>
                </div>
                <div className="text-2xl font-bold text-primary">
                  €{estimatedPrice}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          
          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={onNext}
              className="bg-primary hover:bg-primary/90"
            >
              Next Step
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90"
            >
              {isLoading ? 'Processing...' : 'Complete Booking'}
            </Button>
          )}
        </div>
      </form>
    </StandardizedFormLayout>
  );
};
