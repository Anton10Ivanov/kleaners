
import React from "react";
import { MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export const EmploymentSection: React.FC = () => {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary" />
        Employment Details
      </h2>
      <Separator />
      <div className="pt-3 space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Employment Type</p>
          <Badge>Full-time</Badge>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Transportation</p>
          <Badge variant="outline">Has Own Transportation</Badge>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Equipment</p>
          <Badge variant="outline">Has Own Equipment</Badge>
        </div>
      </div>
    </div>
  );
};
