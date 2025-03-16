
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
        className="text-slate-700 hover:text-primary dark:text-slate-200"
      >
        Login
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => navigate('/signup')} 
        className="border-primary text-primary font-medium text-sm hover:bg-primary/10"
      >
        Sign up
      </Button>
    </div>
  );
};

export default LoginButtons;
