
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
const AuthButtons: React.FC = () => {
  const navigate = useNavigate();
  return <div className="flex items-center gap-1">
      <Button variant="ghost" size="sm" onClick={() => navigate('/login')} className="h-10 px-3 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors">
        Sign In
      </Button>
      <Button variant="ghost" size="sm" onClick={() => navigate('/signup')} className="h-10 px-3 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors">
        Sign Up
      </Button>
    </div>;
};
export default AuthButtons;
