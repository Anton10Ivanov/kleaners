
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const LoginButtons: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => router.push('/login')}
        className="min-h-[44px] px-4"
      >
        Login
      </Button>
      <Button 
        variant="default" 
        size="sm" 
        onClick={() => router.push('/signup')}
        className="min-h-[44px] px-4 bg-primary hover:bg-primary/90"
      >
        Sign up
      </Button>
    </div>
  );
};

export default LoginButtons;
