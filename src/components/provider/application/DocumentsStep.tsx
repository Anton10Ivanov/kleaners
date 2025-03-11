
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { TooltipIndicator } from './components/FormSelectionButtons';

interface DocumentsStepProps {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => void;
  resume: File | null;
  backgroundCheckConsent: File | null;
  setResume: React.Dispatch<React.SetStateAction<File | null>>;
  setBackgroundCheckConsent: React.Dispatch<React.SetStateAction<File | null>>;
}

export const DocumentsStep = ({
  handleFileChange,
  resume,
  backgroundCheckConsent,
  setResume,
  setBackgroundCheckConsent
}: DocumentsStepProps) => {
  return (
    <div className="space-y-4">
      <Alert className="mb-4">
        <Info className="h-4 w-4" />
        <AlertTitle>Verification Required</AlertTitle>
        <AlertDescription>
          To ensure the safety of our clients, we require documentation for all service providers.
        </AlertDescription>
      </Alert>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Label htmlFor="resume">Resume/CV</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <TooltipIndicator />
              </TooltipTrigger>
              <TooltipContent className="bg-primary text-primary-foreground border border-primary/60">
                <p>Upload your resume or CV in PDF, DOC, or DOCX format</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="resume"
          type="file"
          onChange={(e) => handleFileChange(e, setResume)}
          className="cursor-pointer"
          accept=".pdf,.doc,.docx"
        />
        {resume && (
          <p className="text-sm text-green-600">File uploaded: {resume.name}</p>
        )}
      </div>
    </div>
  );
};
