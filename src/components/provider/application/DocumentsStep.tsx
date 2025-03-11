import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
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
  message: string;
  agreeToTerms: boolean;
  agreeToBackgroundCheck: boolean;
  agreeToTraining: boolean;
  setMessage: (value: string) => void;
  setAgreeToTerms: (value: boolean) => void;
  setAgreeToBackgroundCheck: (value: boolean) => void;
  setAgreeToTraining: (value: boolean) => void;
}
export const DocumentsStep = ({
  handleFileChange,
  resume,
  backgroundCheckConsent,
  setResume,
  setBackgroundCheckConsent,
  message,
  agreeToTerms,
  agreeToBackgroundCheck,
  agreeToTraining,
  setMessage,
  setAgreeToTerms,
  setAgreeToBackgroundCheck,
  setAgreeToTraining
}: DocumentsStepProps) => {
  return <div className="space-y-6">
      <Alert className="mb-4">
        <Info className="h-4 w-4" />
        <AlertTitle>Verification Required</AlertTitle>
        <AlertDescription>
          To ensure the safety of our clients, we require documentation for all service providers.
        </AlertDescription>
      </Alert>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-1">
          <Label htmlFor="resume">Resume/CV</Label>
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <TooltipIndicator />
                </span>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-primary text-primary-foreground border border-primary/60 p-2 text-sm max-w-xs">
                <p>Upload your resume or CV in PDF, DOC, or DOCX format</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input id="resume" type="file" onChange={e => handleFileChange(e, setResume)} className="cursor-pointer" accept=".pdf,.doc,.docx" />
        {resume && <p className="text-sm text-green-600">File uploaded: {resume.name}</p>}
      </div>

      <div className="space-y-2 pt-4">
        <Label htmlFor="message">Are there other reasons that motivate you to do this job?</Label>
        <Textarea id="message" placeholder="Tell us about yourself and why you're interested in this position" value={message} onChange={e => setMessage(e.target.value)} className="min-h-[120px]" />
      </div>
      
      <div className="space-y-4 pt-4">
        <div className="flex items-start space-x-2">
          <Checkbox id="terms" checked={agreeToTerms} onCheckedChange={checked => setAgreeToTerms(checked === true)} />
          <div>
            <Label htmlFor="terms" className="text-sm font-normal">
              I agree to the <a href="#" className="text-primary hover:underline">Terms and Conditions</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </Label>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox id="backgroundCheck" checked={agreeToBackgroundCheck} onCheckedChange={checked => setAgreeToBackgroundCheck(checked === true)} />
          <div>
            <Label htmlFor="backgroundCheck" className="text-sm font-normal">
              I have no criminal record
            </Label>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox id="addressConfirmation" checked={agreeToTraining} onCheckedChange={checked => setAgreeToTraining(checked === true)} />
          <div>
            <Label htmlFor="addressConfirmation" className="text-sm font-normal">
              I confirm that I live at the address of my German ID card or "confirmation of registration" document issued to me from the government
            </Label>
          </div>
        </div>
      </div>
    </div>;
};