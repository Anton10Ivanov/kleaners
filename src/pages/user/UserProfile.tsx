
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AvatarUploader } from '@/components/user/profile/AvatarUploader';
import { ProfileTabs } from '@/components/user/profile/ProfileTabs';
import { useUserProfileData } from '@/hooks/useUserProfileData';
import { useMediaQuery } from '@/hooks/use-media-query';

export const UserProfile = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { 
    form, 
    loading, 
    saving, 
    avatarUrl, 
    setAvatarUrl, 
    onSubmit, 
    handleAvatarChange,
    profileData 
  } = useUserProfileData();

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px]">
            <div className="animate-pulse flex flex-col items-center w-full">
              <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-24 w-24 mb-6" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full mb-6" />
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`${isMobile ? 'p-4' : 'p-6'}`}>
      <Card>
        <CardContent className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-6 p-6`}>
          {/* Avatar Section */}
          <div className={`${isMobile ? 'w-full mb-6' : 'w-1/4'} flex flex-col items-center`}>
            <AvatarUploader 
              avatarUrl={avatarUrl}
              firstName={profileData?.first_name}
              lastName={profileData?.last_name}
              onAvatarChange={handleAvatarChange}
              isLoading={loading || saving}
            />
          </div>
          
          {/* Profile Tab Sections */}
          <div className={`${isMobile ? 'w-full' : 'w-3/4'}`}>
            <ProfileTabs 
              profileData={profileData}
              isLoading={loading}
              isSaving={saving}
              onSubmit={onSubmit}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
