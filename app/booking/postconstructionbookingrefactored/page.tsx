'use client'

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostConstructionSchema, type PostConstructionBookingForm } from '@/schemas/bookingSchemas';
import { useBookingSubmission } from '@/hooks/useBookingSubmission';
import { useNavigate } from 'react-router-dom';
import { enhancedFormPersistence, FormAutoSave } from '@/utils/enhancedFormPersistence';
import { StandardizedBookingForm, BookingFormData } from '@/components/forms/StandardizedBookingForm';
import { motion } from 'framer-motion';

const PostConstructionBookingRefactored = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { submitBooking } = useBookingSubmission();
  const navigate = useRouter();
  const [autoSave, setAutoSave] = useState<FormAutoSave | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<BookingFormData>({
    resolver: zodResolver(PostConstructionSchema),
    defaultValues: {
      // Service details
      serviceType: "post-construction",
      serviceCategory: "commercial",
      hours: 8,
      frequency: 'one-time',
      
      // Property details
      propertySize: 200,
      bedrooms: 0,
      bathrooms: 1,
      propertyType: 'commercial',
      cleaningPace: 'thorough',
      dirtinessLevel: 5,
      
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
      estimatedPrice: 200,
      finalPrice: 200,
      
      ...enhancedFormPersistence.load('post-construction'), // Load persisted data
    },
  });

  // Enhanced form persistence
  useEffect(() => {
    const autoSaveInstance = enhancedFormPersistence.createAutoSave(
      form,
      'post-construction',
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
      const convertedData: PostConstructionBookingForm = {
        serviceType: data.serviceType as any,
        propertySize: data.propertySize,
        constructionType: data.extras.includes('renovation') ? 'renovation' : 'new-construction',
        includeDustRemoval: data.extras.includes('dust'),
        includePaintCleanup: data.extras.includes('paint'),
        includeDebrisRemoval: data.extras.includes('debris'),
        includeFloorCleaning: data.extras.includes('floors'),
        includeWindowCleaning: data.extras.includes('windows'),
        specialRequirements: data.specialInstructions,
        postalCode: data.postalCode,
        selectedDate: data.selectedDate,
        selectedTime: data.selectedTime,
        address: data.address,
        city: data.city,
        accessMethod: data.accessMethod,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      };
      
      await submitBooking(convertedData);
    } catch (error) {
      console.error('Booking submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 pt-20 pb-24">
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
            serviceType="post-construction"
            serviceCategory="commercial"
            isLoading={isLoading}
            className="max-w-4xl mx-auto"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PostConstructionBookingRefactored;
