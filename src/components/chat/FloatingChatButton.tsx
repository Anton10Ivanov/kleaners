
import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatInterface from './ChatInterface';
import { cn } from '@/lib/utils';
import { createConversation, getUnreadMessageCount } from '@/utils/chat';
import { useToast } from '@/hooks/use-toast';

interface FloatingChatButtonProps {
  userId?: string;
}

const FloatingChatButton = ({ userId = "guest123" }: FloatingChatButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const { toast } = useToast();
  
  // Support team details
  const supportId = "support123";
  const supportName = "Customer Support";
  
  // Create or retrieve conversation on component mount
  useEffect(() => {
    const initializeChat = async () => {
      try {
        // Create or get existing conversation with support
        const convoId = await createConversation(userId, supportId);
        setConversationId(convoId);
        
        // Get unread message count
        const count = await getUnreadMessageCount(userId);
        setUnreadCount(count);
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };
    
    initializeChat();
    
    // Set up polling for unread count (every 30 seconds)
    const interval = setInterval(async () => {
      try {
        const count = await getUnreadMessageCount(userId);
        setUnreadCount(count);
      } catch (error) {
        console.error('Error fetching unread count:', error);
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, [userId]);
  
  const handleOpenChat = () => {
    setIsOpen(true);
    // Reset unread count when opening chat
    setUnreadCount(0);
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-background border rounded-lg shadow-xl w-[350px] h-[500px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          <div className="p-3 border-b bg-muted/30 flex justify-between items-center">
            <h3 className="font-medium">Chat with {supportName}</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-hidden">
            {conversationId ? (
              <ChatInterface
                conversationId={conversationId}
                userId={userId}
                recipientId={supportId}
                recipientName={supportName}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">Initializing chat...</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Button 
          onClick={handleOpenChat}
          className={cn(
            "h-14 w-14 rounded-full shadow-lg",
            "bg-primary hover:bg-primary/90 text-white",
            "flex items-center justify-center relative"
          )}
          data-floating-chat-button
        >
          <MessageCircle className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      )}
    </div>
  );
};

export default FloatingChatButton;
