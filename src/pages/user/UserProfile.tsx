
import React from 'react';
import { useTitle } from '@/hooks/useTitle';
import { useUserProfileData } from '@/hooks/useUserProfileData';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, Bell, FileText, User } from 'lucide-react';
import { AccountInfoCard } from '@/components/user/profile/AccountInfoCard';
import { SecuritySettings } from '@/components/user/profile/SecuritySettings';
import { AccountPreferences } from '@/components/user/profile/AccountPreferences';
import { AvatarSection } from '@/components/user/profile/AvatarSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { NotificationsPanel } from '@/components/user/profile/NotificationsPanel';

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
    isLoading: profileLoading,
    error: profileError,
    updateProfile,
    updateAvatar,
    passwordStrength,
    checkPasswordStrength,
    changePassword
  } = useUserProfileData();
  
  // Loading state for profile
  if (profileLoading) {
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
  if (profileError) {
    return (
      <div className="container mx-auto px-4 py-6 flex flex-col items-center text-center">
        <AlertTriangle className="h-12 w-12 text-amber-500 mb-2" />
        <h2 className="text-xl font-semibold">Error Loading Profile</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{profileError.message}</p>
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
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        {/* Account Information Accordion */}
        <AccordionItem value="account-info" className="border rounded-lg shadow-sm overflow-hidden">
          <AccordionTrigger className="p-4 hover:no-underline">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2 text-primary" />
              <span className="font-semibold">Account Information</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <AccountInfoCard
              profile={profile}
              onSave={updateProfile}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Security Settings Accordion */}
        <AccordionItem value="security" className="border rounded-lg shadow-sm overflow-hidden">
          <AccordionTrigger className="p-4 hover:no-underline">
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-primary" />
              <span className="font-semibold">Security Settings</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <SecuritySettings
              passwordStrength={passwordStrength}
              onPasswordCheck={checkPasswordStrength}
              onPasswordChange={changePassword}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Notifications Accordion - Now using the combined component */}
        <AccordionItem value="notifications" className="border rounded-lg shadow-sm overflow-hidden">
          <AccordionTrigger className="p-4 hover:no-underline">
            <div className="flex items-center">
              <Bell className="h-5 w-5 mr-2 text-primary" />
              <span className="font-semibold">Notifications</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <NotificationsPanel
              preferences={profile.notificationPreferences}
              onSave={(prefs) => updateProfile({ notificationPreferences: prefs })}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Account Preferences Accordion */}
        <AccordionItem value="account-prefs" className="border rounded-lg shadow-sm overflow-hidden">
          <AccordionTrigger className="p-4 hover:no-underline">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2 text-primary" />
              <span className="font-semibold">Account Preferences</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <AccountPreferences
              preferences={profile.accountPreferences}
              onSave={(prefs) => updateProfile({ accountPreferences: prefs })}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
