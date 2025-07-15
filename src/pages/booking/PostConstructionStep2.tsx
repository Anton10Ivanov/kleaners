import { UseFormReturn } from "react-hook-form";
import { PostConstructionBookingForm } from "@/schemas/bookingSchemas";
import OptimizedCalendar from "@/components/booking/OptimizedCalendar";

interface PostConstructionStep2Props {
  form: UseFormReturn<PostConstructionBookingForm>;
}

const PostConstructionStep2 = ({ form }: PostConstructionStep2Props) => {
  return (
    <div className="space-y-6">
      <OptimizedCalendar 
        form={form}
        serviceType="post-construction"
      />
    </div>
  );
};

export default PostConstructionStep2;