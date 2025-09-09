import { cn } from '@/lib/utils';
import { Download, FileText, Image, Paperclip, X } from 'lucide-react';
import { FileAttachment } from '@/utils/chat';
import { Button } from '@/components/ui/button';

interface FileAttachmentProps {
  file: FileAttachment;
  onRemove?: () => void;
  showRemoveButton?: boolean;
  className?: string;
}

const FileAttachmentComponent = ({
  file,
  onRemove,
  showRemoveButton = false,
  className
}: FileAttachmentProps) => {
  const isImage = file.type.startsWith('image/');
  
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  const handleDownload = () => {
    window.open(file.url, '_blank');
  };
  
  return (
    <div className={cn(
      "flex items-center gap-2 p-2 rounded-md border",
      className
    )}>
      {isImage ? (
        <div className="w-8 h-8 flex-shrink-0 rounded overflow-hidden bg-muted">
          <Image 
            src={file.url} 
            alt={file.name} 
            width={500} 
            height={300}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/40x40/gray/white?text=IMG';
            }}
          />
        </div>
      ) : (
        <div className="w-8 h-8 flex-shrink-0 bg-muted rounded flex items-center justify-center">
          <FileText className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{file.name}</div>
        <div className="text-xs text-muted-foreground">{formatSize(file.size)}</div>
      </div>
      
      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7"
          onClick={handleDownload}
        >
          <Download className="h-3.5 w-3.5" />
        </Button>
        
        {showRemoveButton && onRemove && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 text-destructive hover:text-destructive"
            onClick={onRemove}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FileAttachmentComponent;
