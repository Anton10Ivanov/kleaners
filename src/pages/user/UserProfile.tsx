import { useOutletContext } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { FormProvider } from "react-hook-form";
import type { User } from "@/types/supabase";
import { motion } from "framer-motion";
import PersonalInfoForm from "@/components/user/profile/PersonalInfoForm";
import AccountInfoCard from "@/components/user/profile/AccountInfoCard";
import { useProfile } from "@/hooks/useProfile";
interface UserContextType {
  user: User;
}
const UserProfile = () => {
  const {
    user
  } = useOutletContext<UserContextType>();
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
    return <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>;
  }
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.3
  }} className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormProvider {...form}>
          <motion.div initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.4
        }} className="md:col-span-2">
            <PersonalInfoForm form={form} onSubmit={onSubmit} saving={saving} />
          </motion.div>
          
          <AccountInfoCard user={user} avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl} onAvatarChange={handleAvatarChange} />
        </FormProvider>
      </div>
    </motion.div>;
};
export default UserProfile;