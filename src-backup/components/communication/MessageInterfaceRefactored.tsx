import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import { ConversationList } from "./components/ConversationList";
import { ChatArea } from "./components/ChatArea";

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

interface MessageInterfaceRefactoredProps {
  conversations: Conversation[];
  messages: Message[];
  activeConversationId?: string;
  onSendMessage: (message: string) => void;
  onConversationSelect: (conversationId: string) => void;
  onCall?: () => void;
  onVideoCall?: () => void;
  className?: string;
}

export const MessageInterfaceRefactored: React.FC<MessageInterfaceRefactoredProps> = ({
  conversations,
  messages,
  activeConversationId,
  onSendMessage,
  onConversationSelect,
  onCall,
  onVideoCall,
  className
}) => {
  const { isMobile } = useMobileOptimizations();
  const [showConversations, setShowConversations] = useState(false);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const handleConversationSelect = (conversationId: string) => {
    onConversationSelect(conversationId);
    if (isMobile) {
      setShowConversations(false);
    }
  };

  const handleBack = () => {
    setShowConversations(true);
  };

  if (isMobile) {
    return (
      <div className={cn("h-full", className)}>
        {showConversations || !activeConversationId ? (
          <ConversationList
            conversations={conversations}
            activeConversationId={activeConversationId}
            onConversationSelect={handleConversationSelect}
            showConversations={showConversations}
            onToggleConversations={() => setShowConversations(!showConversations)}
          />
        ) : (
          <ChatArea
            activeConversation={activeConversation}
            messages={messages}
            onSendMessage={onSendMessage}
            onCall={onCall}
            onVideoCall={onVideoCall}
            onBack={handleBack}
            isMobile={true}
          />
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex h-full", className)}>
      <div className="w-80 border-r">
        <ConversationList
          conversations={conversations}
          activeConversationId={activeConversationId}
          onConversationSelect={handleConversationSelect}
          showConversations={true}
        />
      </div>
      
      <div className="flex-1">
        <ChatArea
          activeConversation={activeConversation}
          messages={messages}
          onSendMessage={onSendMessage}
          onCall={onCall}
          onVideoCall={onVideoCall}
          isMobile={false}
        />
      </div>
    </div>
  );
};
