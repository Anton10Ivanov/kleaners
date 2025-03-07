
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

interface DocumentsStepProps {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => void;
  setResume: React.Dispatch<React.SetStateAction<File | null>>;
  setIdentificationDoc: React.Dispatch<React.SetStateAction<File | null>>;
  setBackgroundCheckConsent: React.Dispatch<React.SetStateAction<File | null>>;
}

export const DocumentsStep = ({
  handleFileChange,
  setResume,
  setIdentificationDoc,
  setBackgroundCheckConsent
}: DocumentsStepProps) => {
  return (
    <div className="space-y-4">
      <Alert className="mb-4">
        <Info className="h-4 w-4" />
        <AlertTitle>Verification Required</AlertTitle>
        <AlertDescription>
          To ensure the safety of our clients, we require documentation and background checks for all service providers.
        </AlertDescription>
      </Alert>
      
      <div className="space-y-2">
        <Label htmlFor="resume">Resume/CV <span className="text-red-500">*</span></Label>
        <Input
          id="resume"
          type="file"
          onChange={(e) => handleFileChange(e, setResume)}
          className="cursor-pointer"
          accept=".pdf,.doc,.docx"
        />
        <p className="text-xs text-muted-foreground">Accepted formats: PDF, DOC, DOCX</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="identification">ID Verification</Label>
        <Input
          id="identification"
          type="file"
          onChange={(e) => handleFileChange(e, setIdentificationDoc)}
          className="cursor-pointer"
          accept=".jpg,.jpeg,.png,.pdf"
        />
        <p className="text-xs text-muted-foreground">Please provide a government-issued ID (driver's license, passport, etc.)</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="background-check">Background Check Consent Form</Label>
        <Input
          id="background-check"
          type="file"
          onChange={(e) => handleFileChange(e, setBackgroundCheckConsent)}
          className="cursor-pointer"
          accept=".pdf"
        />
        <p className="text-xs text-muted-foreground">Download, fill and upload our <a href="#" className="text-primary hover:underline">Background Check Consent Form</a></p>
      </div>
    </div>
  );
};
