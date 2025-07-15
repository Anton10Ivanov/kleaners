
import { UseFormReturn } from "react-hook-form";
import { DeepCleaningBookingForm } from "@/schemas/bookingSchemas";
import OptimizedCalendar from "@/components/booking/OptimizedCalendar";

interface DeepCleaningStep2Props {
  form: UseFormReturn<DeepCleaningBookingForm>;
}

const DeepCleaningStep2 = ({ form }: DeepCleaningStep2Props) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border">
        <OptimizedCalendar form={form as any} />
      </div>
    </div>
  );
};

export default DeepCleaningStep2;
