
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AvatarUploader } from '@/components/user/profile/AvatarUploader';
import { ProfileTabs } from '@/components/user/profile/ProfileTabs';
import { useUserProfileData } from '@/hooks/useUserProfileData';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useForm } from 'react-hook-form';

export const UserProfile = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [saving, setSaving] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  
  const { userData, isLoading, setUserData, updateProfile } = useUserProfileData();
  
  const form = useForm({
    defaultValues: {
      first_name: userData?.firstName || '',
      last_name: userData?.lastName || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
      address: userData?.address || '',
      avatar_url: userData?.avatarUrl || '',
    }
  });

  React.useEffect(() => {
    if (userData) {
      form.reset({
        first_name: userData.firstName || '',
        last_name: userData.lastName || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        avatar_url: userData.avatarUrl || '',
      });
      setAvatarUrl(userData.avatarUrl || '');
    }
  }, [userData, form]);

  const onSubmit = async (values: any) => {
    try {
      setSaving(true);
      // Update local state with form values
      setUserData({
        ...userData!,
        firstName: values.first_name,
        lastName: values.last_name,
        phone: values.phone,
        address: values.address,
      });
      
      await updateProfile();
      
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarUrl(result);
        // You would typically upload this to a server/storage here
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
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
              firstName={userData?.firstName}
              lastName={userData?.lastName}
              onAvatarChange={handleAvatarChange}
              isLoading={isLoading || saving}
            />
          </div>
          
          {/* Profile Tab Sections */}
          <div className={`${isMobile ? 'w-full' : 'w-3/4'}`}>
            <ProfileTabs 
              profileData={userData}
              isLoading={isLoading}
              isSaving={saving}
              onSubmit={onSubmit}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
