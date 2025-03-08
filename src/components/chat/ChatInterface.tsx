
import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TypingIndicator } from './TypingIndicator';
import { Message, FileAttachment, sendMessage, markMessagesAsRead, useTypingIndicator } from '@/utils/chatUtils';
import { ChatMessage } from './ChatMessage';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import FileUpload from './FileUpload';
import { useToast } from '@/hooks/use-toast';

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
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const { startTyping, stopTyping } = useTypingIndicator(
    conversationId, 
    currentUserId
  );
  
  // When messages change, scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Mark messages as read when they're displayed
  useEffect(() => {
    const unreadMessages = messages
      .filter(m => m.recipient_id === currentUserId && !m.is_read)
      .map(m => m.id);
      
    if (unreadMessages.length > 0) {
      markMessagesAsRead(unreadMessages);
      
      // Also update local state
      setMessages(prev => 
        prev.map(m => 
          unreadMessages.includes(m.id) 
            ? { ...m, is_read: true, status: 'read' } 
            : m
        )
      );
    }
  }, [messages, currentUserId]);
  
  // Set up real-time listener for new messages
  useEffect(() => {
    const subscription = supabase
      .channel(`messages:${conversationId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`
      }, (payload) => {
        const newMessage = payload.new as any;
        
        // Format the message
        const formattedMessage: Message = {
          ...newMessage,
          sent_at: new Date(newMessage.sent_at),
        };
        
        // Add to state
        setMessages(prev => [...prev, formattedMessage]);
      })
      .subscribe();
      
    return () => {
      subscription.unsubscribe();
    };
  }, [conversationId]);
  
  // Listen for typing indicators
  useEffect(() => {
    const subscription = supabase
      .channel(`typing:${conversationId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'typing_indicators',
        filter: `conversation_id=eq.${conversationId} AND user_id=eq.${recipientId}`
      }, (payload) => {
        const typingData = payload.new as { is_typing: boolean };
        setIsTyping(typingData.is_typing);
      })
      .subscribe();
      
    return () => {
      subscription.unsubscribe();
    };
  }, [conversationId, recipientId]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // If typing, send typing indicator
    if (e.target.value.length > 0) {
      startTyping();
    } else {
      stopTyping();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send message on Enter without Shift
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleFilesSelected = (files: FileAttachment[]) => {
    setAttachments(files);
  };
  
  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();
    
    if (trimmedInput === '' && attachments.length === 0) return;
    
    setIsSubmitting(true);
    
    try {
      // Create optimistic message
      const optimisticId = `temp-${Date.now()}`;
      const optimisticMessage: Message = {
        id: optimisticId,
        sender_id: currentUserId,
        recipient_id: recipientId,
        content: trimmedInput,
        sent_at: new Date(),
        is_read: false,
        status: 'sending',
        attachments: attachments
      };
      
      // Add to UI immediately
      setMessages(prev => [...prev, optimisticMessage]);
      
      // Clear input
      setInputValue('');
      setAttachments([]);
      stopTyping();
      
      // Upload attachments if any
      let uploadedAttachments: FileAttachment[] = [];
      if (attachments.length > 0) {
        uploadedAttachments = await Promise.all(
          attachments.map(async (attachment) => {
            if (!attachment.file) return attachment;
            
            // Upload file to storage
            const fileName = `${Date.now()}-${attachment.name}`;
            const { data, error } = await supabase.storage
              .from('message_attachments')
              .upload(`${conversationId}/${fileName}`, attachment.file);
              
            if (error) throw error;
            
            // Get public URL
            const { data: urlData } = supabase.storage
              .from('message_attachments')
              .getPublicUrl(`${conversationId}/${fileName}`);
              
            return {
              id: data.path,
              name: attachment.name,
              type: attachment.type,
              url: urlData.publicUrl,
              size: attachment.size
            };
          })
        );
      }
      
      // Send actual message to server
      const sentMessage = await sendMessage(
        currentUserId,
        recipientId,
        trimmedInput,
        conversationId,
        uploadedAttachments
      );
      
      // Replace optimistic message with real one
      setMessages(prev => prev.map(m => 
        m.id === optimisticId ? sentMessage : m
      ));
      
      // Focus textarea
      textareaRef.current?.focus();
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Mark optimistic message as failed
      setMessages(prev => prev.map(m => 
        m.status === 'sending' ? { ...m, status: 'failed' } : m
      ));
      
      toast({
        title: "Failed to send message",
        description: "Your message couldn't be sent. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-background">
      {/* Header */}
      <div className="p-3 border-b flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={`https://avatar.vercel.sh/${recipientId}`} />
          <AvatarFallback>{recipientName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-sm font-medium">{recipientName}</h3>
        </div>
      </div>
      
      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, i) => (
              <ChatMessage
                key={message.id}
                message={message}
                isOwn={message.sender_id === currentUserId}
                showAvatar={
                  i === 0 || 
                  messages[i - 1].sender_id !== message.sender_id
                }
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
        {isTyping && (
          <TypingIndicator
            isTyping={isTyping}
            name={recipientName}
            className="mt-2"
          />
        )}
      </div>
      
      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="px-3 py-2 border-t max-h-32 overflow-y-auto">
          <div className="flex flex-wrap gap-2">
            {attachments.map(file => (
              <div key={file.id} className="max-w-[200px]">
                <FileAttachmentComponent
                  file={file}
                  onRemove={() => setAttachments(prev => prev.filter(f => f.id !== file.id))}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Input Area */}
      <div className="p-3 border-t">
        <div className="flex items-end gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 flex-shrink-0"
                type="button"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="top" align="start" className="w-72">
              <FileUpload onFileSelect={handleFilesSelected} />
            </PopoverContent>
          </Popover>
          
          <Textarea
            ref={textareaRef}
            placeholder="Type a message..."
            className="min-h-9 resize-none"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isSubmitting}
          />
          
          <Button
            size="icon"
            className="h-9 w-9 flex-shrink-0"
            disabled={isSubmitting || (inputValue.trim() === '' && attachments.length === 0)}
            onClick={handleSendMessage}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
