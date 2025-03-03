
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BookingFormData } from "@/schemas/booking";
import PersonalInformation from "./final/PersonalInformation";
import CleaningAddress from "./final/CleaningAddress";
import SpecialInstructions from "./final/SpecialInstructions";
import PromoCode from "./final/PromoCode";
import { UseFormReturn } from "react-hook-form";
import { useMediaQuery } from "@/hooks/use-media-query";

interface FinalStepProps {
  postalCode: string;
  onSubmit: (data: BookingFormData) => void;
  form: UseFormReturn<BookingFormData>;
}

const FinalStep = ({ postalCode, onSubmit, form }: FinalStepProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const handleSubmit = (data: BookingFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={`space-y-6 ${isMobile ? 'px-2' : 'space-y-8'}`}>
        <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <PersonalInformation form={form} />
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <CleaningAddress form={form} postalCode={postalCode} />
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <SpecialInstructions form={form} />
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <PromoCode form={form} />
        </div>
        
        {/* Payment section will be implemented with Stripe integration */}
        <div className={`${isMobile ? 'w-full fixed bottom-0 left-0 bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700 z-10' : 'flex justify-end'}`}>
          <Button 
            type="submit" 
            className={isMobile ? "w-full" : ""}
          >
            Continue to payment
          </Button>
        </div>
        
        {/* Add bottom padding on mobile to account for fixed button */}
        {isMobile && <div className="h-16" />}
      </form>
    </Form>
  );
};

export default FinalStep;
