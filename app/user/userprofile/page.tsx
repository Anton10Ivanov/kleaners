
import React from 'react';
import { useTitle } from '@/hooks/useTitle';
import { useUserProfileData } from '@/hooks/useUserProfileData';
import { Bell, FileText, User } from 'lucide-react';
import { AccountInfoCard } from '@/components/user/profile/AccountInfoCard';
import { SecuritySettings } from '@/components/user/profile/SecuritySettings';
import { AccountPreferences } from '@/components/user/profile/AccountPreferences';
import { AvatarSection } from '@/components/user/profile/AvatarSection';
import { Accordion } from '@/components/ui/accordion';
import { NotificationsPanel } from '@/components/user/profile/NotificationsPanel';
import { ProfileSkeleton } from '@/components/user/profile/ProfileSkeleton';
import { ProfileErrorState } from '@/components/user/profile/ProfileErrorState';
import { AccordionSection } from '@/components/user/profile/AccordionSection';

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
    return <ProfileSkeleton />;
  }
  
  // Error state
  if (profileError) {
    return <ProfileErrorState message={profileError.message} />;
  }
  
  // No profile data
  if (!profile) {
    return (
      <div className="container mx-auto px-4 section-spacing-sm text-center">
        <p className="text-zinc-800">No profile data available</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto card-spacing-sm form-spacing-loose">
      {/* Avatar and name section */}
      <div className="flex flex-col items-center mb-8">
        <AvatarSection
          avatarUrl={profile.avatarUrl}
          fullName={profile.fullName}
          onUpdateAvatar={updateAvatar}
        />
      </div>
      
      <Accordion type="single" collapsible className="w-full form-spacing-relaxed">
        {/* Account Information Accordion */}
        <AccordionSection
          value="account-info"
          title="Account Information"
          icon={User}
        >
          <AccountInfoCard
            profile={profile}
            onSave={updateProfile}
          />
        </AccordionSection>

        {/* Security Settings Accordion */}
        <AccordionSection
          value="security"
          title="Security Settings"
          icon={FileText}
        >
          <SecuritySettings
            passwordStrength={passwordStrength}
            onPasswordCheck={checkPasswordStrength}
            onPasswordChange={changePassword}
          />
        </AccordionSection>

        {/* Notifications Accordion */}
        <AccordionSection
          value="notifications"
          title="Notifications"
          icon={Bell}
        >
          <NotificationsPanel
            preferences={profile.notificationPreferences}
            onSave={(prefs) => updateProfile({ notificationPreferences: prefs })}
          />
        </AccordionSection>

        {/* Account Preferences Accordion */}
        <AccordionSection
          value="account-prefs"
          title="Account Preferences"
          icon={User}
        >
          <AccountPreferences
            preferences={profile.accountPreferences}
            onSave={(prefs) => updateProfile({ accountPreferences: prefs })}
          />
        </AccordionSection>
      </Accordion>
    </div>
  );
}
