
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
import { logger } from "@/utils/logging";
import { validatePassword, sanitizeInput, cleanupAuthState } from "@/utils/security";

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

    // Sanitize input data
    const sanitizedData = {
      email: sanitizeInput(formData.email),
      firstName: sanitizeInput(formData.firstName),
      lastName: sanitizeInput(formData.lastName),
      userType: formData.userType
    };

    setIsLoading(true);

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

      navigate('/');
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
      <CardContent className="space-y-4">
        <SocialLogin />
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
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="client">Client Account</TabsTrigger>
            <TabsTrigger value="provider">Provider Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="client" className="mt-0">
            <div className="flex items-center mb-4">
              <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-400">
                Client
              </Badge>
              <p className="text-xs ml-2 text-muted-foreground">Book cleaning services for your home or business</p>
            </div>
          </TabsContent>
          
          <TabsContent value="provider" className="mt-0">
            <div className="flex items-center mb-4">
              <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-700 dark:text-emerald-400">
                Provider
              </Badge>
              <p className="text-xs ml-2 text-muted-foreground">Offer cleaning services as a professional</p>
            </div>
          </TabsContent>
        </Tabs>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
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
          <div className="space-y-2">
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
          <div className="space-y-2">
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
          <div className="space-y-2">
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
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Sign up"}
          </Button>
        </form>
        <Button
          type="button"
          variant="link"
          onClick={() => navigate('/auth/login')}
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
            className="h-auto p-0 text-xs"
            onClick={() => navigate('/legal/terms')}
          >
            Terms of Service
          </Button>
          {' '}and{' '}
          <Button 
            variant="link" 
            className="h-auto p-0 text-xs"
            onClick={() => navigate('/legal/privacy')}
          >
            Privacy Policy
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
