import { UseFormReturn } from "react-hook-form";
import { PostConstructionBookingForm } from '@/schemas/bookingSchemas';
import Calendar from '@/components/booking/calendar/Calendar';

interface PostConstructionStep2Props {
  form: UseFormReturn<PostConstructionBookingForm>;
}

const PostConstructionStep2 = ({ form }: PostConstructionStep2Props) => {
  return (
    <div className="form-spacing-loose">
      <div className="bg-white dark:bg-gray-800 card-spacing-md rounded-xl shadow-sm border">
        <EnhancedCalendar form={form as any} />
      </div>
    </div>
  );
};

export default PostConstructionStep2;