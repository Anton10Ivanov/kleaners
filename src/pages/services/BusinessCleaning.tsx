
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import ServiceLayout from "@/components/services/ServiceLayout";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useBookingForm } from "@/hooks/useBookingForm";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import HoursSelection from "@/components/booking/HoursSelection";
import Extras from "@/components/booking/Extras";
import Calendar from "@/components/booking/Calendar";
import FinalStep from "@/components/booking/FinalStep";
import ProgressBar from "@/components/booking/ProgressBar";
import { BookingFormData } from "@/schemas/booking";

const BusinessCleaning = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { form, watch, handleNextStep, handleBackStep } = useBookingForm();
  const postalCode = watch('postalCode') || '';

  const onSubmit = (data: BookingFormData) => {
    console.log('Form submitted:', data);
    toast.success('Booking submitted successfully!');
  };

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleNextStep();
    setCurrentStep(prev => prev + 1);
    if (currentStep === 1) {
      toast.success("Great! Let's schedule your business cleaning.");
    }
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleBackStep();
    setCurrentStep(prev => prev - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Form {...form}>
            <div className="space-y-8">
              <HoursSelection form={form} />
              <Extras form={form} />
              <div className="flex justify-end">
                <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Form>
        );
      case 2:
        return (
          <Form {...form}>
            <div className="space-y-8">
              <Calendar form={form} />
              <div className="flex justify-between">
                <Button onClick={handleBack} variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Form>
        );
      case 3:
        return (
          <div className="space-y-8">
            <FinalStep postalCode={postalCode} onSubmit={onSubmit} />
            <div className="flex justify-start">
              <Button onClick={handleBack} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const features = [
    "Customized cleaning schedules",
    "Professional cleaning staff",
    "Quality assurance program",
    "Green cleaning options",
    "Regular inspections",
    "24/7 support",
    "Flexible contract terms",
    "Insurance coverage"
  ];

  return (
    <ServiceLayout
      title="Business Cleaning Service"
      description="Professional cleaning solutions tailored for your business needs"
    >
      <div className="max-w-4xl mx-auto">
        {currentStep === 1 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
              Why Choose Our Business Cleaning Service?
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </section>
        )}
        
        <ProgressBar currentStep={currentStep} />
        
        <div className="mt-8">
          {renderStepContent()}
        </div>
      </div>
    </ServiceLayout>
  );
};

export default BusinessCleaning;
