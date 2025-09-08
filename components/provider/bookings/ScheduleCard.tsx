
import { Calendar } from '@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card";

interface ScheduleCardProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

const ScheduleCard = ({ date, onDateChange }: ScheduleCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  );
};

export default ScheduleCard;
