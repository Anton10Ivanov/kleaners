
import { UseFormReturn } from "react-hook-form";
import { DeepCleaningBookingForm } from "@/schemas/bookingSchemas";
import { EnhancedCalendar } from "@/components/booking/EnhancedCalendar";

interface DeepCleaningStep2Props {
  form: UseFormReturn<DeepCleaningBookingForm>;
}

const DeepCleaningStep2 = ({ form }: DeepCleaningStep2Props) => {
  return (
    <div className="form-spacing-loose">
      <div className="bg-white dark:bg-gray-800 card-spacing-md rounded-xl shadow-sm border">
        <EnhancedCalendar form={form as any} />
      </div>
    </div>
  );
};

export default DeepCleaningStep2;
