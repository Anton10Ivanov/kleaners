
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCheck, Mail, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SuccessSubmissionProps {
  email: string;
  applicationId: string | null;
}

export const SuccessSubmission = ({ email, applicationId }: SuccessSubmissionProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  const handleSendMagicLink = async () => {
    if (!applicationId || !email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Missing application information. Please try again.",
      });
      return;
    }
    
    setIsSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-provider-magic-link', {
        body: { 
          applicationId, 
          email,
          name: email.split('@')[0] // Temporary name, will be updated during verification
        }
      });
      
      if (error) throw error;
      
      setIsSent(true);
      toast({
        title: "Magic Link Sent!",
        description: "Check your email for instructions to set up your provider account.",
      });
      
      // For development purposes only
      if (data?.url) {
        console.log("Magic link URL (DEV ONLY):", data.url);
        
        // Create clickable link for development
        const urlParts = data.url.split('/');
        const path = `/${urlParts.slice(3).join('/')}`;
        
        toast({
          title: "Development Link",
          description: (
            <div className="cursor-pointer text-blue-600 underline" 
                 onClick={() => navigate(path)}>
              Click to verify (dev only)
            </div>
          ),
          duration: 10000,
        });
      }
    } catch (error) {
      console.error("Error sending magic link:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send magic link. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
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
            
            {!isSent ? (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md p-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">Get Started with Your Provider Account</h4>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Click below to receive a magic link at {email} that will allow you to access your provider account.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-md p-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-green-800 dark:text-green-300">Magic Link Sent!</h4>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      We've sent a magic link to {email}. Check your inbox to access your provider account.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            {!isSent ? (
              <Button 
                onClick={handleSendMagicLink}
                className="w-full"
                disabled={isSending}
              >
                {isSending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Sending Link...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Magic Link
                  </>
                )}
              </Button>
            ) : (
              <Button 
                onClick={handleSendMagicLink}
                variant="outline"
                className="w-full"
                disabled={isSending}
              >
                {isSending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Resending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Resend Magic Link
                  </>
                )}
              </Button>
            )}
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
