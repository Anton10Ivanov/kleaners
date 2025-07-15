import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OfficeCleaningSchema, type OfficeBookingForm } from '@/schemas/bookingSchemas';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Building2, Users, Calendar, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useEnhancedBookingSubmission } from '@/hooks/useEnhancedBookingSubmission';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const OfficeCleaningBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { submitBooking } = useEnhancedBookingSubmission();
  const navigate = useNavigate();
  
  const form = useForm<OfficeBookingForm>({
    resolver: zodResolver(OfficeCleaningSchema),
    defaultValues: {
      serviceType: "office",
      squareMeters: 100,
      numEmployees: 10,
      avgVisitorsPerWeek: 5,
      cleaningDuringWorkHours: false,
      securityClearanceRequired: false,
      extras: [],
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

  const handleSubmit = async (data: OfficeBookingForm) => {
    await submitBooking(data);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 pb-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Enhanced Office Cleaning Booking
          </h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Step {currentStep} of 3</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {currentStep === 1 && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Office Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="squareMeters">Square Meters</Label>
                    <Input
                      id="squareMeters"
                      type="number"
                      min={10}
                      {...form.register('squareMeters', { valueAsNumber: true })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="numEmployees">Number of Employees</Label>
                    <Input
                      id="numEmployees"
                      type="number"
                      min={1}
                      {...form.register('numEmployees', { valueAsNumber: true })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="avgVisitorsPerWeek">Average Visitors per Week</Label>
                    <Input
                      id="avgVisitorsPerWeek"
                      type="number"
                      min={0}
                      {...form.register('avgVisitorsPerWeek', { valueAsNumber: true })}
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="cleaningDuringWorkHours"
                        {...form.register('cleaningDuringWorkHours')}
                      />
                      <Label htmlFor="cleaningDuringWorkHours">
                        Allow cleaning during work hours
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="securityClearanceRequired"
                        {...form.register('securityClearanceRequired')}
                      />
                      <Label htmlFor="securityClearanceRequired">
                        Security clearance required
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Schedule & Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="selectedDate">Date</Label>
                    <Input
                      id="selectedDate"
                      type="date"
                      {...form.register('selectedDate', { valueAsDate: true })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="selectedTime">Time</Label>
                    <select
                      id="selectedTime"
                      {...form.register('selectedTime')}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value="">Select time</option>
                      <option value="06:00">6:00 AM</option>
                      <option value="07:00">7:00 AM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="19:00">7:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" {...form.register('firstName')} />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" {...form.register('lastName')} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...form.register('email')} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" {...form.register('phone')} />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" {...form.register('address')} />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" {...form.register('city')} />
                  </div>
                </div>
              </div>
            )}

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

export default OfficeCleaningBooking;