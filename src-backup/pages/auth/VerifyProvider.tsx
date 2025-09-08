
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const VerifyProvider = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Get token from URL query params
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (!token) {
          setError("No verification token found");
          setIsVerifying(false);
          return;
        }

        // Call the edge function to verify the token
        const { data, error: verifyError } = await supabase.functions.invoke('verify-provider-magic-link', {
          body: { token }
        });

        if (verifyError || !data || data.error) {
          throw new Error(data?.error || verifyError?.message || "Failed to verify token");
        }

        // Handle successful verification
        setIsSuccess(true);
        toast({
          title: "Verification successful!",
          description: "Your provider account has been created successfully.",
        });

        // Log in the user
        if (data.user && data.user.email) {
          // The user is now verified, redirect to provider dashboard after a delay
          setTimeout(() => {
            navigate("/provider/dashboard");
          }, 3000);
        }
      } catch (err) {
        console.error("Verification error:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, [location.search, navigate, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gray-900 card-spacing-sm mt-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Provider Verification</CardTitle>
            <CardDescription>
              {isVerifying ? "Verifying your account..." : isSuccess 
                ? "Your account has been verified!" 
                : "There was a problem verifying your account"}
            </CardDescription>
          </CardHeader>
          <CardContent className="form-spacing-relaxed flex flex-col items-center justify-center">
            {isVerifying ? (
              <div className="text-center section-spacing-md">
                <Spinner className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Please wait while we verify your account...</p>
              </div>
            ) : isSuccess ? (
              <div className="text-center section-spacing-xs">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-green-600 font-medium mb-2">Verification Successful!</p>
                <p className="text-muted-foreground">You will be redirected to the provider dashboard shortly...</p>
              </div>
            ) : (
              <div className="text-center section-spacing-xs">
                <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-red-600 font-medium mb-2">Verification Failed</p>
                <p className="text-muted-foreground">{error || "An unknown error occurred"}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            {!isVerifying && (
              <Button 
                variant={isSuccess ? "default" : "outline"}
                onClick={() => navigate("/")}
                className="w-full"
              >
                {isSuccess ? "Go to Dashboard" : "Return to Home"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyProvider;
