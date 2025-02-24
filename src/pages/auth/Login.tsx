
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "Successfully logged in.",
      });
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to log in",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Google login error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign in with Google",
      });
    }
  };

  const handleAppleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Apple login error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign in with Apple",
      });
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Password Reset Email Sent",
        description: "Please check your email for the password reset link.",
      });
      setIsResetMode(false);
    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send password reset email",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isResetMode) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>
                Enter your email address and we'll send you a password reset link
              </CardDescription>
            </CardHeader>
            <form onSubmit={handlePasswordReset}>
              <CardContent>
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Send Reset Link"}
                </Button>
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setIsResetMode(false)}
                  className="text-sm"
                >
                  Back to login
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Login with your Apple or Google account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-800"
              onClick={handleAppleLogin}
              type="button"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.07-.47-2.05-.48-3.18 0-1.42.61-2.16.44-3.03-.41C3.31 15.85 3.96 8.62 8.69 8.28c1.23-.07 2.4.63 3.21.64.82.01 2.11-.77 3.56-.66 1.03.1 3.87.52 4.5 3.87-.12.08-2.69 1.57-2.66 4.62.03 3.68 3.23 4.9 3.26 4.92-.03.09-.5 1.71-1.67 2.61M12.8 7.02c-.66.77-1.83 1.37-2.94 1.29-.15-1.15.43-2.35 1.07-3.12.72-.85 1.96-1.47 2.98-1.51.13 1.19-.35 2.44-1.11 3.34" />
              </svg>
              Login with Apple
            </Button>
            <Button 
              className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100 border border-gray-300"
              onClick={handleGoogleLogin}
              type="button"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
              </svg>
              Login with Google
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
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Login"}
              </Button>
            </form>
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="link"
                onClick={() => setIsResetMode(true)}
                className="px-0 text-sm text-gray-600 hover:text-gray-900"
              >
                Forgot your password?
              </Button>
              <Button
                type="button"
                variant="link"
                onClick={() => navigate('/auth/signup')}
                className="px-0 text-sm text-gray-600 hover:text-gray-900"
              >
                Sign up
              </Button>
            </div>
          </CardContent>
          <CardFooter className="text-center text-xs text-gray-500">
            <p className="w-full">
              By clicking continue, you agree to our{' '}
              <Button variant="link" className="h-auto p-0 text-xs">
                Terms of Service
              </Button>
              {' '}and{' '}
              <Button variant="link" className="h-auto p-0 text-xs">
                Privacy Policy
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
