import React from 'react';
import { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import ServiceOptions from '../components/booking/ServiceOptions';
import ProgressBar from '../components/booking/ProgressBar';
import BookingSummary from '../components/booking/BookingSummary';
import Calendar from '../components/booking/Calendar';
import Extras from '../components/booking/Extras';
import DeepCleaningStep from '../components/booking/DeepCleaningStep';
import HoursSelection from '../components/booking/HoursSelection';
import TimeCalculator from '../components/booking/TimeCalculator';
import FinalStep from '../components/booking/FinalStep';
import { bookingSchema, type BookingFormData } from '../schemas/booking';
import { AnimatePresence, motion } from 'framer-motion';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: undefined,
      postalCode: '',
      frequency: 'onetime',
      hours: 2,
      bedrooms: 1,
      bathrooms: 1,
      extras: [],
      date: undefined,
    }
  });

  const { handleSubmit, watch, setValue, formState: { errors } } = form;
  const selectedService = watch('service');
  const frequency = watch('frequency');
  const hours = watch('hours');
  const date = watch('date');
  const bedrooms = watch('bedrooms');
  const bathrooms = watch('bathrooms');
  const selectedExtras = watch('extras') || [];

  const calculateRecommendedTime = () => {
    const baseTime = 2;
    const bedroomTime = bedrooms * 0.5;
    const bathroomTime = bathrooms * 0.5;
    return Math.max(2, Math.ceil(baseTime + bedroomTime + bathroomTime));
  };

  const handleNextStep = handleSubmit(() => {
    if (currentStep === 1) {
      if (!selectedService) {
        toast.error("Please select a service type");
        return;
      }
      if (selectedService !== 'regular' && selectedService !== 'deep') {
        toast.error("This service is currently not available");
        return;
      }
    }
    
    if (Object.keys(errors).length > 0) {
      toast.error("Please fill in all required fields correctly");
      return;
    }
    
    setCurrentStep(prev => prev + 1);
  });

  const handleBackStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const calculatePrice = (basePrice: number) => {
    let price = basePrice;
    if (frequency === 'weekly') {
      price *= 0.8;
    } else if (frequency === 'biweekly') {
      price *= 0.9;
    }
    return price;
  };

  const currentPrice = calculatePrice(frequency === 'weekly' ? 29 : frequency === 'biweekly' ? 32 : 34);

  // Save progress to localStorage
  React.useEffect(() => {
    const formData = form.getValues();
    localStorage.setItem('bookingProgress', JSON.stringify({
      step: currentStep,
      formData: {
        ...formData,
        date: formData.date?.toISOString(),
      }
    }));
  }, [currentStep, form.getValues()]);

  // Load progress from localStorage with proper type checking
  React.useEffect(() => {
    const savedProgress = localStorage.getItem('bookingProgress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress) as {
          step: number;
          formData: Partial<BookingFormData> & { date?: string };
        };
        
        if (parsed.formData) {
          Object.entries(parsed.formData).forEach(([key, value]) => {
            if (key === 'date' && typeof value === 'string') {
              setValue(key as keyof BookingFormData, new Date(value));
            } else if (value !== undefined) {
              setValue(key as keyof BookingFormData, value as any);
            }
          });
        }
        
        if (typeof parsed.step === 'number') {
          setCurrentStep(parsed.step);
        }
      } catch (error) {
        console.error('Error loading saved progress:', error);
        localStorage.removeItem('bookingProgress');
      }
    }
  }, [setValue]);

  return (
    <div className="min-h-screen font-raleway bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <AnimatePresence mode="wait">
        {currentStep === 1 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Hero 
              selectedService={selectedService || ''}
              setSelectedService={(service) => setValue('service', service)}
              postalCode={watch('postalCode')}
              setPostalCode={(code) => setValue('postalCode', code)}
              handleNextStep={handleNextStep}
            />
            <Services />
            <WhyChooseUs />
            <Testimonials />
          </motion.div>
        ) : (
          <motion.div
            className="pt-32 pb-20 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto">
              <ProgressBar currentStep={currentStep} />
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-[70%]">
                  {currentStep === 2 && selectedService === 'regular' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      <ServiceOptions 
                        frequency={frequency} 
                        setFrequency={(freq) => setValue('frequency', freq)} 
                      />
                      <TimeCalculator 
                        bedrooms={bedrooms}
                        setBedrooms={(val) => setValue('bedrooms', val)}
                        bathrooms={bathrooms}
                        setBathrooms={(val) => setValue('bathrooms', val)}
                      />
                      <HoursSelection 
                        hours={hours}
                        setHours={(val) => setValue('hours', val)}
                        recommendedTime={calculateRecommendedTime()}
                      />
                      <Calendar 
                        date={date}
                        setDate={(date) => setValue('date', date)}
                      />
                      <Extras
                        selectedExtras={selectedExtras}
                        setSelectedExtras={(extras) => setValue('extras', extras)}
                      />
                    </motion.div>
                  )}
                  {currentStep === 2 && selectedService === 'deep' && (
                    <DeepCleaningStep
                      date={date}
                      setDate={(date) => setValue('date', date)}
                      hours={hours}
                      setHours={(val) => setValue('hours', val)}
                    />
                  )}
                  {currentStep === 3 && <FinalStep />}
                </div>
                <div className="w-full md:w-[30%]">
                  <div className="md:sticky md:top-8">
                    <BookingSummary 
                      selectedService={selectedService}
                      frequency={frequency}
                      hours={hours}
                      currentPrice={currentPrice}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button 
                  onClick={handleBackStep}
                  variant="outline"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                {currentStep < 3 && (
                  <Button 
                    onClick={handleNextStep}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Index;
