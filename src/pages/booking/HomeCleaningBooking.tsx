import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HomeCleaningSchema, type HomeBookingForm } from '@/schemas/bookingSchemas';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useEnhancedBookingSubmission } from '@/hooks/useEnhancedBookingSubmission';
import { useNavigate } from 'react-router-dom';
import { EnhancedHomeDetailsSection } from '@/components/booking/EnhancedHomeDetailsSection';

const HomeCleaningBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { submitBooking } = useEnhancedBookingSubmission();
  const navigate = useNavigate();
  
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
    },
  });

  const frequency = form.watch('frequency');
  const showCalendar = frequency && frequency !== 'custom';

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 pb-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Enhanced Home Cleaning Booking
          </h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Step {currentStep} of 3</span>
            <div className="flex space-x-1">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full ${
                    step <= currentStep ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {/* Step 1: Service Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <EnhancedHomeDetailsSection 
                  form={form} 
                  onSuggestedTimeSelect={handleSuggestedTimeSelect}
                />
              </div>
            )}

            {/* Step 2: Calendar and Extras */}
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
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Time</label>
                      <select
                        {...form.register('selectedTime')}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="">Select time</option>
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
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border">
                  <h3 className="text-lg font-semibold mb-4">Extras</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['ironing', 'fridge', 'oven', 'cabinets', 'balcony', 'carpet'].map((extra) => (
                      <label key={extra} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={extra}
                          {...form.register('extras')}
                          className="rounded"
                        />
                        <span className="capitalize">{extra}</span>
                      </label>
                    ))}
                  </div>
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
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        {...form.register('lastName')}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        {...form.register('email')}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        {...form.register('phone')}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Postal Code</label>
                      <input
                        type="text"
                        {...form.register('postalCode')}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <input
                        type="text"
                        {...form.register('address')}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      <input
                        type="text"
                        {...form.register('city')}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Access Method</label>
                      <select
                        {...form.register('accessMethod')}
                        className="w-full p-2 border rounded-lg"
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
                        className="w-full p-2 border rounded-lg"
                        placeholder="Any special instructions for the cleaner..."
                      />
                    </div>
                  </div>
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
              
              {currentStep < 3 ? (
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
      </div>
    </div>
  );
};

export default HomeCleaningBooking;