import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Paperclip, Image, Phone, Video, MoreVertical, ArrowLeft } from "lucide-react";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    role: 'user' | 'provider' | 'admin';
  };
  timestamp: string;
  read: boolean;
  attachments?: {
    id: string;
    name: string;
    type: 'image' | 'document';
    url: string;
  }[];
}

interface Conversation {
  id: string;
  participant: {
    name: string;
    avatar?: string;
    role: 'provider' | 'admin';
    status: 'online' | 'offline' | 'away';
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  bookingId?: string;
}

interface ChatAreaProps {
  activeConversation?: Conversation;
  messages: Message[];
  onSendMessage: (message: string) => void;
  onCall?: () => void;
  onVideoCall?: () => void;
  onBack?: () => void;
  isMobile?: boolean;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  activeConversation,
  messages,
  onSendMessage,
  onCall,
  onVideoCall,
  onBack,
  isMobile = false
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [showAttachments, setShowAttachments] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { getMobileSpacing, getComponentSpacing } = useMobileOptimizations();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  if (!activeConversation) {
    return (
      <Card className="card-primary h-full rounded-none">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center text-muted-foreground">
            <h3 className="text-lg font-semibold mb-2">No conversation selected</h3>
            <p>Choose a conversation to start messaging</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-primary h-full rounded-none flex flex-col">
      {/* Chat Header */}
      <CardHeader className={cn("flex-shrink-0", getMobileSpacing('md'))}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isMobile && onBack && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={activeConversation.participant.avatar} />
                <AvatarFallback>
                  {activeConversation.participant.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className={cn(
                "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background",
                getStatusColor(activeConversation.participant.status)
              )} />
            </div>
            
            <div>
              <CardTitle className="text-lg">{activeConversation.participant.name}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {activeConversation.participant.role}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {activeConversation.participant.status}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {onCall && (
              <Button variant="outline" size="icon" onClick={onCall}>
                <Phone className="h-4 w-4" />
              </Button>
            )}
            {onVideoCall && (
              <Button variant="outline" size="icon" onClick={onVideoCall}>
                <Video className="h-4 w-4" />
              </Button>
            )}
            <Button variant="outline" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Messages Area */}
      <CardContent className="flex-1 card-spacing-none overflow-hidden">
        <ScrollArea className="h-full">
          <div className={cn("space-y-4", getComponentSpacing('md'))}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.sender.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {message.sender.role !== 'user' && (
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={message.sender.avatar} />
                    <AvatarFallback>
                      {message.sender.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={cn(
                    "max-w-[70%] rounded-lg px-3 py-2",
                    message.sender.role === 'user'
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                  
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {message.attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center gap-2">
                          {attachment.type === 'image' ? (
                            <Image className="h-4 w-4" />
                          ) : (
                            <Paperclip className="h-4 w-4" />
                          )}
                          <span className="text-xs">{attachment.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {message.sender.role === 'user' && (
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={message.sender.avatar} />
                    <AvatarFallback>
                      {message.sender.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>

      {/* Message Input */}
      <div className="flex-shrink-0 p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <div className="flex-1 relative">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="min-h-[40px] max-h-[120px] resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            />
          </div>
          
          <div className="flex gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setShowAttachments(!showAttachments)}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
        
        {showAttachments && (
          <div className="mt-2 flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Photo
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Paperclip className="h-4 w-4" />
              File
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
