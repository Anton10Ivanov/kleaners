
import React from "react";
import { Award } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface SkillsSectionProps {
  skills: string[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <div className="form-spacing-tight">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <Award className="h-5 w-5 text-primary" />
        Skills & Specialties
      </h2>
      <Separator />
      <div className="flex flex-wrap gap-2 pt-3">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
              {skill}
            </Badge>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No specific skills listed</p>
        )}
      </div>
    </div>
  );
};
