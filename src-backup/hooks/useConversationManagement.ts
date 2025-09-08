
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createConversation } from '@/utils/chatUtils';

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
}

export const useConversationManagement = (providerId: string) => {
  const { toast } = useToast();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  
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

  return {
    selectedConversation,
    handleSelectConversation,
    handleNewConversation
  };
};
