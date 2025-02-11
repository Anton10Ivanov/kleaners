
import { Calendar as CalendarUI } from "@/components/ui/calendar";

interface CalendarProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const Calendar = ({ date, setDate }: CalendarProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold mb-6">Select a date</h3>
      <CalendarUI
        mode="single"
        selected={date}
        onSelect={setDate}
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
