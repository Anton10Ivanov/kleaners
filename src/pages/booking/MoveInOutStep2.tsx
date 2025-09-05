
import { UseFormReturn } from "react-hook-form";
import { MoveInOutBookingForm } from "@/schemas/bookingSchemas";
import { EnhancedCalendar } from "@/components/booking/EnhancedCalendar";

interface MoveInOutStep2Props {
  form: UseFormReturn<MoveInOutBookingForm>;
}

const MoveInOutStep2 = ({ form }: MoveInOutStep2Props) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border">
        <EnhancedCalendar form={form as any} />
      </div>
    </div>
  );
};

export default MoveInOutStep2;
