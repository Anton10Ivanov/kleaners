
import React from 'react';
import { useTitle } from '@/hooks/useTitle';
import { useUserProfileData } from '@/hooks/useUserProfileData';
import { User } from 'lucide-react';
import { AccountInfoCard } from '@/components/user/profile/AccountInfoCard';
import { AvatarSection } from '@/components/user/profile/AvatarSection';
import { ProfileSkeleton } from '@/components/user/profile/ProfileSkeleton';
import { ProfileErrorState } from '@/components/user/profile/ProfileErrorState';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardFooter } from '@/components/ui/card';

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
    <div className="container mx-auto p-4 space-y-6 pb-16 md:pb-0">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <Link to="/client/settings">
          <Button variant="outline" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Settings
          </Button>
        </Link>
      </div>
      
      {/* Profile summary card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
          <AvatarSection
            avatarUrl={profile.avatarUrl}
            fullName={profile.fullName}
            onUpdateAvatar={updateAvatar}
          />
        </div>
        
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">{profile.email}</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-muted-foreground">{profile.phone || "Not provided"}</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Member Since</h3>
              <p className="text-muted-foreground">
                {new Date(profile.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="bg-gray-50 px-6 py-4 flex justify-end">
          <Button variant="outline" onClick={() => document.getElementById('edit-profile-button')?.click()}>
            Edit Profile Information
          </Button>
        </CardFooter>
      </Card>
      
      {/* Account Information Card */}
      <div className="mt-8 id="account-details">
        <AccountInfoCard
          profile={profile}
          onSave={updateProfile}
        />
      </div>
      
      {/* Settings shortcuts */}
      <Card className="mt-8">
        <CardHeader>
          <CardDescription className="text-center">
            Manage additional settings
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/client/settings?tab=security">
              <Button variant="outline" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Security Settings
              </Button>
            </Link>
            
            <Link to="/client/settings?tab=notifications">
              <Button variant="outline" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Notification Preferences
              </Button>
            </Link>
            
            <Link to="/client/settings?tab=preferences">
              <Button variant="outline" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Account Preferences
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
