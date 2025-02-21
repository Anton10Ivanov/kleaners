
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BookingFormData } from "@/schemas/booking";
import PersonalInformation from "./final/PersonalInformation";
import CleaningAddress from "./final/CleaningAddress";
import SpecialInstructions from "./final/SpecialInstructions";
import PromoCode from "./final/PromoCode";
import { UseFormReturn } from "react-hook-form";

interface FinalStepProps {
  postalCode: string;
  onSubmit: (data: BookingFormData) => void;
  form: UseFormReturn<BookingFormData>;
}

const FinalStep = ({ postalCode, onSubmit, form }: FinalStepProps) => {
  const handleSubmit = (data: BookingFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <PersonalInformation form={form} />
        <CleaningAddress form={form} postalCode={postalCode} />
        <SpecialInstructions form={form} />
        <PromoCode form={form} />
        
        {/* Payment section will be implemented with Stripe integration */}
        <div className="flex justify-end">
          <Button type="submit">Continue to payment</Button>
        </div>
      </form>
    </Form>
  );
};

export default FinalStep;
