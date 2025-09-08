
import React, { useState } from 'react';
import { cn } from '@/lib/utils";
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card";
import { Button } from '@/components/ui/button";
import { Input } from '@/components/ui/input";
import { Badge } from '@/components/ui/badge";
import { ScrollArea } from '@/components/ui/scroll-area";
import { Textarea } from '@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar";
import { Send, Paperclip, Image, Phone, Video, MoreVertical } from "lucide-react";

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

interface MessageInterfaceProps {
  conversations: Conversation[];
  messages: Message[];
  activeConversationId?: string;
  onConversationSelect: (id: string) => void;
  onSendMessage: (content: string, attachments?: File[]) => void;
  className?: string;
}

/**
 * Enhanced message interface with design system integration
 * Mobile-first messaging with conversations list and chat interface
 */
export function MessageInterface({
  conversations,
  messages,
  activeConversationId,
  onConversationSelect,
  onSendMessage,
  className
}: MessageInterfaceProps) {
  const { isMobile, getMobileSpacing, getMobileButtonSize } = useMobileOptimizations();
  const [messageInput, setMessageInput] = useState('');
  const [showConversations, setShowConversations] = useState(!activeConversationId);

  const activeConversation = conversations.find(conv => conv.id === activeConversationId);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      onSendMessage(messageInput);
      setMessageInput('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-secondary';
      default: return 'bg-gray-400';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'provider': return 'bg-blue-100 text-blue-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isMobile) {
    return (
      <div className={cn("h-screen flex flex-col", className)}>
        {showConversations || !activeConversationId ? (
          // Mobile Conversations List
          <Card className="card-primary h-full rounded-none">
            <CardHeader className={getMobileSpacing('md')}>
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 card-spacing-none">
              <ScrollArea className="h-full">
                <div className="component-spacing-xs card-spacing-sm">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => {
                        onConversationSelect(conversation.id);
                        setShowConversations(false);
                      }}
                      className="flex items-center gap-3 card-spacing-xs hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={conversation.participant.avatar} />
                          <AvatarFallback>
                            {conversation.participant.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className={cn(
                          "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background",
                          getStatusColor(conversation.participant.status)
                        )} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium truncate">
                            {conversation.participant.name}
                          </p>
                          <Badge 
                            variant="secondary" 
                            className={cn("text-xs", getRoleBadgeColor(conversation.participant.role))}
                          >
                            {conversation.participant.role}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {conversation.lastMessageTime}
                        </p>
                      </div>

                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-primary text-primary-foreground">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        ) : (
          // Mobile Chat Interface
          <div className="h-full flex flex-col">
            {/* Chat Header */}
            <div className="border-b border-border card-spacing-sm bg-background">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConversations(true)}
                >
                  ←
                </Button>
                
                {activeConversation && (
                  <>
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
                    
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {activeConversation.participant.name}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {activeConversation.participant.status}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 card-spacing-sm">
              <div className="form-spacing-relaxed">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.sender.role === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.sender.role !== 'user' && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.sender.avatar} />
                        <AvatarFallback className="text-xs">
                          {message.sender.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={cn(
                      "max-w-[80%] rounded-lg card-spacing-xs",
                      message.sender.role === 'user' 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted"
                    )}>
                      <p className="text-sm">{message.content}</p>
                      <p className={cn(
                        "text-xs mt-1",
                        message.sender.role === 'user' 
                          ? "text-primary-foreground/70" 
                          : "text-muted-foreground"
                      )}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t border-border card-spacing-sm bg-background">
              <div className="flex gap-2">
                <div className="flex-1 flex gap-2">
                  <Textarea
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="min-h-[40px] max-h-[120px] resize-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <div className="flex flex-col gap-1">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Image className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button 
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className={getMobileButtonSize('md')}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className={cn("h-[600px] flex", className)}>
      {/* Conversations Sidebar */}
      <Card className="card-primary w-80 rounded-r-none">
        <CardHeader className={getMobileSpacing('md')}>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 card-spacing-none">
          <ScrollArea className="h-full">
            <div className="component-spacing-xs card-spacing-sm">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => onConversationSelect(conversation.id)}
                  className={cn(
                    "flex items-center gap-3 card-spacing-xs hover:bg-muted/50 rounded-lg cursor-pointer transition-colors",
                    activeConversationId === conversation.id && "bg-muted"
                  )}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conversation.participant.avatar} />
                      <AvatarFallback>
                        {conversation.participant.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background",
                      getStatusColor(conversation.participant.status)
                    )} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">
                        {conversation.participant.name}
                      </p>
                      <Badge 
                        variant="secondary" 
                        className={cn("text-xs", getRoleBadgeColor(conversation.participant.role))}
                      >
                        {conversation.participant.role}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {conversation.lastMessageTime}
                    </p>
                  </div>

                  {conversation.unreadCount > 0 && (
                    <Badge className="bg-primary text-primary-foreground">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="card-primary flex-1 rounded-l-none">
        {activeConversation ? (
          <div className="h-full flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b border-border">
              <div className="flex items-center gap-3">
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
                
                <div className="flex-1">
                  <p className="font-medium">
                    {activeConversation.participant.name}
                  </p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {activeConversation.participant.status}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 card-spacing-sm">
              <ScrollArea className="h-full">
                <div className="form-spacing-relaxed">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-3",
                        message.sender.role === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.sender.role !== 'user' && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.sender.avatar} />
                          <AvatarFallback className="text-xs">
                            {message.sender.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className={cn(
                        "max-w-[70%] rounded-lg card-spacing-xs",
                        message.sender.role === 'user' 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      )}>
                        <p className="text-sm">{message.content}</p>
                        <p className={cn(
                          "text-xs mt-1",
                          message.sender.role === 'user' 
                            ? "text-primary-foreground/70" 
                            : "text-muted-foreground"
                        )}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>

            {/* Message Input */}
            <div className="border-t border-border card-spacing-sm">
              <div className="flex gap-2">
                <div className="flex-1 flex gap-2">
                  <Textarea
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="min-h-[80px] max-h-[120px] resize-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <div className="flex flex-col gap-1">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Image className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button 
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-2">
                Select a conversation
              </p>
              <p className="text-sm text-muted-foreground">
                Choose a conversation from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
