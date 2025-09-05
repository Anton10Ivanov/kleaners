
import { Button } from '@/components/ui/button';
import { FileAttachment } from '@/utils/chat';

interface AttachmentsPreviewProps {
  fileAttachments: FileAttachment[];
  onRemoveFile: (index: number) => void;
}

const AttachmentsPreview = ({ fileAttachments, onRemoveFile }: AttachmentsPreviewProps) => {
  if (fileAttachments.length === 0) return null;
  
  return (
    <div className="px-4 py-2 border-t grid grid-cols-1 sm:grid-cols-2 gap-2">
      {fileAttachments.map((file, index) => (
        <div key={index} className="relative">
          <div className="flex items-center p-2 rounded-md border bg-background">
            <div className="flex-1 truncate text-sm">{file.name}</div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0" 
              onClick={() => onRemoveFile(index)}
            >
              <span className="sr-only">Remove</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttachmentsPreview;
