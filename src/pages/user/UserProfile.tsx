
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { TabsContent } from "@/components/ui/tabs";
import { useUserProfileData } from "@/hooks/useUserProfileData";
import AvatarSection from "@/components/user/profile/AvatarSection";
import ProfileTabs from "@/components/user/profile/ProfileTabs";
import AccountInfoCard from "@/components/user/profile/AccountInfoCard";
import { NotificationSettings } from "@/components/user/profile/NotificationSettings";
import { SecuritySettings } from "@/components/user/profile/SecuritySettings";
import { AccountPreferences } from "@/components/user/profile/AccountPreferences";

/**
 * UserProfile Page Component
 * 
 * Displays and allows editing of user profile information, security settings,
 * notification preferences, and account settings
 * 
 * @returns {JSX.Element} User profile page component
 */
export default function UserProfile(): JSX.Element {
  const [activeTab, setActiveTab] = useState("account");
  const { toast } = useToast();
  const { 
    userData, 
    isLoading, 
    error, 
    updateUserProfile,
    passwordStrength,
    checkPasswordStrength,
    changePassword 
  } = useUserProfileData();

  /**
   * Handle tab changes
   * @param value - The tab value to change to
   */
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  /**
   * Show a confirmation toast after successful updates
   */
  const showSuccessToast = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  /**
   * Update user profile information
   * @param updates - Partial user data to update
   */
  const updateProfile = async (updates: Partial<typeof userData>) => {
    try {
      await updateUserProfile(updates);
      showSuccessToast();
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center p-8">Loading profile...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Error loading profile: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Sidebar with Avatar */}
        <div>
          <AvatarSection 
            avatarUrl={userData.avatar}
            fullName={userData.firstName + " " + userData.lastName} 
            onUpdateAvatar={(url) => updateProfile({ avatar: url })}
          />
        </div>
        
        {/* Main Content Area */}
        <div className="md:col-span-2">
          <ProfileTabs 
            activeTab={activeTab}
            onTabChange={handleTabChange}
          >
            <TabsContent value="account">
              <AccountInfoCard 
                profile={userData}
                onSave={updateProfile}
              />
            </TabsContent>
            
            <TabsContent value="security">
              <SecuritySettings 
                passwordStrength={passwordStrength}
                onPasswordChange={changePassword}
                onPasswordCheck={checkPasswordStrength}
              />
            </TabsContent>
            
            <TabsContent value="notifications">
              <NotificationSettings 
                preferences={userData.notificationPreferences}
                onSave={(prefs) => updateProfile({ notificationPreferences: prefs })}
              />
            </TabsContent>
            
            <TabsContent value="preferences">
              <AccountPreferences
                preferences={userData.accountPreferences}
                onSave={(prefs) => updateProfile({ accountPreferences: prefs })}
              />
            </TabsContent>
          </ProfileTabs>
        </div>
      </div>
    </div>
  );
}
