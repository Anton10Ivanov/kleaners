import { UseFormReturn } from "react-hook-form";
import { PostConstructionBookingForm } from "@/schemas/bookingSchemas";
import { EnhancedCalendar } from "@/components/booking/EnhancedCalendar";

interface PostConstructionStep2Props {
  form: UseFormReturn<PostConstructionBookingForm>;
}

const PostConstructionStep2 = ({ form }: PostConstructionStep2Props) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border">
        <EnhancedCalendar form={form as any} />
      </div>
    </div>
  );
};

export default PostConstructionStep2;