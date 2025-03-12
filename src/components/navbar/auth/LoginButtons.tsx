
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LoginButtons = () => {
  return (
    <div className="flex gap-2">
      <Button variant="ghost" asChild>
        <Link to="/auth/login">Login</Link>
      </Button>
      <Button variant="default" asChild>
        <Link to="/auth/register">Register</Link>
      </Button>
    </div>
  );
};

export default LoginButtons;
