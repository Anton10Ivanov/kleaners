
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { BusinessTypeSelector } from "./components/BusinessTypeSelector";
import { CleaningOptionsSelector } from "./components/CleaningOptionsSelector";
import { AdditionalFields } from "./components/AdditionalFields";

interface BusinessStepProps {
  form: UseFormReturn<BookingFormData>;
}

const BusinessStep = ({ form }: BusinessStepProps) => {
  const businessType = form.watch("businessType");

  return (
    <div className="space-y-6">
      <BusinessTypeSelector form={form} />
      <CleaningOptionsSelector form={form} businessType={businessType} />
      <AdditionalFields form={form} businessType={businessType} />
    </div>
  );
};

export default BusinessStep;
