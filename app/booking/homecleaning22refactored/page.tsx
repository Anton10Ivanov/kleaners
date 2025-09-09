'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Clock, 
  Euro, 
  CheckCircle, 
  ChevronRight, 
  Star, 
  Sparkles, 
  Heart, 
  Zap,
  ArrowLeft,
  ArrowRight,
  Check,
  Minus,
  Plus
} from 'lucide-react';

// Import types and utilities
import { 
  FlowType22, 
  Step22, 
  Frequency22, 
  ClutterLevel22, 
  Package22, 
  FlexibilityType22,
  BookingData22 
} from '../types/HomeCleaning22Types';
import { CLUTTER_LEVELS, PACKAGES, FREQUENCY_OPTIONS, FLEXIBILITY_OPTIONS } from '../constants/homecleaning22constants/page';

// Import step components
import { ServiceSelectionStep } from '../components/homecleaning22/serviceselectionstep/page';
import { PropertyDetailsStep } from '../components/homecleaning22/propertydetailsstep/page';

const HomeCleaning22Refactored: React.FC = () => {
  const [currentStep22, setCurrentStep22] = useState<Step22>(0);
  const [bookingData22, setBookingData22] = useState<BookingData22>({
    flowType: null,
    propertySize: 0,
    clutterLevel: null,
    hours: 0,
    frequency: null,
    package: null,
    flexibilityType: null,
    preferredDay: '',
    preferredTime: '',
    selectedDate: null,
    customerInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      accessMethod: '',
      specialInstructions: ''
    }
  });

  const updateBookingData22 = (updates: Partial<BookingData22>) => {
    setBookingData22(prev => ({ ...prev, ...updates }));
  };

  // Handle automatic hours calculation when property size or clutter changes
  useEffect(() => {
    if (bookingData22.flowType === 'one-time' && bookingData22.clutterLevel) {
      const recommendedHours = calculateRecommendedHours22(bookingData22.propertySize, bookingData22.clutterLevel);
      updateBookingData22({ hours: recommendedHours });
    }
  }, [bookingData22.propertySize, bookingData22.clutterLevel, bookingData22.flowType]);

  const nextStep22 = () => {
    setCurrentStep22(prev => prev + 1 as Step22);
  };

  const prevStep22 = () => {
    setCurrentStep22(prev => Math.max(0, prev - 1) as Step22);
  };

  // Calculate current price
  const currentPrice = calculatePrice22(
    bookingData22.hours, 
    bookingData22.frequency, 
    bookingData22.flexibilityType
  );

  const finalPrice = calculateFinalPrice(currentPrice, bookingData22.package);

  // Step 0: Service Selection
  const renderStep0 = () => (
    <ServiceSelectionStep onFlowTypeSelect={(flowType) => {
      updateBookingData22({ flowType });
      nextStep22();
    }} />
  );

  // Step 1: Property Details (for both flows)
  const renderPropertyDetails = () => (
    <PropertyDetailsStep
      bookingData={bookingData22}
      onUpdate={updateBookingData22}
      onNext={nextStep22}
      onBack={prevStep22}
    />
  );

  // One-time flow steps
  const renderOneTimeEstimate = () => (
    <div className="max-w-4xl mx-auto px-4 section-spacing-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-heading-color mb-4">
          Your Cleaning Estimate
        </h2>
        <p className="text-muted-foreground">
          Based on your property size and clutter level
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {bookingData22.propertySize} m²
              </div>
              <div className="text-sm text-muted-foreground">Property Size</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {bookingData22.hours} hours
              </div>
              <div className="text-sm text-muted-foreground">Estimated Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                €{finalPrice}
              </div>
              <div className="text-sm text-muted-foreground">Total Price</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep22}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={nextStep22} className="bg-primary hover:bg-primary/90">
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderTimeAdjustment = () => (
    <div className="max-w-4xl mx-auto px-4 section-spacing-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-heading-color mb-4">
          Adjust Cleaning Time
        </h2>
        <p className="text-muted-foreground">
          Fine-tune the estimated cleaning time based on your specific needs
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateBookingData22({ hours: Math.max(1, bookingData22.hours - 0.5) })}
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {bookingData22.hours} hours
              </div>
              <div className="text-sm text-muted-foreground">Cleaning Time</div>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateBookingData22({ hours: bookingData22.hours + 0.5 })}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <Separator className="my-6" />
          
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-2">
              €{finalPrice}
            </div>
            <div className="text-sm text-muted-foreground">Total Price</div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep22}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={nextStep22} className="bg-primary hover:bg-primary/90">
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderFinalDetails = () => (
    <div className="max-w-4xl mx-auto px-4 section-spacing-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-heading-color mb-4">
          Final Details
        </h2>
        <p className="text-muted-foreground">
          Complete your booking with contact and scheduling information
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Service Type:</span>
              <span className="font-medium">One-time Cleaning</span>
            </div>
            <div className="flex justify-between">
              <span>Property Size:</span>
              <span className="font-medium">{bookingData22.propertySize} m²</span>
            </div>
            <div className="flex justify-between">
              <span>Cleaning Time:</span>
              <span className="font-medium">{bookingData22.hours} hours</span>
            </div>
            <div className="flex justify-between">
              <span>Clutter Level:</span>
              <span className="font-medium">
                {bookingData22.clutterLevel ? CLUTTER_LEVELS.find(c => c.level === bookingData22.clutterLevel)?.label : 'N/A'}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total Price:</span>
              <span>€{finalPrice}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep22}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button className="bg-primary hover:bg-primary/90">
          Complete Booking
          <Check className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    if (currentStep22 === 0) return renderStep0();
    
    if (bookingData22.flowType === 'one-time') {
      switch (currentStep22) {
        case 1: return renderPropertyDetails();
        case 2: return renderOneTimeEstimate();
        case 3: return renderTimeAdjustment();
        case 4: return renderFinalDetails();
        default: return renderStep0();
      }
    } else {
      // Recurring flow steps would go here
      switch (currentStep22) {
        case 1: return renderPropertyDetails();
        default: return renderStep0();
      }
    }
  };

  return (
    <div className="min-h-screen bg-background section-spacing-md px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Home Cleaning 22</h1>
          <p className="text-muted-foreground mt-2">
            Professional cleaning services tailored to your needs
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[0, 1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep22 >= step
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step + 1}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep22 > step ? 'bg-primary' : 'bg-gray-200'
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

export default HomeCleaning22Refactored;
