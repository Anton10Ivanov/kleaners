
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logging';

interface SocialLoginProps {
  context?: 'login' | 'signup';
}

const SocialLogin = ({ context = 'login' }: SocialLoginProps) => {
  const { toast } = useToast();

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
      logger.error('Google login failed', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, "SocialLogin");
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
      logger.error('Apple login failed', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, "SocialLogin");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign in with Apple",
      });
    }
  };

  return (
    <div className="form-spacing-relaxed">
      <Button 
        className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-800"
        onClick={handleAppleLogin}
        type="button"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.07-.47-2.05-.48-3.18 0-1.42.61-2.16.44-3.03-.41C3.31 15.85 3.96 8.62 8.69 8.28c1.23-.07 2.4.63 3.21.64.82.01 2.11-.77 3.56-.66 1.03.1 3.87.52 4.5 3.87-.12.08-2.69 1.57-2.66 4.62.03 3.68 3.23 4.9 3.26 4.92-.03.09-.5 1.71-1.67 2.61M12.8 7.02c-.66.77-1.83 1.37-2.94 1.29-.15-1.15.43-2.35 1.07-3.12.72-.85 1.96-1.47 2.98-1.51.13 1.19-.35 2.44-1.11 3.34" />
        </svg>
        {context === 'signup' ? 'Sign up with Apple' : 'Login with Apple'}
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
        {context === 'signup' ? 'Sign up with Google' : 'Login with Google'}
      </Button>
    </div>
  );
};

export default SocialLogin;
