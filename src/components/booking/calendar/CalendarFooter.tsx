
import { Link } from "react-router-dom";

interface CalendarFooterProps {
  selectedTimeSlot: string | undefined;
}

export const CalendarFooter = ({ selectedTimeSlot }: CalendarFooterProps) => {
  if (selectedTimeSlot) return null;
  
  return (
    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-4 text-center md:text-left">
      If there are no preferred time slots available, please select another date or{" "}
      <Link to="/contact" className="text-primary hover:underline">
        contact us
      </Link>
    </p>
  );
};
