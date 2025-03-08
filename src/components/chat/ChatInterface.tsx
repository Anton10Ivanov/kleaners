
import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { Box } from '@/components/layout/Box';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ChatMessage from './ChatMessage';
import FileUpload from './FileUpload';
import TypingIndicator from './TypingIndicator';
import { FileAttachment, sendMessage, loadMessages } from '@/utils/chatUtils';

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
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [fileAttachments, setFileAttachments] = useState<FileAttachment[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Load messages when the conversation changes
  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const loadedMessages = await loadMessages(conversationId);
        setMessages(loadedMessages);
      } catch (error) {
        console.error('Error loading messages:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (conversationId) {
      fetchMessages();
    }
    
    // For demo, simulate the other user typing after a delay
    const typingTimeout = setTimeout(() => {
      setIsTyping(true);
      
      // Stop "typing" after 3 seconds
      setTimeout(() => {
        setIsTyping(false);
      }, 3000);
    }, 1000);
    
    return () => {
      clearTimeout(typingTimeout);
    };
  }, [conversationId]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async () => {
    if ((!message.trim() && fileAttachments.length === 0) || isLoading) return;
    
    try {
      // Add message to UI immediately for better UX
      const newMessage = {
        id: `temp-${Date.now()}`,
        content: message,
        sender_id: userId,
        created_at: new Date().toISOString(),
        attachments: fileAttachments
      };
      
      setMessages(prev => [...prev, newMessage]);
      
      // Clear form
      setMessage('');
      setFileAttachments([]);
      
      // Send to backend
      await sendMessage(
        conversationId,
        userId,
        recipientId,
        message,
        fileAttachments
      );
      
      // Simulate reply for demo
      setTimeout(() => {
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
          
          const replyContent = getRandomReply(recipientName);
          const replyMessage = {
            id: `temp-reply-${Date.now()}`,
            content: replyContent,
            sender_id: recipientId,
            created_at: new Date().toISOString(),
            attachments: []
          };
          
          setMessages(prev => [...prev, replyMessage]);
        }, 2000);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleFileSelect = (files: FileAttachment[]) => {
    setFileAttachments(prev => [...prev, ...files]);
  };
  
  const handleRemoveFile = (index: number) => {
    setFileAttachments(prev => prev.filter((_, i) => i !== index));
  };
  
  // Generate random replies for the demo
  const getRandomReply = (name: string) => {
    const replies = [
      `Hi there! This is ${name}. How can I help you today?`,
      `Thanks for your message. I'll get back to you shortly.`,
      `I'm available to clean on Tuesday and Thursday next week.`,
      `Yes, I can bring my own cleaning supplies.`,
      `The service usually takes about 3 hours for a standard apartment.`,
      `Would you like me to focus on any particular areas during the cleaning?`
    ];
    
    return replies[Math.floor(Math.random() * replies.length)];
  };
  
  return (
    <Box className="flex flex-col h-full border rounded-md overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b bg-muted/30">
        <h3 className="font-medium">{recipientName}</h3>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-pulse text-sm text-muted-foreground">
              Loading messages...
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-sm text-muted-foreground">
              No messages yet. Start the conversation!
            </div>
          </div>
        ) : (
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
        )}
      </div>
      
      {/* Attachments preview */}
      {fileAttachments.length > 0 && (
        <div className="px-4 py-2 border-t grid grid-cols-1 sm:grid-cols-2 gap-2">
          {fileAttachments.map((file, index) => (
            <div key={index} className="relative">
              <div className="flex items-center p-2 rounded-md border bg-background">
                <div className="flex-1 truncate text-sm">{file.name}</div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 w-7 p-0" 
                  onClick={() => handleRemoveFile(index)}
                >
                  <span className="sr-only">Remove</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Input area */}
      <div className="p-3 border-t flex items-center gap-2">
        <FileUpload onFilesSelected={handleFileSelect}>
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
        </FileUpload>
        
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1"
        />
        
        <Button 
          onClick={handleSendMessage} 
          size="icon"
          disabled={(!message.trim() && fileAttachments.length === 0) || isLoading}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </Box>
  );
};

export default ChatInterface;
