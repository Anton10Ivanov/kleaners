
import React, { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useProviderSchedule } from "@/hooks/useProviderSchedule";

interface AvailabilitySectionProps {
  availability: string[];
}

export const AvailabilitySection: React.FC<AvailabilitySectionProps> = () => {
  const { fetchSchedule } = useProviderSchedule();
  const [schedules, setSchedules] = useState<any[]>([]);

  useEffect(() => {
    const loadSchedule = async () => {
      const data = await fetchSchedule();
      setSchedules(data);
    };
    loadSchedule();
  }, []);

  const formatSchedule = (schedule: any) => {
    return `${schedule.day.charAt(0).toUpperCase() + schedule.day.slice(1)}: ${schedule.start_time} - ${schedule.end_time}`;
  };

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <Clock className="h-5 w-5 text-primary" />
        Availability
      </h2>
      <Separator />
      <div className="pt-3">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {schedules.length > 0 ? (
              schedules.map((schedule, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1 text-sm">
                  {formatSchedule(schedule)}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500 text-sm mb-3">No availability set</p>
            )}
          </div>
          <Button variant="outline" size="sm" asChild className="self-start">
            <Link to="/provider/availability" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" /> Manage availability
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
