
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addDays, isWithinInterval, parseISO, format } from "date-fns";
import { useBookings } from "@/hooks/useBookings";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export const CalendarSection = () => {
  const [date, setDate] = useState<Date>(new Date());
  
  const { bookings, isLoading } = useBookings({
    selectedStatus: null,
    searchTerm: "",
    sortField: "date",
    sortOrder: "asc",
    dateRange: {
      from: date,
      to: addDays(date, 7),
    },
  });

  // Get bookings for the selected date
  const getBookingsForDate = (day: Date) => {
    if (!bookings) return [];
    
    return bookings.filter(booking => {
      if (!booking.date) return false;
      const bookingDate = parseISO(booking.date);
      return bookingDate.getDate() === day.getDate() && 
             bookingDate.getMonth() === day.getMonth() && 
             bookingDate.getFullYear() === day.getFullYear();
    });
  };

  // Get bookings for today
  const todayBookings = date ? getBookingsForDate(date) : [];

  return (
    <div className="form-spacing-relaxed">
      <h2 className="text-2xl font-bold mb-4">Calendar</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Booking Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="rounded-md border mx-auto"
              components={{
                DayContent: (props) => {
                  const dateBookings = getBookingsForDate(props.date);
                  return (
                    <div className="relative h-9 w-9 card-spacing-none flex items-center justify-center">
                      {props.date.getDate()} {/* Changed from props.day to props.date.getDate() */}
                      {dateBookings.length > 0 && (
                        <Badge 
                          className="absolute -top-1 -right-1 h-4 w-4 card-spacing-none flex items-center justify-center text-[10px]"
                          variant="destructive"
                        >
                          {dateBookings.length}
                        </Badge>
                      )}
                    </div>
                  );
                },
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Bookings for {date ? format(date, 'MMMM d, yyyy') : 'Today'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center section-spacing-md">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : todayBookings.length > 0 ? (
              <div className="form-spacing-normal">
                {todayBookings.map((booking) => (
                  <div key={booking.id} className="border rounded-md card-spacing-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">
                          {booking.first_name} {booking.last_name}
                        </p>
                        <p className="text-sm text-muted-foreground">{booking.service_type}</p>
                      </div>
                      <Badge
                        className={
                          booking.status === 'completed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : booking.status === 'confirmed'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                            : booking.status === 'cancelled'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            : 'bg-secondary/10 text-secondary border-secondary/20'
                        }
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="mt-2 text-sm">
                      <p>Hours: {booking.hours || 2}</p>
                      {booking.address && <p className="truncate">Address: {booking.address}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center section-spacing-md text-muted-foreground">
                No bookings scheduled for this date
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
