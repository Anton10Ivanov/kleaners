
import { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FileUpload from './FileUpload';
import { FileAttachment } from '@/utils/chat';

interface MessageInputProps {
  onSendMessage: (message: string, attachments: FileAttachment[]) => void;
  isLoading: boolean;
}

const MessageInput = ({ onSendMessage, isLoading }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const [fileAttachments, setFileAttachments] = useState<FileAttachment[]>([]);
  
  const handleSend = () => {
    if ((!message.trim() && fileAttachments.length === 0) || isLoading) return;
    
    onSendMessage(message, fileAttachments);
    setMessage('');
    setFileAttachments([]);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleFileSelect = (files: FileAttachment[]) => {
    setFileAttachments(prev => [...prev, ...files]);
  };
  
  const handleRemoveFile = (index: number) => {
    setFileAttachments(prev => prev.filter((_, i) => i !== index));
  };
  
  return (
    <>
      {/* Attachments preview */}
      {fileAttachments.length > 0 && (
        <div className="px-4 py-2 border-t grid grid-cols-1 sm:grid-cols-2 gap-2">
          {fileAttachments.map((file, index) => (
            <div key={index} className="relative">
              <div className="flex items-center p-2 rounded-md border bg-background">
                <div className="flex-1 truncate text-sm">{file.name}</div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 w-7 p-0" 
                  onClick={() => handleRemoveFile(index)}
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
      )}
      
      {/* Input area */}
      <div className="p-3 border-t flex items-center gap-2">
        <FileUpload onFilesSelected={handleFileSelect}>
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
        </FileUpload>
        
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1"
        />
        
        <Button 
          onClick={handleSend} 
          size="icon"
          disabled={(!message.trim() && fileAttachments.length === 0) || isLoading}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
};

export default MessageInput;
