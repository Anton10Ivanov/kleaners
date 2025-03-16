
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import Calendar from "../Calendar";
import ServiceOptions from "../ServiceOptions";
import ExtraServiceOptions from "../ExtraServiceOptions";

interface DeepCleaningStepProps {
  form: UseFormReturn<BookingFormData>;
}

const DeepCleaningStep = ({ form }: DeepCleaningStepProps) => {
  const extras = form.watch('extras') || [];
  
  const handleExtrasChange = (newExtras: string[]) => {
    form.setValue('extras', newExtras);
  };

  return (
    <div className="space-y-8">
      <ServiceOptions 
        frequency={form.watch('frequency')} 
        setFrequency={(frequency) => form.setValue('frequency', frequency)}
      />
      
      <ExtraServiceOptions 
        selectedExtras={extras}
        onExtraChange={handleExtrasChange}
      />
      
      <Calendar form={form} />
    </div>
  );
};

export default DeepCleaningStep;
