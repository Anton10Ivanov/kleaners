
import Link from 'next/link';

interface CalendarFooterProps {
  selectedTimeSlot: string | undefined;
}

export const CalendarFooter = ({ selectedTimeSlot }: CalendarFooterProps) => {
  if (selectedTimeSlot) return null;
  
  return (
    <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mt-4 text-center md:text-left font-medium">
      If there are no preferred time slots available, please select another date or{" "}
      <Link href="/contact" className="text-primary hover:underline">
        contact us
      </Link>
    </p>
  );
};
