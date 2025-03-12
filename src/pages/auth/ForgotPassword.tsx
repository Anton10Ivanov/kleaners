
import React from 'react';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';

const ForgotPassword = () => {
  const handleBackToLogin = () => {
    window.location.href = '/auth/login';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <ResetPasswordForm onBackToLogin={handleBackToLogin} />
    </div>
  );
};

export default ForgotPassword;
