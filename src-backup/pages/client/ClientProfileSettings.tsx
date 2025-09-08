import React from 'react';
import { useTitle } from '@/hooks/useTitle';
import { useUserProfileData } from '@/hooks/useUserProfileData';
import { 
  User, 
  Settings, 
  Shield, 
  Mail, 
  Phone, 
  Calendar, 
  Bell,
  Palette,
  Globe,
  Lock,
  Upload,
  Camera,
  Calendar as CalendarIcon,
  Smartphone
} from 'lucide-react';
import { AccountInfoCard } from '@/components/user/profile/AccountInfoCard';
import { AvatarSection } from '@/components/user/profile/AvatarSection';
import { AccountPreferences } from '@/components/user/profile/AccountPreferences';
import { SecuritySettings } from '@/components/user/profile/SecuritySettings';
import { ProfileSkeleton } from '@/components/user/profile/ProfileSkeleton';
import { ProfileErrorState } from '@/components/user/profile/ProfileErrorState';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

/**
 * ClientProfileSettings Page
 * 
 * Unified profile and settings management with modern UI
 * 
 * @returns {JSX.Element} Client profile settings page component
 */
export default function ClientProfileSettings(): JSX.Element {
  useTitle("Profile Settings | Kleaners");
  
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
    <div className="container mx-auto card-spacing-sm form-spacing-loose pb-16 md:pb-0 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account information, preferences, and security settings
        </p>
      </div>
      
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Personal Info</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Login & Security</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Personal Info Tab */}
        <TabsContent value="personal" className="space-y-6">
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4 bg-gradient-to-r from-primary/20 to-primary/10">
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Manage your basic account details and contact information
              </CardDescription>
            </CardHeader>
            
            <CardContent className="card-spacing-md">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Avatar section */}
                <div className="flex-shrink-0 flex flex-col items-center lg:w-1/3">
                  <AvatarSection
                    avatarUrl={profile.avatarUrl}
                    fullName={profile.fullName}
                    onUpdateAvatar={updateAvatar}
                  />
                  
                  {/* Upload Photo Section */}
                  <div className="mt-4 w-full">
                    <Button variant="outline" className="w-full flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Upload Photo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      JPG, PNG up to 5MB
                    </p>
                  </div>
                  
                  <Badge className="mt-4 bg-primary/80" variant="secondary">
                    Client Account
                  </Badge>
                  
                  <div className="mt-4 w-full form-spacing-normal">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-sm">Member Since</h3>
                        <p className="text-muted-foreground">
                          {new Date(profile.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Separator for medium and up screens */}
                <div className="hidden lg:block">
                  <Separator orientation="vertical" className="h-full" />
                </div>
                
                {/* Visible separator for mobile */}
                <Separator className="lg:hidden my-2" />
                
                {/* User info */}
                <div className="flex-grow lg:w-2/3">
                  <AccountInfoCard
                    profile={profile}
                    onSave={updateProfile}
                  />
                  
                  <div className="mt-6 grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-sm">Email</h3>
                        <p className="text-muted-foreground">{profile.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-sm">Phone</h3>
                        <p className="text-muted-foreground">{profile.phone || "Not provided"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calendar Integration */}
          <Card className="bg-card text-card-foreground shadow-lg">
            <CardHeader className="pb-4 bg-gradient-to-r from-blue-500/20 to-blue-600/10">
              <CardTitle className="text-xl flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Calendar Integration
              </CardTitle>
              <CardDescription>
                Sync your cleaning appointments with your calendar
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    <span>Google Calendar</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Import appointments</span>
                </Button>
                
                <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    <span>Apple Calendar</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Sync with iCal</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Login & Security Tab */}
        <TabsContent value="security" className="space-y-6">
          {/* Account Preferences */}
          <Card className="bg-card text-card-foreground shadow-lg">
            <CardHeader className="pb-4 bg-gradient-to-r from-blue-500/20 to-blue-600/10">
              <CardTitle className="text-xl flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Account Preferences
              </CardTitle>
              <CardDescription>
                Customize your application experience and notification settings
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <AccountPreferences
                preferences={profile.accountPreferences}
                onSave={(prefs) => updateProfile({ accountPreferences: prefs })}
              />
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-card text-card-foreground shadow-lg">
            <CardHeader className="pb-4 bg-gradient-to-r from-red-500/20 to-red-600/10">
              <CardTitle className="text-xl flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your account security and password settings
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <SecuritySettings
                passwordStrength={passwordStrength}
                onPasswordCheck={checkPasswordStrength}
                onPasswordChange={changePassword}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
