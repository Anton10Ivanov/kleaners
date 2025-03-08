
import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

interface MessageListProps {
  messages: any[];
  userId: string;
  isLoading: boolean;
  isTyping: boolean;
}

const MessageList = ({ messages, userId, isLoading, isTyping }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-pulse text-sm text-muted-foreground">
          Loading messages...
        </div>
      </div>
    );
  }
  
  if (messages.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-sm text-muted-foreground">
          No messages yet. Start the conversation!
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {messages.map((msg, index) => (
        <ChatMessage
          key={msg.id || index}
          message={msg}
          isOwn={msg.sender_id === userId}
        />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
