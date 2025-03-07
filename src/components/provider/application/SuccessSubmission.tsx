
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCheck } from 'lucide-react';

interface SuccessSubmissionProps {
  email: string;
  applicationId: string | null;
}

export const SuccessSubmission = ({ email, applicationId }: SuccessSubmissionProps) => {
  const navigate = useNavigate();
  
  const handleContinueToAccount = () => {
    navigate(`/auth/signup?type=provider&email=${encodeURIComponent(email)}&applicationId=${applicationId}`);
  };
  
  const handleReturnToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md mx-auto">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCheck className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-center">Application Submitted!</CardTitle>
            <CardDescription className="text-center">Thank you for applying to join our team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              Your application has been received and is now being reviewed. We'll contact you soon about next steps.
            </p>
            
            <div className="border rounded-md p-4 bg-muted/30">
              <p className="text-sm"><span className="font-medium">Application ID:</span> {applicationId}</p>
              <p className="text-sm"><span className="font-medium">Status:</span> Under Review</p>
            </div>
            
            <p className="text-center text-sm text-muted-foreground">
              You'll be redirected to create an account in a few seconds...
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button 
              onClick={handleContinueToAccount}
              className="w-full"
            >
              Continue to Account Setup
            </Button>
            <Button 
              variant="outline"
              onClick={handleReturnToHome}
              className="w-full"
            >
              Return to Homepage
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
