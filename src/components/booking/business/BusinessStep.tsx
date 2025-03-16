
import { UseFormReturn } from "react-hook-form";
import { BookingFormData, Frequency } from "@/schemas/booking";
import { BusinessTypeSelector } from "./components/BusinessTypeSelector";
import { CleaningOptionsSelector } from "./components/CleaningOptionsSelector";
import { AdditionalFields } from "./components/AdditionalFields";
import ServiceOptions from "../ServiceOptions";
import { FrequencyTimeSelector } from "./components/FrequencyTimeSelector";
import Calendar from "../Calendar";

interface BusinessStepProps {
  form: UseFormReturn<BookingFormData>;
}

const BusinessStep = ({ form }: BusinessStepProps) => {
  const businessType = form.watch("businessType");
  const frequency = form.watch("frequency") as Frequency | undefined;

  const showFrequencyTimeSelector = frequency === Frequency.Custom;
  const showCalendar = frequency && frequency !== Frequency.Custom;

  return (
    <div className="space-y-6">
      <ServiceOptions 
        frequency={frequency}
        setFrequency={(freq) => form.setValue('frequency', freq)} 
      />
      {showCalendar && <Calendar form={form} />}
      {showFrequencyTimeSelector && <FrequencyTimeSelector form={form} />}
      <BusinessTypeSelector form={form} />
      <CleaningOptionsSelector form={form} businessType={businessType} />
      <AdditionalFields form={form} businessType={businessType} />
    </div>
  );
};

export default BusinessStep;
