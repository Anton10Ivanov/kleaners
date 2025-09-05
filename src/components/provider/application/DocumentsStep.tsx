
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { TooltipIndicator } from './components/FormSelectionButtons';
import { Upload, FileText, CheckCircle } from 'lucide-react';

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
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center space-x-1">
          <Label htmlFor="resume" className="text-base font-semibold">Resume/CV (Optional)</Label>
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <TooltipIndicator />
                </span>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-primary text-primary-foreground border border-primary/60 p-2 text-sm max-w-xs">
                <p>Optionally upload your resume or CV in PDF, DOC, or DOCX format</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="border-2 border-dashed rounded-md p-6 transition-colors hover:border-primary/50 cursor-pointer relative">
          <Input 
            id="resume" 
            type="file" 
            onChange={e => handleFileChange(e, setResume)} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
            accept=".pdf,.doc,.docx" 
          />
          <div className="flex flex-col items-center text-center space-y-2">
            {resume ? (
              <>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">File uploaded successfully</p>
                  <p className="text-xs text-muted-foreground">{resume.name}</p>
                </div>
              </>
            ) : (
              <>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Drag and drop or click to upload</p>
                  <p className="text-xs text-muted-foreground">PDF, DOC, or DOCX (max 5MB)</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-4">
        <Label htmlFor="message" className="text-base font-semibold">Your Motivation</Label>
        <Textarea 
          id="message" 
          placeholder="Tell us about yourself and why you're interested in this position" 
          value={message} 
          onChange={e => setMessage(e.target.value)} 
          className="min-h-[120px]" 
        />
      </div>
      
      <div className="space-y-4 pt-4">
        <div className="text-base font-semibold mb-2">Required Agreements</div>
        <div className="space-y-4 pl-2">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="terms" 
              checked={agreeToTerms} 
              onCheckedChange={checked => setAgreeToTerms(checked === true)} 
              className={agreeToTerms ? "text-primary" : ""}
            />
            <div>
              <Label htmlFor="terms" className="text-sm font-normal">
                I agree to the <a href="#" className="text-primary hover:underline">Terms and Conditions</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </Label>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="backgroundCheck" 
              checked={agreeToBackgroundCheck} 
              onCheckedChange={checked => setAgreeToBackgroundCheck(checked === true)}
              className={agreeToBackgroundCheck ? "text-primary" : ""}
            />
            <div>
              <Label htmlFor="backgroundCheck" className="text-sm font-normal">
                I have no criminal record
              </Label>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="addressConfirmation" 
              checked={agreeToTraining} 
              onCheckedChange={checked => setAgreeToTraining(checked === true)}
              className={agreeToTraining ? "text-primary" : ""}
            />
            <div>
              <Label htmlFor="addressConfirmation" className="text-sm font-normal">
                I confirm that I live at the address of my German ID card or "confirmation of registration" document issued to me from the government
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
