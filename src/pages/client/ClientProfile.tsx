
import React from 'react';
import { useTitle } from '@/hooks/useTitle';
import { useUserProfileData } from '@/hooks/useUserProfileData';
import { User, Mail, Phone, Calendar, Settings } from 'lucide-react';
import { AccountInfoCard } from '@/components/user/profile/AccountInfoCard';
import { AvatarSection } from '@/components/user/profile/AvatarSection';
import { ProfileSkeleton } from '@/components/user/profile/ProfileSkeleton';
import { ProfileErrorState } from '@/components/user/profile/ProfileErrorState';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, Bell } from '@/components/user/profile/icons';

/**
 * ClientProfile Page
 * 
 * Displays and manages client profile information
 * 
 * @returns {JSX.Element} Client profile page component
 */
export default function ClientProfile(): JSX.Element {
  useTitle("Your Profile | Kleaners");
  
  const {
    profile,
    isLoading: profileLoading,
    error: profileError,
    updateProfile,
    updateAvatar,
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
    <div className="container mx-auto p-4 space-y-6 pb-16 md:pb-0 max-w-4xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <Link to="/client/settings">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Account Settings
          </Button>
        </Link>
      </div>
      
      {/* Profile summary card */}
      <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-8">
          <AvatarSection
            avatarUrl={profile.avatarUrl}
            fullName={profile.fullName}
            onUpdateAvatar={updateAvatar}
          />
          
          <Badge className="mt-4 bg-primary/80" variant="secondary">
            Client Account
          </Badge>
        </div>
        
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
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
        </CardContent>
      </Card>
      
      {/* Account Information Card */}
      <div className="mt-8" id="account-details">
        <Card className="shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Personal Information</CardTitle>
            <CardDescription>
              Update your basic account details
            </CardDescription>
          </CardHeader>
          
          <Separator className="mx-6" />
          
          <AccountInfoCard
            profile={profile}
            onSave={updateProfile}
          />
        </Card>
      </div>
      
      {/* Settings shortcuts */}
      <Card className="shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl">Quick Settings</CardTitle>
          <CardDescription>
            Manage your preferences and security
          </CardDescription>
        </CardHeader>
        
        <Separator className="mx-6 mb-6" />
        
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/client/settings?tab=security" className="w-full">
            <Button variant="outline" size="lg" className="w-full justify-start h-auto py-6">
              <div className="flex flex-col items-start text-left">
                <span className="flex items-center text-base font-medium">
                  <Shield className="mr-2 h-5 w-5 text-primary" />
                  Security
                </span>
                <span className="text-xs text-muted-foreground mt-1 pl-7">
                  Manage your password and account security
                </span>
              </div>
            </Button>
          </Link>
          
          <Link to="/client/settings?tab=notifications" className="w-full">
            <Button variant="outline" size="lg" className="w-full justify-start h-auto py-6">
              <div className="flex flex-col items-start text-left">
                <span className="flex items-center text-base font-medium">
                  <Bell className="mr-2 h-5 w-5 text-primary" />
                  Notifications
                </span>
                <span className="text-xs text-muted-foreground mt-1 pl-7">
                  Control how we contact you
                </span>
              </div>
            </Button>
          </Link>
          
          <Link to="/client/settings?tab=preferences" className="w-full">
            <Button variant="outline" size="lg" className="w-full justify-start h-auto py-6">
              <div className="flex flex-col items-start text-left">
                <span className="flex items-center text-base font-medium">
                  <User className="mr-2 h-5 w-5 text-primary" />
                  Preferences
                </span>
                <span className="text-xs text-muted-foreground mt-1 pl-7">
                  Customize your user experience
                </span>
              </div>
            </Button>
          </Link>
        </CardContent>
        
        <CardFooter className="justify-center pb-6 pt-2">
          <Link to="/client/settings">
            <Button variant="ghost" className="text-sm">
              View all settings
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
