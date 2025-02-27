
import { useOutletContext } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import { FormProvider } from "react-hook-form";

import PersonalInfoForm from "@/components/user/profile/PersonalInfoForm";
import AccountInfoCard from "@/components/user/profile/AccountInfoCard";
import { useProfile } from "@/hooks/useProfile";

interface UserContextType {
  user: User;
}

const UserProfile = () => {
  const { user } = useOutletContext<UserContextType>();
  const { 
    form, 
    loading, 
    saving, 
    avatarUrl, 
    setAvatarUrl, 
    onSubmit,
    handleAvatarChange
  } = useProfile(user);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormProvider {...form}>
          <PersonalInfoForm 
            form={form} 
            onSubmit={onSubmit} 
            saving={saving} 
          />
          
          <AccountInfoCard 
            user={user} 
            avatarUrl={avatarUrl} 
            setAvatarUrl={setAvatarUrl}
            onAvatarChange={handleAvatarChange}
          />
        </FormProvider>
      </div>
    </div>
  );
};

export default UserProfile;
