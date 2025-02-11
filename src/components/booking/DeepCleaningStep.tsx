
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

interface DeepCleaningStepProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  hours: number;
  setHours: (hours: number) => void;
}

const DeepCleaningStep = ({ date, setDate, hours, setHours }: DeepCleaningStepProps) => {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-6">Deep Cleaning Service</h3>
        <p className="text-gray-600 mb-4">
          Our deep cleaning service includes all regular cleaning tasks plus:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Deep cleaning of bathroom tiles and grout</li>
          <li>Interior window cleaning</li>
          <li>Deep cleaning of kitchen appliances</li>
          <li>Baseboard and door frame cleaning</li>
          <li>Light fixture cleaning</li>
        </ul>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-6">Select Hours</h3>
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => setHours(Math.max(4, hours - 1))}
            disabled={hours <= 4}
          >
            -
          </Button>
          <span className="text-2xl font-semibold">{hours} hours</span>
          <Button 
            variant="outline" 
            onClick={() => setHours(hours + 1)}
          >
            +
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Minimum 4 hours required for deep cleaning
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-6">Select a Date</h3>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          disabled={(date) => date < new Date() || date.getDay() === 0}
        />
      </div>
    </div>
  );
};

export default DeepCleaningStep;
