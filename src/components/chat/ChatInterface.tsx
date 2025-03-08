
import React, { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Paperclip, Image, Smile } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message, getConversation, sendMessage, markMessagesAsRead, uploadAttachments, FileAttachment, useTypingIndicator } from '@/utils/chatUtils';
import ChatMessage from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import FileUpload from './FileUpload';
import FileAttachmentComponent from './FileAttachment';
import { supabase } from '@/integrations/supabase/client';

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { isTyping, startTyping, stopTyping, useTypingStatusSubscription } = useTypingIndicator(
    conversationId,
    userId
  );
  
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);
  
  // Subscribe to typing status changes
  useTypingStatusSubscription(conversationId, (typingUserId, typing) => {
    if (typingUserId === recipientId) {
      setIsRecipientTyping(typing);
    }
  });
  
  // Fetch messages on component mount
  useEffect(() => {
    fetchMessages();
    
    // Subscribe to new messages
    const subscription = supabase
      .channel('new_messages')
      .on(
        'postgres_changes', 
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMsg = payload.new as any;
          
          // Only add the message if it's not already in the list
          if (!messages.some(m => m.id === newMsg.id)) {
            const formattedMessage: Message = {
              ...newMsg,
              sent_at: new Date(newMsg.sent_at),
            };
            
            setMessages(prevMessages => [...prevMessages, formattedMessage]);
            
            // Mark message as read if it's from the other user
            if (newMsg.sender_id === recipientId) {
              markMessagesAsRead([newMsg.id]);
            }
          }
        }
      )
      .subscribe();
      
    return () => {
      subscription.unsubscribe();
    };
  }, [conversationId, userId, recipientId]);
  
  // Mark messages as read when conversation is opened
  useEffect(() => {
    const unreadMessages = messages
      .filter(m => m.sender_id === recipientId && !m.is_read)
      .map(m => m.id);
      
    if (unreadMessages.length > 0) {
      markMessagesAsRead(unreadMessages);
    }
  }, [messages, recipientId]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isRecipientTyping]);
  
  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const fetchedMessages = await getConversation(conversationId);
      setMessages(fetchedMessages.reverse()); // Reverse to show oldest first
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async () => {
    if ((newMessage.trim() === '' && attachments.length === 0) || isSending) return;
    
    setIsSending(true);
    stopTyping();
    
    try {
      await sendMessage(
        userId,
        recipientId,
        newMessage,
        conversationId,
        attachments
      );
      
      setNewMessage('');
      setAttachments([]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
    startTyping();
  };
  
  const handleFileUpload = async (files: FileList) => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    
    try {
      const fileArray = Array.from(files);
      const uploadedAttachments = await uploadAttachments(fileArray, conversationId);
      
      setAttachments(prev => [...prev, ...uploadedAttachments]);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleOpenFileDialog = () => {
    fileInputRef.current?.click();
  };
  
  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };
  
  // Group messages by date
  const groupedMessages: { [date: string]: Message[] } = {};
  
  messages.forEach(message => {
    const date = message.sent_at.toDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });
  
  // Group consecutive messages from the same sender
  const renderMessageGroups = (messagesForDate: Message[]) => {
    const groups: Message[][] = [];
    let currentGroup: Message[] = [];
    
    messagesForDate.forEach((message, index) => {
      if (
        index === 0 || 
        messagesForDate[index - 1].sender_id !== message.sender_id ||
        new Date(message.sent_at).getTime() - new Date(messagesForDate[index - 1].sent_at).getTime() > 5 * 60 * 1000
      ) {
        if (currentGroup.length > 0) {
          groups.push(currentGroup);
        }
        currentGroup = [message];
      } else {
        currentGroup.push(message);
      }
    });
    
    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }
    
    return groups.map((group, groupIndex) => (
      <div key={`group-${groupIndex}`} className="mb-4">
        {group.map((message, msgIndex) => (
          <ChatMessage
            key={message.id}
            message={message}
            isOwn={message.sender_id === userId}
            showAvatar={msgIndex === group.length - 1}
          />
        ))}
      </div>
    ));
  };
  
  return (
    <div className="flex flex-col h-full bg-background border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b flex items-center gap-3">
        <Avatar>
          <AvatarImage src={`https://avatar.vercel.sh/${recipientId}`} />
          <AvatarFallback>{recipientName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{recipientName}</h3>
          <p className="text-xs text-muted-foreground">
            {isRecipientTyping ? (
              <span className="text-primary">typing...</span>
            ) : (
              'Online'
            )}
          </p>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
            <div className="mb-2 p-4 rounded-full bg-muted">
              <Send className="h-6 w-6" />
            </div>
            <p>No messages yet</p>
            <p className="text-sm">Send a message to start the conversation</p>
          </div>
        ) : (
          <>
            {Object.entries(groupedMessages).map(([date, messagesForDate]) => (
              <div key={date}>
                <div className="flex items-center justify-center my-4">
                  <div className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full">
                    {new Date(date).toLocaleDateString(undefined, { 
                      weekday: 'long', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
                {renderMessageGroups(messagesForDate)}
              </div>
            ))}
          </>
        )}
        
        {isRecipientTyping && <TypingIndicator isTyping={true} />}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="px-4 pt-2 pb-0 space-y-2 max-h-40 overflow-y-auto">
          {attachments.map((file, index) => (
            <FileAttachmentComponent 
              key={file.id || index}
              file={file}
              onRemove={() => removeAttachment(index)}
              showRemoveButton={true}
            />
          ))}
        </div>
      )}
      
      {/* Input */}
      <div className="p-3 border-t">
        <div className="flex items-end gap-2">
          <div className="relative flex-1">
            <Textarea
              placeholder="Write a message..."
              value={newMessage}
              onChange={handleMessageChange}
              onKeyDown={handleKeyDown}
              className={cn(
                "min-h-10 resize-none py-3 pr-12",
                attachments.length > 0 && "rounded-b-md rounded-t-none border-t-0"
              )}
              rows={1}
            />
            
            <div className="absolute right-3 bottom-3 flex items-center gap-1">
              <Button 
                type="button" 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8"
                onClick={handleOpenFileDialog}
                disabled={isUploading}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              
              <Button 
                type="button" 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8"
              >
                <Smile className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Button 
            type="button" 
            onClick={handleSendMessage}
            disabled={isSending || (newMessage.trim() === '' && attachments.length === 0)}
            className="h-10 w-10 rounded-full"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        style={{ display: 'none' }}
        multiple
      />
    </div>
  );
};

export default ChatInterface;
