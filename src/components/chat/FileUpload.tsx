
import React, { useState, useRef } from 'react';
import { Paperclip, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FileAttachment } from '@/utils/chatUtils';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import FileAttachmentComponent from './FileAttachment';

interface FileUploadProps {
  onFileSelect: (files: FileAttachment[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  className?: string;
}

export const FileUpload = ({ 
  onFileSelect,
  maxFiles = 5,
  maxSizeMB = 10,
  className
}: FileUploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState<FileAttachment[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    processFiles(Array.from(e.target.files));
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;
    processFiles(Array.from(e.dataTransfer.files));
  };
  
  const processFiles = async (files: File[]) => {
    if (selectedFiles.length + files.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `You can only upload up to ${maxFiles} files at once.`,
        variant: "destructive"
      });
      return;
    }
    
    const validFiles: FileAttachment[] = [];
    
    for (const file of files) {
      if (file.size > maxSizeBytes) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the maximum size of ${maxSizeMB}MB.`,
          variant: "destructive"
        });
        continue;
      }
      
      // Generate a URL for the file (for preview)
      const fileUrl = URL.createObjectURL(file);
      
      validFiles.push({
        id: `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        name: file.name,
        type: file.type,
        url: fileUrl,
        size: file.size,
        file: file // Store the actual File object for upload
      });
    }
    
    if (validFiles.length > 0) {
      const newFiles = [...selectedFiles, ...validFiles];
      setSelectedFiles(newFiles);
      onFileSelect(newFiles);
    }
  };
  
  const removeFile = (id: string) => {
    const newFiles = selectedFiles.filter(file => file.id !== id);
    setSelectedFiles(newFiles);
    onFileSelect(newFiles);
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div className={cn("space-y-2", className)}>
      {selectedFiles.length > 0 && (
        <div className="space-y-2 mb-2">
          {selectedFiles.map(file => (
            <FileAttachmentComponent 
              key={file.id} 
              file={file} 
              onRemove={() => removeFile(file.id)} 
            />
          ))}
        </div>
      )}
      
      <div 
        className={cn(
          "border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          style={{ display: 'none' }} 
          multiple 
        />
        
        <Paperclip className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm mb-1">
          <span className="font-medium">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-muted-foreground">
          Up to {maxFiles} files (max {maxSizeMB}MB each)
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
