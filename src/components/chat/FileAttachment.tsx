
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FileAttachment } from '@/utils/chatUtils';

interface FileAttachmentProps {
  file: FileAttachment;
  onRemove?: () => void;
  showRemoveButton?: boolean;
}

const FileAttachmentComponent: React.FC<FileAttachmentProps> = ({ 
  file, 
  onRemove,
  showRemoveButton = true
}) => {
  const isImage = file.type.startsWith('image/');
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  return (
    <div className="relative flex items-center rounded-md border bg-background p-2 text-sm">
      {isImage && file.url && (
        <div className="mr-2 h-10 w-10 overflow-hidden rounded">
          <img 
            src={file.url} 
            alt={file.name} 
            className="h-full w-full object-cover"
          />
        </div>
      )}
      
      {!isImage && (
        <div className="mr-2 flex h-10 w-10 items-center justify-center rounded bg-primary/10 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
      )}
      
      <div className="flex-1 overflow-hidden">
        <p className="truncate font-medium">{file.name}</p>
        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
      </div>
      
      {showRemoveButton && onRemove && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 rounded-full"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Remove file</span>
        </Button>
      )}
    </div>
  );
};

export default FileAttachmentComponent;
