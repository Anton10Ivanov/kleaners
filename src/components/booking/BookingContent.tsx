
import { Fragment } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { BookingFormData, ServiceType } from "@/schemas/booking";
import RegularStep from "./regular/RegularStep";
import DeepCleaningStep from "./deepCleaning/DeepCleaningStep";
import MoveInOutStep from "./moveInOut/MoveInOutStep";
import BusinessStep from "./business/BusinessStep";
import CustomerDetailsStep from "./CustomerDetailsStep";
import CheckoutStep from "./CheckoutStep";

interface BookingContentProps {
  currentStep: number;
  selectedService: string;
  form: UseFormReturn<BookingFormData>;
}

const BookingContent = ({ currentStep, selectedService, form }: BookingContentProps) => {
  // Helper to render the right component based on step and service
  const renderStepContent = () => {
    if (currentStep === 2) {
      switch (selectedService) {
        case ServiceType.Regular:
          return <RegularStep form={form} />;
        case ServiceType.Deep:
          return <DeepCleaningStep form={form} />;
        case ServiceType.MoveInOut:
          return <MoveInOutStep form={form} />;
        case ServiceType.Business:
          return <BusinessStep form={form} />;
        default:
          return <div className="text-subtext dark:text-gray-400">Please select a service type</div>;
      }
    } else if (currentStep === 3) {
      return <CustomerDetailsStep form={form} />;
    } else if (currentStep === 4) {
      return <CheckoutStep form={form} />;
    }
    
    return null;
  };

  return (
    <form className="w-full md:w-[75%] space-y-6 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left text-gray-900 dark:text-white">
          {currentStep === 2 
            ? "Service Details" 
            : currentStep === 3 
              ? "Your Details" 
              : "Payment"}
        </h2>
        
        {renderStepContent()}
      </div>
    </form>
  );
};

export default BookingContent;
