
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
    recipientId,
    recipientName
  );
  
  // Mark messages as read when the chat interface is opened
  useEffect(() => {
    if (messages.length > 0) {
      const unreadMessageIds = messages
        .filter(msg => msg.sender_id === recipientId && !msg.is_read)
        .map(msg => msg.id);
        
      if (unreadMessageIds.length > 0) {
        markMessagesAsRead(unreadMessageIds).catch(console.error);
      }
    }
  }, [messages, recipientId]);
  
  return (
    <Box className="flex flex-col h-full border rounded-md overflow-hidden">
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList 
          messages={messages} 
          userId={userId} 
          isLoading={isLoading} 
          isTyping={isTyping} 
        />
      </div>
      
      {/* Input area */}
      <MessageInput onSendMessage={sendMessage} isLoading={isLoading} />
    </Box>
  );
};

export default ChatInterface;
