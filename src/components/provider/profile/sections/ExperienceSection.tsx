
import React from "react";
import { Award, Briefcase } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ExperienceSectionProps {
  provider: any;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ provider }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <Briefcase className="h-5 w-5 text-primary" />
        Professional Experience
      </h2>
      <Separator />
      <div className="space-y-3 pt-2">
        <div className="flex items-start gap-2">
          <Award className="h-5 w-5 text-gray-500 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Experience Level</p>
            <p>{provider?.experience || "Not specified"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
