
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <ResetPasswordForm onBackToLogin={handleBackToLogin} />
    </div>
  );
};

export default ForgotPassword;
