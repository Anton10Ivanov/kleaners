
import React from 'react';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface AvatarUploaderProps {
  avatarUrl: string;
  firstName?: string;
  lastName?: string;
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

export const AvatarUploader = ({
  avatarUrl,
  firstName = '',
  lastName = '',
  onAvatarChange,
  isLoading
}: AvatarUploaderProps) => {
  // Generate initials from name for avatar fallback
  const getInitials = () => {
    const firstInitial = firstName ? firstName.charAt(0) : '';
    const lastInitial = lastName ? lastName.charAt(0) : '';
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src={avatarUrl} alt="Profile picture" />
        <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
      </Avatar>
      
      <div className="flex flex-col items-center gap-2">
        <Label 
          htmlFor="avatar-upload" 
          className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload new picture
        </Label>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={onAvatarChange}
          className="hidden"
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground">
          JPG, PNG or GIF. 1MB max.
        </p>
      </div>
    </div>
  );
};
