
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';

interface ConfirmationStepProps {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  skills: string[];
  availability: string[];
  resume: File | null;
  identificationDoc: File | null;
  backgroundCheckConsent: File | null;
}

export const ConfirmationStep = ({
  name,
  email,
  phone,
  position,
  experience,
  skills,
  availability,
  resume,
  identificationDoc,
  backgroundCheckConsent
}: ConfirmationStepProps) => {
  return (
    <div className="space-y-4 py-4">
      <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertTitle>Application Review</AlertTitle>
        <AlertDescription>
          Please review your information before submitting the application.
        </AlertDescription>
      </Alert>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Personal Information</h3>
          <p><span className="font-medium">Name:</span> {name}</p>
          <p><span className="font-medium">Email:</span> {email}</p>
          <p><span className="font-medium">Phone:</span> {phone}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Professional Information</h3>
          <p><span className="font-medium">Position:</span> {position}</p>
          <p><span className="font-medium">Experience:</span> {experience}</p>
          <p><span className="font-medium">Skills:</span> {skills.join(', ') || 'None specified'}</p>
          <p><span className="font-medium">Availability:</span> {availability.join(', ')}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Documents</h3>
          <p><span className="font-medium">Resume:</span> {resume ? '✓ Uploaded' : '✗ Not uploaded'}</p>
          <p><span className="font-medium">ID Verification:</span> {identificationDoc ? '✓ Uploaded' : '✗ Not uploaded'}</p>
          <p><span className="font-medium">Background Check Consent:</span> {backgroundCheckConsent ? '✓ Uploaded' : '✗ Not uploaded'}</p>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground">By clicking submit, your application will be sent for review.</p>
    </div>
  );
};
