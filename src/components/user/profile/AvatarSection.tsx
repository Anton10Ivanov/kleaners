
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, UserCircle, Camera, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/types/supabase";

interface AvatarSectionProps {
  user: User;
  avatarUrl: string | null;
  setAvatarUrl: (url: string | null) => void;
  onAvatarChange: (url: string | null) => void;
}

const AvatarSection = ({ user, avatarUrl, setAvatarUrl, onAvatarChange }: AvatarSectionProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `avatars/${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      if (data) {
        setAvatarUrl(data.publicUrl);
        onAvatarChange(data.publicUrl);
      }
      
      toast({
        title: "Avatar uploaded",
        description: "Your profile picture has been updated."
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "We couldn't upload your avatar. Please try again later."
      });
    } finally {
      setUploading(false);
      // Reset file input value to allow selecting the same file again
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeAvatar = async () => {
    if (!avatarUrl) return;
    
    try {
      setUploading(true);
      
      // Extract file path from the URL
      const filePathMatch = avatarUrl.match(/avatars\/(.+)$/);
      if (filePathMatch && filePathMatch[1]) {
        const filePath = `avatars/${filePathMatch[1]}`;
        
        // Delete the file from storage
        const { error: deleteError } = await supabase.storage
          .from('avatars')
          .remove([filePath]);
        
        if (deleteError) throw deleteError;
      }
      
      // Update profile to remove avatar_url
      const { error: updateError } = await supabase
        .from('customers')
        .update({ avatar_url: null })
        .eq('id', user.id);
      
      if (updateError) throw updateError;
      
      setAvatarUrl(null);
      onAvatarChange(null);
      
      toast({
        title: "Avatar removed",
        description: "Your profile picture has been removed."
      });
    } catch (error) {
      console.error('Error removing avatar:', error);
      toast({
        variant: "destructive",
        title: "Error removing avatar",
        description: "We couldn't remove your avatar. Please try again later."
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div 
        className="relative group cursor-pointer mb-4"
        onClick={handleAvatarClick}
      >
        <div className="bg-primary/10 p-6 rounded-full overflow-hidden w-24 h-24 flex items-center justify-center">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt="User avatar" 
              className="w-full h-full object-cover rounded-full" 
            />
          ) : (
            <UserCircle className="h-16 w-16 text-primary" />
          )}
        </div>
        <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Camera className="h-8 w-8 text-white" />
        </div>
        <input 
          type="file" 
          ref={fileInputRef}
          accept="image/*"
          onChange={uploadAvatar}
          className="hidden"
        />
      </div>
      
      {uploading && (
        <div className="mb-4 flex items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          <span className="text-sm">Processing...</span>
        </div>
      )}
      
      {avatarUrl && (
        <Button 
          variant="outline" 
          size="sm" 
          className="mb-4" 
          onClick={removeAvatar}
          disabled={uploading}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Remove Photo
        </Button>
      )}
    </div>
  );
};

export default AvatarSection;
