
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, CheckCircle2, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import type { User } from "@/types/supabase";
import { motion } from "framer-motion";

interface AccountInfoCardProps {
  user: User;
  avatarUrl: string | null;
  setAvatarUrl: (url: string) => void;
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const AccountInfoCard = ({
  user,
  avatarUrl,
  setAvatarUrl,
  onAvatarChange
}: AccountInfoCardProps) => {
  const [uploading, setUploading] = useState(false);
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      await onAvatarChange(event);
      toast.success("Profile picture updated successfully");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to upload profile picture");
    } finally {
      setUploading(false);
    }
  };

  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.4,
    delay: 0.1
  }} className="col-span-1 md:col-span-1">
      <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-gray-100 dark:border-gray-700 h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">Account Information</CardTitle>
          <CardDescription>View and manage your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                {avatarUrl ? <img src={avatarUrl} alt="User Avatar" className="w-full h-full object-cover" /> : <div className="text-3xl font-bold text-gray-400">
                    {user.email?.[0].toUpperCase() || "U"}
                  </div>}
              </div>
              <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-primary-hover transition-colors">
                <Camera className="h-4 w-4" />
              </label>
              <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={uploading} />
            </div>
            {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
          </div>
          
          <div className="space-y-3 pt-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Email</span>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="font-medium">{user.email}</span>
              </div>
            </div>
            
            {user.user_metadata?.first_name && user.user_metadata?.last_name && (
              <div className="flex flex-col space-y-1 border-t pt-3">
                <span className="text-sm font-medium text-muted-foreground">Name</span>
                <span className="font-medium">
                  {user.user_metadata.first_name} {user.user_metadata.last_name}
                </span>
              </div>
            )}
            
            {user.user_metadata?.phone && (
              <div className="flex flex-col space-y-1 border-t pt-3">
                <span className="text-sm font-medium text-muted-foreground">Phone</span>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="font-medium">{user.user_metadata.phone}</span>
                </div>
              </div>
            )}
            
            {user.user_metadata?.address && (
              <div className="flex flex-col space-y-1 border-t pt-3">
                <span className="text-sm font-medium text-muted-foreground">Address</span>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="font-medium">{user.user_metadata.address}</span>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between border-t pt-3 mt-3">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Email Verified</span>
                <div className="flex items-center">
                  {user.email_confirmed_at ? <>
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-green-600 dark:text-green-400">Verified</span>
                    </> : <span className="text-sm text-yellow-600">Not verified</span>}
                </div>
              </div>
              {!user.email_confirmed_at && <Button size="sm" variant="outline">
                  Verify
                </Button>}
            </div>
            
            <div className="border-t pt-3 mt-3">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Account Created</span>
                <span className="text-sm">
                  {new Date(user.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>;
};

export default AccountInfoCard;
