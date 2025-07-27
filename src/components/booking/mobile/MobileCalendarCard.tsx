
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock } from "lucide-react";
import { format } from "date-fns";

interface MobileCalendarCardProps {
  selectedDate?: Date;
  onDateSelect: (date: Date | undefined) => void;
  selectedTime?: string;
  onTimeSelect: (time: string) => void;
  className?: string;
}

/**
 * Mobile-optimized calendar and time selection component
 * Combines date and time selection in a single card interface
 */
export function MobileCalendarCard({
  selectedDate,
  onDateSelect,
  selectedTime,
  onTimeSelect,
  className,
}: MobileCalendarCardProps) {
  const { getMobileSpacing, isMobile } = useMobileOptimizations();
  const [showTimeSelection, setShowTimeSelection] = useState(false);

  const [timeSlots] = useState([
    { time: "09:00", available: true },
    { time: "09:30", available: true }, 
    { time: "10:00", available: true },
    { time: "10:30", available: true },
    { time: "11:00", available: true },
    { time: "11:30", available: true },
    { time: "12:00", available: true },
    { time: "12:30", available: true },
    { time: "13:00", available: true },
    { time: "13:30", available: true },
    { time: "14:00", available: true },
    { time: "14:30", available: true },
    { time: "15:00", available: true },
    { time: "15:30", available: true },
    { time: "16:00", available: true },
    { time: "16:30", available: true },
    { time: "17:00", available: true },
    { time: "17:30", available: true },
  ]);

  const handleDateSelect = (date: Date | undefined) => {
    onDateSelect(date);
    if (date) {
      setShowTimeSelection(true);
    }
  };

  const handleTimeSelect = (time: string) => {
    onTimeSelect(time);
    setShowTimeSelection(false);
  };

  return (
    <Card className={cn("card-primary", className)}>
      <CardHeader className={getMobileSpacing('md')}>
        <CardTitle className="flex items-center gap-2 text-lg">
          <CalendarDays className="h-5 w-5 text-primary" />
          Select Date & Time
        </CardTitle>
      </CardHeader>
      
      <CardContent className={getMobileSpacing('md')}>
        {/* Date Selection */}
        <div className="mb-6">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={(date) => date < new Date() || date.getDay() === 0}
            className="mx-auto"
            classNames={{
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day: cn(
                "h-12 w-12 text-center text-sm transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:bg-accent focus:text-accent-foreground",
                isMobile && "touch-comfortable"
              ),
            }}
          />
        </div>

        {/* Selected Date Display */}
        {selectedDate && (
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <p className="text-sm font-medium text-foreground">
              Selected Date: {format(selectedDate, "EEEE, MMMM d, yyyy")}
            </p>
          </div>
        )}

        {/* Time Selection */}
        {selectedDate && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Available Times</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map(({ time, available }) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => handleTimeSelect(time)}
                  disabled={!available}
                  className={cn(
                    "touch-comfortable text-sm",
                    selectedTime === time && "bg-primary text-primary-foreground"
                  )}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Time Display */}
        {selectedTime && (
          <div className="mt-4 p-3 bg-primary/10 rounded-lg">
            <p className="text-sm font-medium text-primary">
              Selected Time: {selectedTime}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
