
import { Box } from '@/components/layout/Box';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useChat } from '@/hooks/useChat';
import { markMessagesAsRead } from '@/utils/chat';
import { useEffect } from 'react';

interface ChatInterfaceProps {
  conversationId: string;
  userId: string;
  recipientId: string;
  recipientName: string;
}

const ChatInterface = ({ 
  conversationId, 
  userId, 
  recipientId,
  recipientName 
}: ChatInterfaceProps) => {
  const { messages, isLoading, isTyping, sendMessage } = useChat(
    conversationId,
    userId,
    recipientId
  );
  
  useEffect(() => {
    if (messages.length > 0) {
      markMessagesAsRead(conversationId, userId);
    }
  }, [messages, conversationId, userId]);
  
  return (
    <Box className="flex flex-col h-full border rounded-md overflow-hidden">
      <div className="flex-1 overflow-y-auto card-spacing-sm">
        <MessageList 
          messages={messages} 
          userId={userId} 
          isLoading={isLoading} 
          isTyping={isTyping} 
        />
      </div>
      
      <MessageInput onSendMessage={sendMessage} isLoading={isLoading} />
    </Box>
  );
};

export default ChatInterface;
