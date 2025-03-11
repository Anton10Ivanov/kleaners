
import React from "react";
import { Calendar, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface AvailabilitySectionProps {
  availability: string[];
}

export const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({ availability }) => {
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
            {availability.length > 0 ? (
              availability.map((time, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1 text-sm">
                  {time}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500 text-sm mb-3">No availability information</p>
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
