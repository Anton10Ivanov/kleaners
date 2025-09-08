'use client'

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { HomeCleaningSchema, type HomeBookingForm } from '@/schemas/bookingSchemas';
import { useEnhancedBookingSubmission } from '@/hooks/useEnhancedBookingSubmission';
import { useNavigate } from 'react-router-dom';
import { enhancedFormPersistence, FormAutoSave } from '@/utils/enhancedFormPersistence';
import { UnifiedBookingForm } from '@/components/forms/UnifiedBookingForm';
import { motion } from 'framer-motion';

const HomeCleaningBooking2 = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { submitBooking } = useEnhancedBookingSubmission();
  const navigate = useRouter();
  const [autoSave, setAutoSave] = useState<FormAutoSave | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<BookingFormData>({
    resolver: zodResolver(HomeCleaningSchema),
    defaultValues: {
      // Service details
      serviceType: "home-cleaning",
      serviceCategory: "residential",
      hours: 2,
      frequency: 'one-time',
      
      // Property details
      propertySize: 70,
      bedrooms: 2,
      bathrooms: 1,
      propertyType: 'apartment',
      cleaningPace: 'standard',
      dirtinessLevel: 3,
      
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
      insurance: true,
      
      // Pricing
      estimatedPrice: 50,
      finalPrice: 50,
      
      ...enhancedFormPersistence.load('home2'), // Load persisted data for home2
    },
  });

  // Enhanced form persistence
  useEffect(() => {
    const autoSaveInstance = enhancedFormPersistence.createAutoSave(
      form,
      'home2',
      30000 // 30 seconds
    );
    autoSaveInstance.start();
    setAutoSave(autoSaveInstance);

    return () => {
      autoSaveInstance.stop();
    };
  }, [form]);

  // Save on step changes
  useEffect(() => {
    if (autoSave) {
      autoSave.saveNow();
    }
  }, [currentStep, autoSave]);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate('/');
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }
  };

  const handleSubmit = async (data: BookingFormData) => {
    setIsLoading(true);
    try {
      // Convert to the expected format for the existing submission hook
      const convertedData: HomeBookingForm = {
        serviceType: data.serviceType as any,
        hours: data.hours,
        propertySize: data.propertySize,
        cleaningPace: data.cleaningPace as any,
        extras: data.extras,
        frequency: data.frequency as any,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        dirtinessLevel: data.dirtinessLevel,
        pets: 'none', // Default value
        lastCleaned: '', // Default value
        suppliesProvided: data.suppliesProvided,
        cleaningSolventsProvided: true, // Default value
        vacuumCleanerProvided: true, // Default value
        microfiberClothsProvided: true, // Default value
        insurance: data.insurance,
        postalCode: data.postalCode,
        address: data.address,
        city: data.city,
        accessMethod: data.accessMethod,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        selectedDate: data.selectedDate,
        selectedTime: data.selectedTime,
      };
      
      await submitBooking(convertedData);
    } catch (error) {
      console.error('Booking submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pt-20 pb-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StandardizedBookingForm
            form={form}
            onSubmit={handleSubmit}
            onBack={handleBack}
            onNext={handleNext}
            currentStep={currentStep}
            totalSteps={4}
            serviceType="home-cleaning"
            serviceCategory="residential"
            isLoading={isLoading}
            className="max-w-4xl mx-auto"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HomeCleaningBooking2;