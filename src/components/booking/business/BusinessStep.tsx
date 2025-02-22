
import { UseFormReturn } from "react-hook-form";
import { BookingFormData, Frequency } from "@/schemas/booking";
import { BusinessTypeSelector } from "./components/BusinessTypeSelector";
import { CleaningOptionsSelector } from "./components/CleaningOptionsSelector";
import { AdditionalFields } from "./components/AdditionalFields";
import ServiceOptions from "../ServiceOptions";
import { FrequencyTimeSelector } from "./components/FrequencyTimeSelector";

interface BusinessStepProps {
  form: UseFormReturn<BookingFormData>;
}

const BusinessStep = ({ form }: BusinessStepProps) => {
  const businessType = form.watch("businessType");
  const frequency = form.watch("frequency") as Frequency | undefined;

  return (
    <div className="space-y-6">
      <ServiceOptions 
        frequency={frequency}
        setFrequency={(freq) => form.setValue('frequency', freq)} 
      />
      {(frequency === Frequency.Weekly || 
        frequency === Frequency.Biweekly || 
        frequency === Frequency.Custom) && (
        <FrequencyTimeSelector form={form} />
      )}
      <BusinessTypeSelector form={form} />
      <CleaningOptionsSelector form={form} businessType={businessType} />
      <AdditionalFields form={form} businessType={businessType} />
    </div>
  );
};

export default BusinessStep;

