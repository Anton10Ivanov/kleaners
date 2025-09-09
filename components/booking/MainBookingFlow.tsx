'use client'

import React, { useState } from 'react';
import { ServiceSelectionModal } from './1ServiceSelectionModal';
import { PropertyDetailsForm } from './1PropertyDetailsForm';
import { EstimateCalculator } from './1EstimateCalculator';
import { PackageSelector } from './1PackageSelector';
import { OfficeCleaningForm } from './OfficeCleaningForm';
import { FrequencySelectionModal } from './FrequencySelectionModal';
import { SchedulingCalendar } from './SchedulingCalendar';
import { 
  ServiceType, 
  CleaningFrequency, 
  RegularityPackage, 
  EnhancedBookingFlowState,
  OneTimeCleaningData,
  Estimate,
  BookingSchedule
} from '@/types/bookingFlow';
import { Button } from '@/components/ui/button';

export const MainBookingFlow: React.FC = () => {
  const [bookingState, setBookingState] = useState<EnhancedBookingFlowState>({
    currentStep: 0,
    serviceType: null,
    cleaningFrequency: null,
    formData: {},
    estimate: null,
    schedule: null,
    isSubmitting: false,
    errors: {}
  });

  const steps = [
    { id: 0, title: 'Service Selection', description: 'Choose your cleaning service' },
    { id: 1, title: 'Frequency Selection', description: 'Choose cleaning frequency' },
    { id: 2, title: 'Property Details', description: 'Tell us about your property' },
    { id: 3, title: 'Estimate', description: 'Get your cleaning estimate' },
    { id: 4, title: 'Package', description: 'Select your package (if regular)' },
    { id: 5, title: 'Schedule', description: 'Choose date and time' },
    { id: 6, title: 'Payment', description: 'Complete your booking' }
  ];

  const updateBookingState = (updates: Partial<EnhancedBookingFlowState>) => {
    setBookingState(prev => ({ ...prev, ...updates }));
  };

  const handleServiceSelect = (selectedServiceType: ServiceType) => {
    updateBookingState({ 
      serviceType: selectedServiceType, 
      currentStep: 1 
    });
  };

  const handleFrequencySelect = (frequency: CleaningFrequency) => {
    updateBookingState({ 
      cleaningFrequency: frequency,
      frequency: frequency,
      currentStep: 2 
    });
  };

  const handlePropertyDetailsNext = (data: any) => {
    updateBookingState({ 
      formData: data,
      currentStep: 3 
    });
  };

  const handleEstimateNext = (estimateData: Estimate) => {
    updateBookingState({ 
      estimate: estimateData,
      currentStep: bookingState.cleaningFrequency === CleaningFrequency.REGULAR ? 4 : 5
    });
  };

  const handlePackageSelect = (packageType: RegularityPackage) => {
    updateBookingState({ 
      selectedPackage: packageType,
      currentStep: 5 
    });
  };

  const handleScheduleSelect = (schedule: BookingSchedule) => {
    updateBookingState({ 
      schedule,
      currentStep: 6 
    });
  };

  const renderCurrentStep = () => {
    switch (bookingState.currentStep) {
      case 0:
        return (
          <ServiceSelectionModal
            isOpen={true}
            onClose={() => updateBookingState({ currentStep: 0 })}
            onServiceSelect={handleServiceSelect}
          />
        );
      case 1:
        return (
          <FrequencySelectionModal
            isOpen={true}
            onClose={() => updateBookingState({ currentStep: 0 })}
            onFrequencySelect={handleFrequencySelect}
            serviceType={bookingState.serviceType === ServiceType.HOME_CLEANING ? 'home' : 'office'}
          />
        );
      case 2:
        if (bookingState.serviceType === ServiceType.HOME_CLEANING) {
          return (
            <PropertyDetailsForm
              onNext={handlePropertyDetailsNext}
              onBack={() => updateBookingState({ currentStep: 1 })}
              isRegularCleaning={bookingState.cleaningFrequency === CleaningFrequency.REGULAR}
            />
          );
        } else if (bookingState.serviceType === ServiceType.OFFICE_CLEANING) {
          return (
            <OfficeCleaningForm
              onNext={handlePropertyDetailsNext}
              onBack={() => updateBookingState({ currentStep: 1 })}
            />
          );
        }
        return <div>Invalid service type</div>;
      case 3:
        // Calculate estimate based on service type and data
        if (bookingState.serviceType === ServiceType.HOME_CLEANING) {
          return (
            <EstimateCalculator
              propertyData={bookingState.formData as OneTimeCleaningData}
              onApplyRecommendation={handleEstimateNext}
              onChooseCustom={handleEstimateNext}
              onBack={() => updateBookingState({ currentStep: 2 })}
            />
          );
        } else {
          // For office cleaning, use a default estimate
          return (
            <EstimateCalculator
              propertyData={bookingState.formData as OneTimeCleaningData}
              onApplyRecommendation={handleEstimateNext}
              onChooseCustom={handleEstimateNext}
              onBack={() => updateBookingState({ currentStep: 2 })}
            />
          );
        }
      case 4:
        return (
          <PackageSelector
            onPackageSelect={handlePackageSelect}
            onBack={() => updateBookingState({ currentStep: 3 })}
            {...(bookingState.selectedPackage && { selectedPackage: bookingState.selectedPackage })}
          />
        );
      case 5:
        return (
          <SchedulingCalendar
            onScheduleSelect={handleScheduleSelect}
            onBack={() => updateBookingState({ 
              currentStep: bookingState.cleaningFrequency === CleaningFrequency.REGULAR ? 4 : 3 
            })}
            estimate={bookingState.estimate!}
            serviceType={bookingState.serviceType === ServiceType.HOME_CLEANING ? 'home' : 'office'}
          />
        );
      case 6:
        return (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Redirecting to Payment</h2>
            <p className="text-muted-foreground">
              You will be redirected to Stripe Checkout to complete your booking.
            </p>
            <div className="mt-4">
              <Button onClick={() => updateBookingState({ currentStep: 5 })}>
                Back to Schedule
              </Button>
            </div>
          </div>
        );
      default:
        return <div>Step {bookingState.currentStep} - Coming soon</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  bookingState.currentStep >= step.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.id + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    bookingState.currentStep > step.id ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        {renderCurrentStep()}
      </div>
    </div>
  );
};
