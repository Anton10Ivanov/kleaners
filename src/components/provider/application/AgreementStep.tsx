
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface AgreementStepProps {
  message: string;
  agreeToTerms: boolean;
  agreeToBackgroundCheck: boolean;
  agreeToTraining: boolean;
  setMessage: (value: string) => void;
  setAgreeToTerms: (value: boolean) => void;
  setAgreeToBackgroundCheck: (value: boolean) => void;
  setAgreeToTraining: (value: boolean) => void;
}

export const AgreementStep = ({
  message,
  agreeToTerms,
  agreeToBackgroundCheck,
  agreeToTraining,
  setMessage,
  setAgreeToTerms,
  setAgreeToBackgroundCheck,
  setAgreeToTraining
}: AgreementStepProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="message">Why do you want to join our team?</Label>
        <Textarea
          id="message"
          placeholder="Tell us about yourself and why you're interested in this position"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[120px]"
        />
      </div>
      
      <div className="space-y-4 pt-4">
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="terms" 
            checked={agreeToTerms}
            onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
          />
          <div>
            <Label htmlFor="terms" className="text-sm font-normal">
              I agree to the <a href="#" className="text-primary hover:underline">Terms and Conditions</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a> <span className="text-red-500">*</span>
            </Label>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="backgroundCheck" 
            checked={agreeToBackgroundCheck}
            onCheckedChange={(checked) => setAgreeToBackgroundCheck(checked === true)}
          />
          <div>
            <Label htmlFor="backgroundCheck" className="text-sm font-normal">
              I have no criminal record <span className="text-red-500">*</span>
            </Label>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="addressConfirmation" 
            checked={agreeToTraining}
            onCheckedChange={(checked) => setAgreeToTraining(checked === true)}
          />
          <div>
            <Label htmlFor="addressConfirmation" className="text-sm font-normal">
              I confirm that I live at the address of my German ID card or "confirmation of registration" document issued to me from the government <span className="text-red-500">*</span>
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};
