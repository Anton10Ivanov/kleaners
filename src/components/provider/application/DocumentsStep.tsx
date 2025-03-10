
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

interface DocumentsStepProps {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => void;
  resume: File | null;
  backgroundCheckConsent: File | null;
}

export const DocumentsStep = ({
  handleFileChange,
  resume,
  backgroundCheckConsent
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
        <Label htmlFor="resume">Resume/CV <span className="text-red-500">*</span></Label>
        <Input
          id="resume"
          type="file"
          onChange={(e) => handleFileChange(e, (file) => resume)}
          className="cursor-pointer"
          accept=".pdf,.doc,.docx"
        />
        <p className="text-xs text-muted-foreground">Accepted formats: PDF, DOC, DOCX</p>
        {resume && (
          <p className="text-sm text-green-600">File uploaded: {resume.name}</p>
        )}
      </div>
    </div>
  );
};
