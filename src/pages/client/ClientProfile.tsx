
import React from 'react';
import { useTitle } from '@/hooks/useTitle';
import { useUserProfileData } from '@/hooks/useUserProfileData';
import { Mail, Phone, Calendar } from 'lucide-react';
import { AccountInfoCard } from '@/components/user/profile/AccountInfoCard';
import { AvatarSection } from '@/components/user/profile/AvatarSection';
import { ProfileSkeleton } from '@/components/user/profile/ProfileSkeleton';
import { ProfileErrorState } from '@/components/user/profile/ProfileErrorState';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
      <h1 className="text-2xl font-bold">Your Profile</h1>
      
      {/* Combined profile card with personal information */}
      <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-4 bg-gradient-to-r from-primary/20 to-primary/10">
          <CardTitle className="text-xl">Personal Information</CardTitle>
          <CardDescription>
            Manage your basic account details
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Avatar section on the left/top */}
            <div className="flex-shrink-0 flex flex-col items-center lg:w-1/3">
              <AvatarSection
                avatarUrl={profile.avatarUrl}
                fullName={profile.fullName}
                onUpdateAvatar={updateAvatar}
              />
              
              <Badge className="mt-4 bg-primary/80" variant="secondary">
                Client Account
              </Badge>
              
              <div className="mt-4 w-full space-y-3">
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
            
            {/* User info on the right/bottom */}
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
    </div>
  );
}
