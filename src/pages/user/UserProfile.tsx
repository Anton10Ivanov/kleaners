
import { useState } from "react";
import { useUserProfileData } from "@/hooks/useUserProfileData";
import AvatarSection from "@/components/user/profile/AvatarSection";
import ProfileTabs from "@/components/user/profile/ProfileTabs";
import AccountInfoCard from "@/components/user/profile/AccountInfoCard";
import NotificationSettings from "@/components/user/profile/NotificationSettings";
import SecuritySettings from "@/components/user/profile/SecuritySettings";
import AccountPreferences from "@/components/user/profile/AccountPreferences";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * UserProfile Page
 * 
 * Displays and allows editing of user profile information
 * 
 * @returns {JSX.Element} The user profile page
 */
export default function UserProfile(): JSX.Element {
  const [activeTab, setActiveTab] = useState("account");
  
  const {
    userData,
    isLoading,
    error,
    updateUserProfile
  } = useUserProfileData();

  /**
   * Handle tab change
   * @param value - The new tab value
   */
  const handleTabChange = (value: string): void => {
    setActiveTab(value);
  };

  /**
   * Render loading state
   */
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  /**
   * Render error state
   */
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 p-4 rounded-md">
        <h2 className="text-red-800 dark:text-red-200 font-semibold">Failed to load profile</h2>
        <p className="text-red-600 dark:text-red-300">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      {userData && (
        <>
          <AvatarSection 
            avatar={userData.avatar} 
            name={`${userData.firstName} ${userData.lastName}`} 
            updateProfile={updateUserProfile}
          />

          <ProfileTabs activeValue={activeTab} onValueChange={handleTabChange}>
            <Tabs value={activeTab} className="w-full">
              <TabsContent value="account" className="space-y-6">
                <AccountInfoCard 
                  userData={userData}
                  updateUserProfile={updateUserProfile}
                />
                <AccountPreferences 
                  userData={userData}
                  updateUserProfile={updateUserProfile}
                />
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-6">
                <NotificationSettings 
                  preferences={userData.notificationPreferences}
                  updateUserProfile={updateUserProfile}
                />
              </TabsContent>
              
              <TabsContent value="security" className="space-y-6">
                <SecuritySettings />
              </TabsContent>
            </Tabs>
          </ProfileTabs>
        </>
      )}
    </div>
  );
}
