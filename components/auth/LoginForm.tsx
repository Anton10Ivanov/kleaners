
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button";
import { Input } from '@/components/ui/input";
import { useToast } from '@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card";
import { Separator } from '@/components/ui/separator";
import SocialLogin from "./SocialLogin";
import { logger } from '@/utils/logging";
import { sanitizeInput, cleanupAuthState } from '@/utils/security";
import { getRedirectPathForUser } from '@/utils/auth-redirect";

interface LoginFormProps {
  onResetMode: () => void;
}

const LoginForm = ({
  onResetMode
}: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clean up existing auth state
    cleanupAuthState();
    
    // Attempt global sign out before new login
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      // Continue even if this fails
    }
    
    setIsLoading(true);
    try {
      const sanitizedEmail = sanitizeInput(email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: sanitizedEmail,
        password
      });
      
      if (error) throw error;
      
      toast({
        title: "Welcome back!",
        description: "Successfully logged in."
      });
      
      if (data.user) {
        // Get the appropriate redirect path based on user role
        const redirectPath = await getRedirectPathForUser(data.user.id);
        logger.info('Redirecting user to', { redirectPath, userId: data.user.id }, 'LoginForm');
        navigate(redirectPath);
      }
    } catch (error) {
      logger.error('Login failed', { 
        error: error instanceof Error ? error.message : 'Unknown error',
        email: email 
      }, "LoginForm");
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to log in"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>
          Login with your Apple or Google account
        </CardDescription>
      </CardHeader>
      <CardContent className="form-spacing-relaxed">
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
        <form onSubmit={handleLogin} className="form-spacing-relaxed">
          <div className="form-spacing-tight">
            <Input type="email" placeholder="m@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-spacing-tight">
            <Input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
            {isLoading ? "Processing..." : "Login"}
          </Button>
        </form>
        <div className="flex items-center justify-between">
          <Button type="button" variant="link" onClick={onResetMode} className="px-0 text-sm text-gray-600 hover:text-gray-900">
            Forgot your password?
          </Button>
          <Button type="button" variant="link" onClick={() => navigate('/signup')} className="px-0 rounded-sm text-primary bg-white font-bold text-base text-center">
            Sign up
          </Button>
        </div>
      </CardContent>
      <CardFooter className="text-center text-xs text-gray-500">
        <p className="w-full">
          By clicking continue, you agree to our{' '}
          <Button variant="link" className="h-auto card-spacing-none text-xs" onClick={() => navigate('/legal/terms')}>
            Terms of Service
          </Button>
          {' '}and{' '}
          <Button variant="link" className="h-auto card-spacing-none text-xs" onClick={() => navigate('/legal/privacy')}>
            Privacy Policy
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
