
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalInfoForm } from './PersonalInfoForm';
import { SecuritySettings } from './SecuritySettings';
import { NotificationSettings } from './NotificationSettings';
import { AccountPreferences } from './AccountPreferences';
import { useMediaQuery } from '@/hooks/use-media-query';

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
          profileData={profileData} 
          isLoading={isLoading} 
          isSaving={isSaving} 
          onSubmit={onSubmit} 
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
