
import React from 'react';
import { FileAttachment } from '@/utils/chatUtils';
import { Paperclip, File, Image, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FileAttachmentProps {
  file: FileAttachment;
  onRemove?: () => void;
  className?: string;
  showRemove?: boolean;
}

export const FileAttachmentComponent = ({ 
  file, 
  onRemove, 
  className,
  showRemove = true
}: FileAttachmentProps) => {
  const isImage = file.type.startsWith('image/');
  
  const getFileIcon = () => {
    if (isImage) return <Image className="h-4 w-4" />;
    if (file.type.includes('pdf')) return <FileText className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };
  
  return (
    <div className={cn(
      "flex items-center gap-2 p-2 rounded-md bg-muted/50 text-sm",
      className
    )}>
      <div className="flex-shrink-0 p-1 bg-background rounded">
        {getFileIcon()}
      </div>
      
      <div className="flex-grow min-w-0">
        <div className="truncate font-medium">{file.name}</div>
        <div className="text-xs text-muted-foreground">{formatFileSize(file.size)}</div>
      </div>
      
      {showRemove && onRemove && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default FileAttachmentComponent;
