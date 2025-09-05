
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DesktopControlsProps {
  user: any;
  currentLanguage: 'en' | 'de';
  onLanguageChange: () => void;
}

export const DesktopControls = ({ user }: DesktopControlsProps) => {
  const navigate = useNavigate();

  return (
    <div className="hidden md:flex items-center gap-3">
      {user ? (
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 px-3 py-2 hover:bg-muted"
        >
          <UserCircle className="h-4 w-4" />
          <span className="text-sm font-medium">Dashboard</span>
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => navigate('/auth/login')}
            className="px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Sign In
          </Button>
          <Button
            onClick={() => navigate('/auth/signup')}
            className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary-hover"
          >
            Get Started
          </Button>
        </div>
      )}
    </div>
  );
};
