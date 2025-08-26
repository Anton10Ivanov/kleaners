import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HomeCleaningSchema, type HomeBookingForm } from '@/schemas/bookingSchemas';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Package } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useEnhancedBookingSubmission } from '@/hooks/useEnhancedBookingSubmission';
import { useNavigate } from 'react-router-dom';
import { EnhancedHomeDetailsSection } from '@/components/booking/EnhancedHomeDetailsSection';
import { AutoProgressiveWrapper } from '@/components/booking/shared/AutoProgressiveWrapper';
import { EnhancedProgressIndicator } from '@/components/booking/shared/EnhancedProgressIndicator';
import { SummaryPill } from '@/components/booking/summary/SummaryPill';
import FlatExtrasSelector from '@/components/booking/FlatExtrasSelector';
import { RealTimePricing } from '@/components/booking/RealTimePricing';
import { ModifyAndSaveSection } from '@/components/booking/shared/ModifyAndSaveSection';
import { ServiceType } from '@/schemas/booking';
import { enhancedFormPersistence, FormAutoSave } from '@/utils/enhancedFormPersistence';

const HomeCleaningBooking2 = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { submitBooking } = useEnhancedBookingSubmission();
  const navigate = useNavigate();
  const [autoSave, setAutoSave] = useState<FormAutoSave | null>(null);
  
  const form = useForm<HomeBookingForm>({
    resolver: zodResolver(HomeCleaningSchema),
    defaultValues: {
      serviceType: "home",
      hours: 2,
      propertySize: 70,
      cleaningPace: 'standard',
      extras: [],
      frequency: 'one-time',
      bedrooms: 2,
      bathrooms: 1,
      dirtinessLevel: 3,
      pets: 'none',
      lastCleaned: '',
      suppliesProvided: false,
      cleaningSolventsProvided: true,
      vacuumCleanerProvided: true,
      microfiberClothsProvided: true,
      insurance: true,
      postalCode: '',
      address: '',
      city: '',
      accessMethod: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      selectedDate: new Date(),
      selectedTime: '',
      ...enhancedFormPersistence.load('home2'), // Load persisted data for home2
    },
  });

  // Enhanced form persistence
  useEffect(() => {
    const autoSaveInstance = new FormAutoSave(
      () => form.getValues(),
      'home2', // Different key for home2
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

  const frequency = form.watch('frequency');
  const showCalendar = frequency && frequency !== 'custom';

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

  const handleSubmit = async (data: HomeBookingForm) => {
    await submitBooking(data);
  };

  const handleSuggestedTimeSelect = (hours: number) => {
    form.setValue('hours', hours);
  };

  // Completion checks for auto-progression
  const checkStep1Completion = (values: HomeBookingForm) => {
    return !!(values.propertySize && values.bedrooms && values.bathrooms && values.frequency && values.lastCleaned);
  };

  const checkStep2Completion = (values: HomeBookingForm) => {
    return !!(values.selectedDate && values.selectedTime);
  };

  const checkStep3Completion = (values: HomeBookingForm) => {
    return !!(values.firstName && values.lastName && values.email && values.phone && values.postalCode && values.address && values.city);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 pb-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Home Cleaning Booking (Premium)
          </h1>
          
          {/* Enhanced Progress Indicator */}
          <EnhancedProgressIndicator 
            currentStep={currentStep} 
            totalSteps={4}
            stepLabels={['Home Details', 'Schedule & Extras', 'Contact Info', 'Review & Payment']}
          />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {/* Step 1: Service Details with Auto-Progression */}
            {currentStep === 1 && (
              <AutoProgressiveWrapper
                form={form}
                currentStep={currentStep}
                onNext={handleNext}
                completionCheck={checkStep1Completion}
              >
                <EnhancedHomeDetailsSection 
                  form={form} 
                  onSuggestedTimeSelect={handleSuggestedTimeSelect}
                />
              </AutoProgressiveWrapper>
            )}

            {/* Step 2: Schedule & Extras */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border">
                  <h3 className="text-lg font-semibold mb-4">Select Date & Time</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Date</label>
                      <input
                        type="date"
                        {...form.register('selectedDate', { valueAsDate: true })}
                        className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Time</label>
                      <select
                        {...form.register('selectedTime')}
                        className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      >
                        <option value="">Select time</option>
                        <option value="not-sure">📝 Not sure yet</option>
                        <option value="08:00">8:00 AM</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                        <option value="17:00">5:00 PM</option>
                      </select>
                    </div>
                    {form.watch('selectedTime') === 'not-sure' && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Preferred Time Details</label>
                        <textarea
                          {...form.register('preferredTimeDetails')}
                          rows={3}
                          className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Here you can write the approx. dates in which you think the cleaning should take place."
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border">
                  <FlatExtrasSelector
                    serviceType={ServiceType.Home}
                    selectedExtras={(form.watch('extras') || []) as any}
                    onExtrasChange={(extras) => form.setValue('extras', extras as any)}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border">
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        {...form.register('firstName')}
                        className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        {...form.register('lastName')}
                        className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        {...form.register('email')}
                        className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        {...form.register('phone')}
                        className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Postal Code</label>
                      <input
                        type="text"
                        {...form.register('postalCode')}
                        className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <input
                        type="text"
                        {...form.register('address')}
                        className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      <input
                        type="text"
                        {...form.register('city')}
                        className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Access Method</label>
                      <select
                        {...form.register('accessMethod')}
                        className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      >
                        <option value="">Select access method</option>
                        <option value="key">Key</option>
                        <option value="doorman">Doorman</option>
                        <option value="code">Entry Code</option>
                        <option value="ring">Ring Bell</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Special Instructions</label>
                      <textarea
                        {...form.register('specialInstructions')}
                        rows={3}
                        className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Any special instructions for the cleaner..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Payment */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <ModifyAndSaveSection form={form} />
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border">
                  <h3 className="text-lg font-semibold mb-4">Review Your Booking</h3>
                  <RealTimePricing form={form} serviceType="home" />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                onClick={handleBack}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {currentStep === 1 ? 'Back to Services' : 'Previous'}
              </Button>
              
              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="flex items-center gap-2"
                >
                  Submit Booking
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
        </Form>
        
        {/* Enhanced Summary Pill */}
        <SummaryPill form={form as any} currentStep={currentStep} />
      </div>
    </div>
  );
};

export default HomeCleaningBooking2;