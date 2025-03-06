
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { NotificationPreferencesCard } from "@/components/user/settings/NotificationPreferencesCard";
import { PasswordManagementCard } from "@/components/user/settings/PasswordManagementCard";
import { PrivacySecurityCard } from "@/components/user/settings/PrivacySecurityCard";
import { DangerZoneCard } from "@/components/user/settings/DangerZoneCard";
import { useTitle } from "@/hooks/useTitle";

const UserSettings = () => {
  useTitle("Settings | Kleaners");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleNotificationChange = (type: 'email' | 'sms', value: boolean) => {
    if (type === 'email') {
      setEmailNotifications(value);
    } else {
      setSmsNotifications(value);
    }
    
    // In a real app, you would save this to your backend
    toast({
      title: "Notification settings updated",
      description: `${type === 'email' ? 'Email' : 'SMS'} notifications ${value ? 'enabled' : 'disabled'}.`
    });
  };

  const handlePasswordChange = async (newPassword: string) => {
    try {
      // In a real app, this would call the Supabase auth API
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully."
      });
      return true;
    } catch (error) {
      console.error('Error changing password:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to change password."
      });
      return false;
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // This is a simplified version - in a real app, you'd want to:
      // 1. Delete the user's data from your database
      // 2. Then delete the auth account
      
      toast({
        title: "Account deleted",
        description: "Your account has been deleted successfully."
      });
      
      navigate("/");
    } catch (error) {
      console.error('Error deleting account:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete account."
      });
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <NotificationPreferencesCard 
        defaultEmailNotifications={emailNotifications}
        defaultSmsNotifications={smsNotifications}
        onNotificationChange={handleNotificationChange}
      />

      <PasswordManagementCard onPasswordChange={handlePasswordChange} />

      <PrivacySecurityCard />

      <DangerZoneCard onDeleteAccount={handleDeleteAccount} />
    </div>
  );
};

export default UserSettings;
