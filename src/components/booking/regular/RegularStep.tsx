
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import Calendar from "../Calendar";
import ServiceOptions from "../ServiceOptions";
import ExtraServiceOptions from "../ExtraServiceOptions";
import HoursSelection from "../HoursSelection";

interface RegularStepProps {
  form: UseFormReturn<BookingFormData>;
}

const RegularStep = ({ form }: RegularStepProps) => {
  const extras = form.watch('extras') || [];
  
  const handleExtrasChange = (newExtras: string[]) => {
    form.setValue('extras', newExtras);
  };

  const handleHoursChange = (newHours: number) => {
    form.setValue('hours', newHours);
  };

  return (
    <div className="space-y-8">
      <ServiceOptions 
        frequency={form.watch('frequency')} 
        setFrequency={(frequency) => form.setValue('frequency', frequency)}
      />
      
      <HoursSelection 
        hours={form.watch('hours') || 2}
        setHours={handleHoursChange}
      />
      
      <ExtraServiceOptions 
        selectedExtras={extras}
        onExtraChange={handleExtrasChange}
      />
      
      <Calendar form={form} />
    </div>
  );
};

export default RegularStep;
