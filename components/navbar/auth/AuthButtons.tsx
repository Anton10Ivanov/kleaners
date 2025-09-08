
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const AuthButtons: React.FC = () => {
  const router = useRouter();
  return <div className="flex items-center gap-1">
      <Button variant="ghost" size="sm" onClick={() => router.push('/login')} className="h-9 px-3 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors">
        Sign In
      </Button>
      <Button variant="ghost" size="sm" onClick={() => router.push('/signup')} className="h-9 px-3 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors">
        Sign Up
      </Button>
    </div>;
};

export default AuthButtons;
