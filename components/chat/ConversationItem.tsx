
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Conversation } from '@/utils/chat';

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: () => void;
}

const ConversationItem = ({ conversation, isSelected, onSelect }: ConversationItemProps) => {
  const hasUnread = conversation.unreadCount > 0;
  
  return (
    <div
      className={cn(
        "flex items-center gap-3 card-spacing-xs rounded-md cursor-pointer transition-colors",
        isSelected 
          ? "bg-primary text-primary-foreground" 
          : "hover:bg-muted",
        hasUnread && !isSelected && "bg-accent/20"
      )}
      onClick={onSelect}
    >
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarImage src={`https://avatar.vercel.sh/${conversation.participant?.id}`} />
        <AvatarFallback>{conversation.participant?.name[0]}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h4 className={cn(
            "font-medium truncate",
            hasUnread && !isSelected && "font-bold"
          )}>
            {conversation.participant?.name}
          </h4>
          
          {(conversation.lastMessage || conversation.latestMessage) && (
            <span className={cn(
              "text-xs",
              isSelected ? "text-primary-foreground/70" : "text-muted-foreground"
            )}>
              {formatDistanceToNow(
                new Date(conversation.lastMessage?.timestamp || conversation.latestMessage?.sent_at || new Date()), 
                { addSuffix: false }
              )}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          {(conversation.lastMessage?.senderId === conversation.participant?.id || 
            conversation.latestMessage?.isFromMe) && (
            <Check className={cn(
              "h-3 w-3 flex-shrink-0",
              (conversation.lastMessage?.read || conversation.latestMessage?.is_read)
                ? "text-green-500" 
                : "text-gray-400"
            )} />
          )}
          
          <p className={cn(
            "text-sm truncate",
            isSelected 
              ? "text-primary-foreground/70" 
              : "text-muted-foreground",
            hasUnread && !isSelected && "text-foreground font-medium"
          )}>
            {(conversation.lastMessage || conversation.latestMessage)
              ? ((conversation.lastMessage?.attachments?.length || conversation.latestMessage?.attachments?.length) 
                  ? '📎 Attachment' 
                  : conversation.lastMessage?.content || conversation.latestMessage?.content || 'New message')
              : 'No messages yet'}
          </p>
          
          {hasUnread && !isSelected && (
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
