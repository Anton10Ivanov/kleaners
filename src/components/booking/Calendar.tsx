
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { addToGoogleCalendar } from "@/utils/googleCalendar";
import { toast } from "sonner";

interface CalendarProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const Calendar = ({ date, setDate }: CalendarProps) => {
  const handleDateSelect = async (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    
    if (selectedDate) {
      try {
        await addToGoogleCalendar(
          selectedDate,
          "Regular Cleaning", // This should be dynamic based on the selected service
          2, // Default duration in hours
          "Address will be provided" // This should be updated with the actual address
        );
        toast.success("Event added to Google Calendar!");
      } catch (error) {
        console.error("Failed to add event to Google Calendar:", error);
        toast.error("Failed to add event to Google Calendar. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold mb-6">Select a date</h3>
      <CalendarUI
        mode="single"
        selected={date}
        onSelect={handleDateSelect}
        className="rounded-md border"
        disabled={(date) => date < new Date() || date.getDay() === 0}
      />
      <p className="text-sm text-muted-foreground mt-4">
        Note: We don't work on Sundays
      </p>
    </div>
  );
};

export default Calendar;
