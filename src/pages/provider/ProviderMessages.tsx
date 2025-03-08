
import { useState } from 'react';
import { Box } from '@/components/layout/Box';
import { useToast } from '@/hooks/use-toast';
import ChatInterface from '@/components/chat/ChatInterface';
import ConversationList from '@/components/chat/ConversationList';
import { createConversation } from '@/utils/chatUtils';

const ProviderMessages = () => {
  const { toast } = useToast();
  const providerId = "provider123"; // In a real app, get this from auth state
  
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
    // In a real app, you would show a user picker dialog here
    const clientId = "client789";
    const clientName = "Client";
    
    try {
      const conversationId = await createConversation(providerId, clientId);
      handleSelectConversation(conversationId, clientId, clientName);
      
      toast({
        title: "New conversation created",
        description: `You can now chat with ${clientName}`,
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
    <div className="container mx-auto py-6 px-4 mt-16">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="md:col-span-1 h-[calc(100vh-200px)]">
          <ConversationList
            userId={providerId}
            selectedConversationId={selectedConversation?.id}
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
          />
        </div>
        
        <div className="md:col-span-2 h-[calc(100vh-200px)]">
          {selectedConversation ? (
            <ChatInterface
              conversationId={selectedConversation.id}
              userId={providerId}
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
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
                >
                  Start new conversation
                </button>
              </div>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderMessages;
