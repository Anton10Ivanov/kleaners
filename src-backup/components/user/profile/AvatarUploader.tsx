
import React, { ReactNode } from 'react';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

export interface AvatarUploaderProps {
  /** Children to be rendered inside the uploader (typically a button) */
  children?: ReactNode;
  
  /** Callback function when avatar is uploaded */
  onAvatarUpload: (url: string) => Promise<void>;
}

/**
 * AvatarUploader Component
 * 
 * Handles file selection and upload for avatar images
 * 
 * @param {AvatarUploaderProps} props Component props
 * @returns {JSX.Element} Avatar uploader component
 */
export function AvatarUploader({
  children,
  onAvatarUpload
}: AvatarUploaderProps): JSX.Element {
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;
    
    // Validate file type
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }
    
    // Validate file size (1MB)
    if (file.size > 1024 * 1024) {
      alert('Image size should be less than 1MB');
      return;
    }
    
    // In a real app, this would upload the file to storage
    // Here we create a local URL for demo purposes
    const reader = new FileReader();
    reader.onload = async (e) => {
      if (e.target?.result) {
        // Mock successful upload by passing the data URL
        await onAvatarUpload(e.target.result.toString());
      }
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <div>
      <Label 
        htmlFor="avatar-upload" 
        className="cursor-pointer"
      >
        {children || (
          <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 section-spacing-xs">
            <Upload className="mr-2 h-4 w-4" />
            Upload new picture
          </div>
        )}
      </Label>
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
