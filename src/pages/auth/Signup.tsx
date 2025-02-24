
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password must be at least 6 characters long",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome!",
        description: "Your account has been created. Please check your email for verification.",
      });
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to sign up",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Google signup error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign up with Google",
      });
    }
  };

  const handleAppleSignup = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Apple signup error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign up with Apple",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 mt-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Sign up with your Apple or Google account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-800"
              onClick={handleAppleSignup}
              type="button"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.07-.47-2.05-.48-3.18 0-1.42.61-2.16.44-3.03-.41C3.31 15.85 3.96 8.62 8.69 8.28c1.23-.07 2.4.63 3.21.64.82.01 2.11-.77 3.56-.66 1.03.1 3.87.52 4.5 3.87-.12.08-2.69 1.57-2.66 4.62.03 3.68 3.23 4.9 3.26 4.92-.03.09-.5 1.71-1.67 2.61M12.8 7.02c-.66.77-1.83 1.37-2.94 1.29-.15-1.15.43-2.35 1.07-3.12.72-.85 1.96-1.47 2.98-1.51.13 1.19-.35 2.44-1.11 3.34" />
              </svg>
              Sign up with Apple
            </Button>
            <Button 
              className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100 border border-gray-300"
              onClick={handleGoogleSignup}
              type="button"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
              </svg>
              Sign up with Google
            </Button>
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
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
      </div>
    </div>
  );
};

export default Signup;
