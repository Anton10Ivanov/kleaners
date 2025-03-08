
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, PaperclipIcon, Smile } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { 
  Message, 
  useTypingIndicator, 
  sendMessage, 
  useMessageSubscription,
  markMessagesAsRead
} from '@/utils/chatUtils';

interface ChatInterfaceProps {
  conversationId: string;
  currentUserId: string;
  recipientId: string;
  recipientName: string;
  initialMessages?: Message[];
}

export const ChatInterface = ({
  conversationId,
  currentUserId,
  recipientId,
  recipientName,
  initialMessages = []
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [messageText, setMessageText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recipientTyping, setRecipientTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Get typing indicator functionality
  const { isTyping, startTyping, stopTyping, useTypingStatusSubscription } = 
    useTypingIndicator(conversationId, currentUserId);
  
  // Handle recipient typing status changes
  const handleTypingChange = (userId: string, typing: boolean) => {
    if (userId === recipientId) {
      setRecipientTyping(typing);
    }
  };
  
  // Subscribe to typing status changes
  useTypingStatusSubscription(conversationId, handleTypingChange);
  
  // Handle new messages
  const handleNewMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
    
    // Mark message as read if we're actively in the conversation
    if (message.recipient_id === currentUserId) {
      markMessagesAsRead([message.id]);
    }
  };
  
  // Subscribe to new messages
  useMessageSubscription(currentUserId, handleNewMessage);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    // Mark unread messages as read when viewing them
    const unreadMessages = messages
      .filter(m => m.recipient_id === currentUserId && !m.is_read)
      .map(m => m.id);
      
    if (unreadMessages.length > 0) {
      markMessagesAsRead(unreadMessages);
    }
  }, [messages, currentUserId]);
  
  // Handle text input
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageText(e.target.value);
    
    // Send typing indicator if we're typing
    if (e.target.value.trim()) {
      startTyping();
    } else {
      stopTyping();
    }
  };
  
  // Handle key press (send on Enter without shift)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  // Submit message
  const handleSubmit = async () => {
    const text = messageText.trim();
    if (!text || isSubmitting) return;
    
    setIsSubmitting(true);
    setMessageText('');
    stopTyping();
    
    // Optimistic update
    const optimisticMessage: Message = {
      id: `temp-${Date.now()}`,
      sender_id: currentUserId,
      recipient_id: recipientId,
      content: text,
      sent_at: new Date(),
      is_read: false,
      status: 'sending'
    };
    
    setMessages(prev => [...prev, optimisticMessage]);
    
    try {
      // Send actual message
      const sentMessage = await sendMessage(
        currentUserId,
        recipientId,
        text,
        conversationId
      );
      
      // Replace optimistic message with real one
      setMessages(prev => 
        prev.map(m => m.id === optimisticMessage.id ? sentMessage : m)
      );
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Mark optimistic message as failed
      setMessages(prev => 
        prev.map(m => 
          m.id === optimisticMessage.id 
            ? { ...m, status: 'failed' } 
            : m
        )
      );
    } finally {
      setIsSubmitting(false);
      // Focus the textarea again
      textareaRef.current?.focus();
    }
  };
  
  // Group consecutive messages from the same sender
  const groupedMessages = messages.reduce((acc, message, index, array) => {
    const prevMessage = array[index - 1];
    const showAvatar = !prevMessage || prevMessage.sender_id !== message.sender_id;
    
    acc.push({
      ...message,
      showAvatar
    });
    
    return acc;
  }, [] as (Message & { showAvatar: boolean })[]);
  
  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-background">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {groupedMessages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isOwn={message.sender_id === currentUserId}
              showAvatar={message.showAvatar}
            />
          ))}
          
          {recipientTyping && (
            <TypingIndicator 
              isTyping={recipientTyping} 
              name={recipientName}
              className="ml-10 mb-2" 
            />
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="border-t p-4">
        <div className="flex items-end gap-2">
          <Textarea
            ref={textareaRef}
            value={messageText}
            onChange={handleTextChange}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="min-h-[80px] resize-none"
            disabled={isSubmitting}
          />
          
          <div className="flex flex-col gap-2">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full"
              type="button"
            >
              <PaperclipIcon className="h-4 w-4" />
            </Button>
            
            <Button
              size="icon"
              className="rounded-full"
              type="button"
              disabled={!messageText.trim() || isSubmitting}
              onClick={handleSubmit}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
