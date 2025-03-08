
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Message } from '@/utils/chatUtils';
import { CheckCircle, Circle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import FileAttachmentComponent from './FileAttachment';

interface ChatMessageProps {
  message: Message;
  isOwn: boolean;
  showAvatar?: boolean;
}

export const ChatMessage = ({ message, isOwn, showAvatar = true }: ChatMessageProps) => {
  const [timeAgo, setTimeAgo] = useState<string>('');
  
  useEffect(() => {
    setTimeAgo(formatDistanceToNow(message.sent_at, { addSuffix: true }));
    
    const interval = setInterval(() => {
      setTimeAgo(formatDistanceToNow(message.sent_at, { addSuffix: true }));
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [message.sent_at]);
  
  // Render read status indicator
  const renderReadStatus = () => {
    if (!isOwn) return null;
    
    switch (message.status) {
      case 'sending':
        return <Circle className="h-3 w-3 text-gray-400" />;
      case 'sent':
        return <CheckCircle className="h-3 w-3 text-gray-400" />;
      case 'delivered':
        return <CheckCircle className="h-3 w-3 text-blue-400" />;
      case 'read':
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      default:
        return null;
    }
  };
  
  const hasAttachments = message.attachments && message.attachments.length > 0;
  const hasContent = message.content && message.content.trim() !== '';
  
  return (
    <div className={cn(
      "flex items-end gap-2 mb-4",
      isOwn ? "flex-row-reverse" : "flex-row"
    )}>
      {showAvatar && !isOwn && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={`https://avatar.vercel.sh/${message.sender_id}`} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "max-w-[75%]",
        hasContent && "rounded-lg px-4 py-2",
        isOwn 
          ? "bg-primary text-primary-foreground rounded-tr-none" 
          : "bg-muted rounded-tl-none"
      )}>
        {hasContent && (
          <div className="break-words">{message.content}</div>
        )}
        
        {hasAttachments && (
          <div className={cn(
            "flex flex-col gap-2",
            hasContent && "mt-2"
          )}>
            {message.attachments.map(file => (
              <FileAttachmentComponent 
                key={file.id} 
                file={file} 
                showRemove={false}
                className={cn(
                  isOwn 
                    ? "bg-primary-foreground/10 text-primary-foreground" 
                    : "bg-background"
                )}
              />
            ))}
          </div>
        )}
        
        <div className={cn(
          "flex items-center mt-1 text-xs",
          isOwn ? "justify-end" : "justify-start"
        )}>
          <span className={isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}>
            {timeAgo}
          </span>
          
          {isOwn && (
            <span className="ml-1">
              {renderReadStatus()}
            </span>
          )}
        </div>
      </div>
      
      {showAvatar && isOwn && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={`https://avatar.vercel.sh/${message.sender_id}`} />
          <AvatarFallback>Me</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
