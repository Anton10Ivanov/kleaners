
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase, UserRole } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SocialLogin from "./SocialLogin";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { logger } from "@/utils/logging";
import { validatePassword, sanitizeInput, cleanupAuthState } from "@/utils/security";
import { getRedirectPathForUser } from "@/utils/auth-redirect";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    userType: "client" as "client" | "provider",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"client" | "provider">("client");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    const email = params.get('email');
    
    if (type === 'provider') {
      setActiveTab('provider');
      setFormData(prev => ({ ...prev, userType: 'provider' }));
    }
    
    if (email) {
      setFormData(prev => ({ ...prev, email }));
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as "client" | "provider");
    setFormData(prev => ({ ...prev, userType: value as "client" | "provider" }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate terms acceptance
    if (!acceptedTerms) {
      toast({
        variant: "destructive",
        title: "Terms Required",
        description: "Please accept the Terms of Service and Privacy Policy to continue.",
      });
      return;
    }
    
    // Clean up any existing auth state
    cleanupAuthState();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }

    // Enhanced password validation
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      toast({
        variant: "destructive",
        title: "Password Requirements",
        description: passwordValidation.errors.join(', '),
      });
      return;
    }

    // Show confirmation dialog
    setShowConfirmation(true);
  };

  const handleConfirmSignup = async () => {
    // Sanitize input data
    const sanitizedData = {
      email: sanitizeInput(formData.email),
      firstName: sanitizeInput(formData.firstName),
      lastName: sanitizeInput(formData.lastName),
      userType: formData.userType
    };

    setIsLoading(true);
    setShowConfirmation(false);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: sanitizedData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: sanitizedData.firstName,
            last_name: sanitizedData.lastName,
            user_type: sanitizedData.userType,
          },
        },
      });

      if (authError) throw authError;

      // If we have a user, create additional records based on user type
      if (authData.user) {
        const userId = authData.user.id;
        
        // Update profiles table with user type
        await supabase
          .from('profiles')
          .update({
            user_type: formData.userType,
            first_name: sanitizedData.firstName,
            last_name: sanitizedData.lastName
          })
          .eq('id', userId);
          
        if (formData.userType === "provider") {
          // Create a provider record
          const { error: providerError } = await supabase
            .from('service_providers')
            .insert({
              id: userId,
              email: sanitizedData.email,
              first_name: sanitizedData.firstName,
              last_name: sanitizedData.lastName,
              status: 'pending_approval',
            });
            
          if (providerError) {
            logger.error('Failed to create provider record', { 
              error: providerError.message,
              email: formData.email 
            }, "SignupForm");
          }
          
          // Connect with provider application if it exists
          const { data: applicationData } = await supabase
            .from('provider_applications')
            .select('id')
            .eq('email', sanitizedData.email)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();
            
          if (applicationData?.id) {
            await supabase
              .from('provider_applications')
              .update({ 
                user_id: userId,
                status: 'account_created'
              })
              .eq('id', applicationData.id);
          }
          
          toast({
            title: "Provider Account Created",
            description: "Your account is pending approval. We'll review your application and get back to you soon.",
          });
        } else {
          // Customer record is created automatically by DB trigger
          toast({
            title: "Welcome!",
            description: "Your account has been created. You can now book services.",
          });
        }
      }

      // Redirect based on user role
      const redirectPath = await getRedirectPathForUser(authData.user.id);
      navigate(redirectPath);
    } catch (error) {
      logger.error('Signup failed', { 
        error: error instanceof Error ? error.message : 'Unknown error',
        email: formData.email,
        userType: formData.userType 
      }, "SignupForm");
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to sign up",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Sign up with your email or social accounts
        </CardDescription>
      </CardHeader>
      <CardContent className="form-spacing-relaxed">
        <SocialLogin context="signup" />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger 
              value="client" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md font-semibold"
            >
              Client Account
            </TabsTrigger>
            <TabsTrigger 
              value="provider"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md font-semibold"
            >
              Provider Account
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="client" className="mt-0">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-6">
              <p className="text-base sm:text-lg text-blue-700 dark:text-blue-300 leading-relaxed">
                Book professional cleaning services for your home or business. 
                Schedule one-time or recurring cleanings with verified service providers.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="provider" className="mt-0">
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-4 mb-6">
              <p className="text-base sm:text-lg text-orange-700 dark:text-orange-300 leading-relaxed">
                Join our team of professional cleaners. Offer your services to clients, 
                manage your schedule, and grow your cleaning business.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <form onSubmit={handleSignup} className="form-spacing-relaxed">
          <div className="grid grid-cols-2 gap-4">
            <div className="form-spacing-tight">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-spacing-tight">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-spacing-tight">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-spacing-tight">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-spacing-tight">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Terms and Conditions Checkbox */}
          <div className="flex items-start space-x-2 mb-4">
            <Checkbox
              id="terms"
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
              className="mt-1"
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I accept the{" "}
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-sm text-orange-500 hover:text-orange-600 underline"
                  onClick={() => window.open('/legal/terms', '_blank')}
                >
                  Terms of Service
                </Button>{" "}
                and{" "}
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-sm text-orange-500 hover:text-orange-600 underline"
                  onClick={() => window.open('/legal/privacy', '_blank')}
                >
                  Privacy Policy
                </Button>
              </label>
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-50 hover:border-orange-600 hover:text-orange-600 dark:hover:bg-orange-900/20 font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Sign up"}
          </Button>
        </form>
        <Button
          type="button"
          variant="link"
          onClick={() => navigate('/login')}
          className="w-full text-sm text-gray-600 hover:text-gray-900"
        >
          Already have an account? Log in
        </Button>
      </CardContent>
      <CardFooter className="text-center text-xs text-gray-500">
        <p className="w-full">
          By clicking continue, you agree to our{' '}
          <Button 
            variant="link" 
            className="h-auto card-spacing-none text-xs"
            onClick={() => navigate('/legal/terms')}
          >
            Terms of Service
          </Button>
          {' '}and{' '}
          <Button 
            variant="link" 
            className="h-auto card-spacing-none text-xs"
            onClick={() => navigate('/legal/privacy')}
          >
            Privacy Policy
          </Button>
        </p>
      </CardFooter>
      
      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-black">
              Please confirm Account type
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <h3 className={`text-lg font-bold ${
              formData.userType === 'client' 
                ? 'text-blue-600' 
                : 'text-orange-500'
            }`}>
              {formData.userType === 'client' ? 'Client Account' : 'Provider Account'}
            </h3>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmSignup}
              disabled={isLoading}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              {isLoading ? "Creating Account..." : "Confirm & Create Account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SignupForm;
