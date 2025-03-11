
import React from 'react';
import LoginButtons from './LoginButtons';
import UserMenu from './UserMenu';
import useAuthState from './useAuthState';

const AuthButtons: React.FC = () => {
  const { loading, user, userProfile, userRole, setLoading } = useAuthState();

  if (user) {
    return (
      <UserMenu 
        loading={loading} 
        user={user} 
        userProfile={userProfile} 
        userRole={userRole}
        setLoading={setLoading}
      />
    );
  }

  return <LoginButtons />;
};

export default AuthButtons;
