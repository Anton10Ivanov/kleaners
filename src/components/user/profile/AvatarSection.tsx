
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AvatarUploader } from './AvatarUploader';

export interface AvatarSectionProps {
  /** URL of the user's avatar image */
  avatarUrl: string;
  
  /** User's full name */
  fullName: string;
  
  /** Function to handle avatar updates */
  onUpdateAvatar: (url: string) => Promise<void>;
}

/**
 * AvatarSection Component
 * 
 * Displays user avatar with upload functionality
 * 
 * @param {AvatarSectionProps} props Component props
 * @returns {JSX.Element} Avatar section component
 */
export function AvatarSection({
  avatarUrl,
  fullName,
  onUpdateAvatar
}: AvatarSectionProps): JSX.Element {
  return (
    <div className="flex flex-col items-center">
      <Avatar className="h-24 w-24 mb-4">
        <AvatarImage src={avatarUrl} alt={fullName} />
        <AvatarFallback>
          <User className="h-12 w-12" />
        </AvatarFallback>
      </Avatar>
      
      <h2 className="text-xl font-bold mb-4">{fullName}</h2>
      
      <AvatarUploader onAvatarUpload={onUpdateAvatar}>
        <Button variant="outline" size="sm">
          Change Avatar
        </Button>
      </AvatarUploader>
    </div>
  );
}
