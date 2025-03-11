
import React, { useState, useRef } from 'react';
import { formatFileSize } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { FileAttachment } from '@/utils/chat';

interface FileUploadProps {
  children: React.ReactNode;
  onFilesSelected: (files: FileAttachment[]) => void;
  maxFileSize?: number; // in bytes, default 5MB
  allowedFileTypes?: string[]; // e.g. ['image/jpeg', 'image/png']
}

const FileUpload = ({
  children,
  onFilesSelected,
  maxFileSize = 5 * 1024 * 1024, // 5MB default
  allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain']
}: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;
    
    const fileAttachments: FileAttachment[] = [];
    const errors: string[] = [];
    
    Array.from(selectedFiles).forEach(file => {
      // Check file size
      if (file.size > maxFileSize) {
        errors.push(`${file.name} exceeds the maximum file size of ${formatFileSize(maxFileSize)}`);
        return;
      }
      
      // Check file type
      if (allowedFileTypes.length > 0 && !allowedFileTypes.includes(file.type)) {
        errors.push(`${file.name} has an unsupported file type`);
        return;
      }
      
      // Create object URL for preview
      const url = URL.createObjectURL(file);
      
      fileAttachments.push({
        id: `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        url
      });
    });
    
    // Show errors if any
    if (errors.length > 0) {
      toast({
        title: "File upload error",
        description: errors.join('. '),
        variant: "destructive"
      });
    }
    
    // Clear input for future selections
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Pass valid files to parent
    if (fileAttachments.length > 0) {
      onFilesSelected(fileAttachments);
    }
  };
  
  return (
    <div onClick={handleClick} className="cursor-pointer">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
        accept={allowedFileTypes.join(',')}
      />
      {children}
    </div>
  );
};

export default FileUpload;
