
import React from "react";
import { FileText } from "lucide-react";
import { Separator } from '@/components/ui/separator";

interface PersonalStatementSectionProps {
  message: string | null | undefined;
}

export const PersonalStatementSection: React.FC<PersonalStatementSectionProps> = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="form-spacing-tight">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        Personal Statement
      </h2>
      <Separator />
      <p className="text-gray-700 whitespace-pre-line text-sm pt-2">
        {message}
      </p>
    </div>
  );
};
