
import { Box } from '@/components/layout/Box';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useChat } from '@/hooks/useChat';

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
