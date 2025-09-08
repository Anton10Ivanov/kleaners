
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from '@/schemas/booking";
import { UnifiedBookingCalendar } from "../UnifiedBookingCalendar";

interface CalendarProps {
  form: UseFormReturn<BookingFormData>;
}

const Calendar = ({ form }: CalendarProps) => {
  return <UnifiedBookingCalendar form={form} />;
};

export default Calendar;
