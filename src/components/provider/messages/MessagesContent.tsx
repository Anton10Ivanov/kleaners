
import { Card, CardContent } from '@/components/ui/card';
import ChatInterface from '@/components/chat/ChatInterface';
import { Button } from '@/components/ui/button';
import { MessageSquarePlus } from 'lucide-react';

interface MessagesContentProps {
  selectedConversation: {
    id: string;
    participantId: string;
    participantName: string;
  } | null;
  providerId: string;
  onNewConversation: () => void;
}

const MessagesContent = ({ 
  selectedConversation, 
  providerId,
  onNewConversation 
}: MessagesContentProps) => {
  return (
    <Card className="h-[calc(100vh-200px)] transition-all duration-200 shadow-sm overflow-hidden">
      {selectedConversation ? (
        <ChatInterface
          conversationId={selectedConversation.id}
          userId={providerId}
          recipientId={selectedConversation.participantId}
          recipientName={selectedConversation.participantName}
        />
      ) : (
        <div className="h-full flex items-center justify-center p-4">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-4 bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
              <MessageSquarePlus className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">No conversation selected</h3>
            <p className="text-muted-foreground mb-6">
              Select a conversation from the list or start a new one to begin messaging
            </p>
            <Button
              onClick={onNewConversation}
              className="px-6 py-2.5"
            >
              Start new conversation
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default MessagesContent;
