
import { Calendar } from "lucide-react";
import { format } from "date-fns";

interface TimeSlotsProps {
  timeSlots: string[];
  selectedTimeSlot: string | undefined;
  date: Date | undefined;
  nowInBerlin: Date;
  onTimeSlotSelect: (timeSlot: string) => void;
}

export const TimeSlots = ({
  selectedTimeSlot,
  date,
  nowInBerlin,
  onTimeSlotSelect,
}: TimeSlotsProps) => {
  const morningSlot = "07:00-13:00";
  const afternoonSlot = "14:00-20:00";

  if (!date) {
    return null;
  }

  const isPastDate = date < nowInBerlin;
  const formattedDate = format(date, "EEEE, MMMM d");

  return (
    <div className="mt-6">
      <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        Available time slots for {formattedDate}
      </h4>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onTimeSlotSelect(morningSlot)}
          disabled={isPastDate}
          className={`p-4 rounded-lg border transition-colors ${
            selectedTimeSlot === morningSlot
              ? "border-primary bg-primary/5"
              : "border-gray-200 hover:border-primary/50"
          } ${isPastDate ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <span className="font-medium">Morning</span>
          <p className="text-sm text-gray-600">{morningSlot}</p>
        </button>

        <button
          onClick={() => onTimeSlotSelect(afternoonSlot)}
          disabled={isPastDate}
          className={`p-4 rounded-lg border transition-colors ${
            selectedTimeSlot === afternoonSlot
              ? "border-primary bg-primary/5"
              : "border-gray-200 hover:border-primary/50"
          } ${isPastDate ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <span className="font-medium">Afternoon</span>
          <p className="text-sm text-gray-600">{afternoonSlot}</p>
        </button>
      </div>
    </div>
  );
};
