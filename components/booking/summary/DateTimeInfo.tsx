
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';
import { format } from 'date-fns';
import { CalendarIcon, LucideIcon } from 'lucide-react';

interface DateTimeInfoProps {
  form: UseFormReturn<BookingFormData>;
}

const InfoLine = ({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) => (
  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
    <Icon className="h-4 w-4 flex-shrink-0" />
    <span className="min-w-0">{children}</span>
  </div>
);

const DateTimeInfo = ({ form }: DateTimeInfoProps) => {
  const { date, preferredTime } = form.watch();

  if (!date) return null;

  return (
    <div className="border-t pt-3">
      <InfoLine icon={CalendarIcon}>{format(date, 'MMM d, yyyy')}</InfoLine>
      {preferredTime && (
        <div className="ml-6 text-gray-500">
          {preferredTime}
        </div>
      )}
    </div>
  );
};

export default DateTimeInfo;
