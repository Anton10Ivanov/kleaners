
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AuthButtons: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/login')}
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Sign In
      </Button>
      <Button 
        onClick={() => navigate('/signup')}
        className="text-sm font-medium bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition-colors"
      >
        Sign Up
      </Button>
    </div>
  );
};

export default AuthButtons;
