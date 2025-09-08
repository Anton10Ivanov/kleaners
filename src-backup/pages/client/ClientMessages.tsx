import { useState } from 'react';
import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { Box } from '@/components/layout/Box';
import { useToast } from '@/hooks/use-toast';
import ChatInterface from '@/components/chat/ChatInterface';
import ConversationList from '@/components/chat/ConversationList';
import { createConversation } from '@/utils/chat';

const ClientMessages = () => {
  const { toast } = useToast();
  const userId = "user123"; // In a real app, get this from auth state
  
  const [selectedConversation, setSelectedConversation] = useState<{
    id: string;
    participantId: string;
    participantName: string;
  } | null>(null);
  
  const handleSelectConversation = (
    conversationId: string,
    participantId: string,
    participantName: string
  ) => {
    setSelectedConversation({
      id: conversationId,
      participantId,
      participantName
    });
  };
  
  const handleNewConversation = async () => {
    try {
      const recipientId = "provider456";
      const recipientName = "Service Provider";
      
      const conversationId = await createConversation(userId, recipientId);
      handleSelectConversation(conversationId, recipientId, recipientName);
      
      toast({
        title: "New conversation created",
        description: `You can now chat with ${recipientName}`,
      });
    } catch (error) {
      console.error("Error creating conversation:", error);
      toast({
        title: "Failed to create conversation",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="min-h-screen">
      <UnifiedContainer className="section-spacing-md">
        <h1 className="text-2xl font-bold mb-6 mt-8">Messages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-1 h-[calc(100vh-280px)] md:h-[calc(100vh-200px)]">
            <ConversationList
              userId={userId}
              selectedConversationId={selectedConversation?.id}
              onSelectConversation={handleSelectConversation}
              onNewConversation={handleNewConversation}
            />
          </div>
          
          <div className="md:col-span-2 h-[calc(100vh-280px)] md:h-[calc(100vh-200px)]">
            {selectedConversation ? (
              <ChatInterface
                conversationId={selectedConversation.id}
                userId={userId}
                recipientId={selectedConversation.participantId}
                recipientName={selectedConversation.participantName}
              />
            ) : (
              <Box className="h-full flex items-center justify-center">
                <div className="text-center">
                  <h3 className="font-medium mb-2">No conversation selected</h3>
                  <p className="text-muted-foreground mb-4">
                    Select a conversation from the list or start a new one
                  </p>
                  <button
                    onClick={handleNewConversation}
                    className="px-4 section-spacing-xs bg-primary text-primary-foreground rounded-md"
                  >
                    Start new conversation
                  </button>
                </div>
              </Box>
            )}
          </div>
        </div>
      </UnifiedContainer>
    </div>
  );
};

export default ClientMessages;
