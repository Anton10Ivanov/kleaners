
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PersonalInfoForm from './PersonalInfoForm';
import { SecuritySettings } from './SecuritySettings';
import { NotificationSettings } from './NotificationSettings';
import { AccountPreferences } from './AccountPreferences';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useForm } from 'react-hook-form';

interface ProfileTabsProps {
  profileData: any;
  isLoading: boolean;
  isSaving: boolean;
  onSubmit: (values: any) => Promise<void>;
}

export const ProfileTabs = ({ 
  profileData, 
  isLoading, 
  isSaving, 
  onSubmit 
}: ProfileTabsProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const form = useForm({
    defaultValues: {
      first_name: profileData?.firstName || '',
      last_name: profileData?.lastName || '',
      email: profileData?.email || '',
      phone: profileData?.phone || '',
      address: profileData?.address || '',
    }
  });
  
  React.useEffect(() => {
    if (profileData) {
      form.reset({
        first_name: profileData.firstName || '',
        last_name: profileData.lastName || '',
        email: profileData.email || '',
        phone: profileData.phone || '',
        address: profileData.address || '',
      });
    }
  }, [profileData, form]);
  
  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className={`${isMobile ? 'grid-cols-2' : 'grid-cols-4'} grid w-full`}>
        <TabsTrigger value="personal">Personal Info</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        {!isMobile && (
          <>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </>
        )}
        {isMobile && (
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        )}
        {isMobile && (
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        )}
      </TabsList>
      
      <TabsContent value="personal">
        <PersonalInfoForm 
          form={form}
          saving={isSaving}
          onSubmit={onSubmit}
          profileData={profileData}
        />
      </TabsContent>
      
      <TabsContent value="security">
        <SecuritySettings />
      </TabsContent>
      
      <TabsContent value="notifications">
        <NotificationSettings />
      </TabsContent>
      
      <TabsContent value="preferences">
        <AccountPreferences />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
