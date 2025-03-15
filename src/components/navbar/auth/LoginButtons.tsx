
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
      >
        Login
      </Button>
      <Button 
        variant="default" 
        size="sm" 
        onClick={() => navigate('/signup')} 
        className="text-inherit rounded-none bg-[#a6e7b3] font-medium text-sm opacity-50"
      >
        Sign up
      </Button>
    </div>
  );
};

export default LoginButtons;
