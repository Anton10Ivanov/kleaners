
import React, { useState } from 'react';
import { useTitle } from '@/hooks/useTitle';
import { useUserProfileData } from '@/hooks/useUserProfileData';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle } from 'lucide-react';
import { AccountInfoCard } from '@/components/user/profile/AccountInfoCard';
import { SecuritySettings } from '@/components/user/profile/SecuritySettings';
import { NotificationSettings } from '@/components/user/profile/NotificationSettings';
import { AccountPreferences } from '@/components/user/profile/AccountPreferences';
import { AvatarSection } from '@/components/user/profile/AvatarSection';

/**
 * UserProfile Page
 * 
 * Displays and manages user profile information
 * 
 * @returns {JSX.Element} User profile page component
 */
export default function UserProfile(): JSX.Element {
  useTitle("Your Profile | Kleaners");
  
  const {
    profile,
    isLoading,
    error,
    updateProfile,
    updateAvatar,
    passwordStrength,
    checkPasswordStrength,
    changePassword
  } = useUserProfileData();
  
  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center mb-6">
          <Skeleton className="h-24 w-24 rounded-full mb-4" />
          <Skeleton className="h-8 w-48 mb-4" />
        </div>
        
        <Card>
          <CardContent className="mt-6">
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 flex flex-col items-center text-center">
        <AlertTriangle className="h-12 w-12 text-amber-500 mb-2" />
        <h2 className="text-xl font-semibold">Error Loading Profile</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{error.message}</p>
      </div>
    );
  }
  
  // No profile data
  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <h2>No profile data available</h2>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Avatar and name section */}
      <div className="flex flex-col items-center mb-8">
        <AvatarSection
          avatarUrl={profile.avatarUrl}
          fullName={profile.fullName}
          onUpdateAvatar={updateAvatar}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Information Card */}
        <AccountInfoCard
          profile={profile}
          onSave={updateProfile}
        />
        
        {/* Security Settings Card */}
        <SecuritySettings
          passwordStrength={passwordStrength}
          onPasswordCheck={checkPasswordStrength}
          onPasswordChange={changePassword}
        />
        
        {/* Notification Settings Card */}
        <NotificationSettings
          preferences={profile.notificationPreferences}
          onSave={(prefs) => updateProfile({ notificationPreferences: prefs })}
        />
        
        {/* Account Preferences Card */}
        <AccountPreferences
          preferences={profile.accountPreferences}
          onSave={(prefs) => updateProfile({ accountPreferences: prefs })}
        />
      </div>
    </div>
  );
}
