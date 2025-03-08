
import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatInterface from './ChatInterface';
import { cn } from '@/lib/utils';

interface FloatingChatButtonProps {
  userId?: string;
}

const FloatingChatButton = ({ userId = "guest123" }: FloatingChatButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Use hardcoded values for demo purposes
  const conversationId = "demo-conversation";
  const recipientId = "support123";
  const recipientName = "Customer Support";
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-background border rounded-lg shadow-xl w-[350px] h-[500px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          <div className="p-3 border-b bg-muted/30 flex justify-between items-center">
            <h3 className="font-medium">Chat with {recipientName}</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <ChatInterface
              conversationId={conversationId}
              userId={userId}
              recipientId={recipientId}
              recipientName={recipientName}
            />
          </div>
        </div>
      ) : (
        <Button 
          onClick={() => setIsOpen(true)}
          className={cn(
            "h-14 w-14 rounded-full shadow-lg",
            "bg-primary hover:bg-primary/90 text-white",
            "flex items-center justify-center"
          )}
          data-floating-chat-button
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default FloatingChatButton;
