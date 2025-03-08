
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';

export const CalendarView: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  return (
    <div className="flex flex-col space-y-4">
      <div className="mx-auto">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Card className="p-4">
          <h3 className="font-medium mb-2">Upcoming Time Off</h3>
          <p className="text-sm text-muted-foreground">
            No upcoming time off scheduled.
          </p>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-medium mb-2">Working Hours</h3>
          <p className="text-sm">
            <span className="font-medium">Monday:</span> 9:00 AM - 5:00 PM
          </p>
          <p className="text-sm">
            <span className="font-medium">Wednesday:</span> 10:00 AM - 4:00 PM
          </p>
          <p className="text-sm">
            <span className="font-medium">Friday:</span> 9:00 AM - 5:00 PM
          </p>
        </Card>
      </div>
    </div>
  );
};
