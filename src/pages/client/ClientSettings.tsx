
import React from 'react';
import { useTitle } from '@/hooks/useTitle';
import { useUserProfileData } from '@/hooks/useUserProfileData';
import { Settings, Shield } from 'lucide-react';
import { AccountPreferences } from '@/components/user/profile/AccountPreferences';
import { SecuritySettings } from '@/components/user/profile/SecuritySettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { ProfileSkeleton } from '@/components/user/profile/ProfileSkeleton';
import { ProfileErrorState } from '@/components/user/profile/ProfileErrorState';

/**
 * ClientSettings Page
 * 
 * Manages client application settings
 * 
 * @returns {JSX.Element} Client settings page component
 */
export default function ClientSettings(): JSX.Element {
  useTitle("Settings | Kleaners");
  
  const {
    profile,
    isLoading: profileLoading,
    error: profileError,
    updateProfile,
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
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-zinc-800">No profile data available</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6 pb-16 md:pb-0">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Settings</h1>
      
      <Tabs defaultValue="preferences" className="w-full">
        <TabsList className="w-full max-w-3xl mx-auto grid grid-cols-2 mb-8">
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Security</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="max-w-3xl mx-auto">
          <TabsContent value="preferences">
            <Card className="bg-card text-card-foreground">
              <CardContent className="pt-6">
                <CardDescription className="mb-4 text-center">
                  Customize your application experience
                </CardDescription>
                <AccountPreferences
                  preferences={profile.accountPreferences}
                  onSave={(prefs) => updateProfile({ accountPreferences: prefs })}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card className="bg-card text-card-foreground">
              <CardContent className="pt-6">
                <CardDescription className="mb-4 text-center">
                  Manage your account security
                </CardDescription>
                <SecuritySettings
                  passwordStrength={passwordStrength}
                  onPasswordCheck={checkPasswordStrength}
                  onPasswordChange={changePassword}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
