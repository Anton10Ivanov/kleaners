
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LoginButtons: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => navigate('/login')}
        className="min-h-[44px] px-4"
      >
        Login
      </Button>
      <Button 
        variant="default" 
        size="sm" 
        onClick={() => navigate('/signup')}
        className="min-h-[44px] px-4 bg-primary hover:bg-primary/90"
      >
        Sign up
      </Button>
    </div>
  );
};

export default LoginButtons;
