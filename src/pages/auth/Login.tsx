
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Starting login process...");
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error('Authentication error details:', {
          message: authError.message,
          status: authError.status,
          name: authError.name
        });
        throw authError;
      }

      if (!authData.user) {
        console.error('No user data returned from authentication');
        throw new Error('No user data returned');
      }

      console.log("Authentication successful for user:", {
        id: authData.user.id,
        email: authData.user.email,
        lastSignIn: authData.user.last_sign_in_at
      });

      // Check if user has admin role
      console.log("Checking admin role for user ID:", authData.user.id);
      const { data: adminRole, error: roleError } = await supabase
        .from('admin_roles')
        .select('*')  // Select all columns to see full role data
        .eq('user_id', authData.user.id)
        .single();

      if (roleError) {
        console.error('Role check error details:', {
          message: roleError.message,
          code: roleError.code,
          details: roleError.details,
          hint: roleError.hint
        });
        throw roleError;
      }

      console.log("Admin role check result:", adminRole);

      if (adminRole) {
        console.log("Admin role found:", adminRole);
        toast({
          title: "Welcome back!",
          description: "Successfully logged in as admin.",
        });
        console.log("Navigating to admin dashboard");
        navigate('/admin');
      } else {
        console.log("No admin role found - signing out");
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "You don't have permission to access the admin area.",
        });
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.error('Login process error:', error);
      let errorMessage = "Failed to log in";
      if (error instanceof Error) {
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
        errorMessage = error.message;
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>
            Please sign in with your admin credentials
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
