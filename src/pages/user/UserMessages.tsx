
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { ConversationList } from '@/components/chat/ConversationList';
import { Skeleton } from '@/components/ui/skeleton';
import { Message, getUserConversations } from '@/utils/chatUtils';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const UserMessages = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<{
    id: string;
    participantId: string;
    participantName: string;
  } | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [newMessageEmail, setNewMessageEmail] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isStartingNewConversation, setIsStartingNewConversation] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserId(user.id);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getUser();
  }, []);
  
  useEffect(() => {
    if (selectedConversation && userId) {
      fetchMessages(selectedConversation.id);
    }
  }, [selectedConversation, userId]);
  
  const fetchMessages = async (conversationId: string) => {
    setLoadingMessages(true);
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('sent_at', { ascending: true });
        
      if (error) throw error;
      
      const formattedMessages: Message[] = data.map(message => ({
        id: message.id,
        sender_id: message.sender_id,
        recipient_id: message.recipient_id,
        content: message.content,
        sent_at: new Date(message.sent_at),
        is_read: message.is_read,
        status: message.status || 'sent',
        attachments: message.attachments
      }));
      
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  };
  
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
  
  const handleStartNewConversation = async () => {
    if (!userId || !newMessageEmail.trim() || !newMessageEmail.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsStartingNewConversation(true);
    
    try {
      // First, get user by email
      const { data: users, error: userError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name')
        .eq('email', newMessageEmail.trim())
        .limit(1);
        
      if (userError) throw userError;
      
      if (!users || users.length === 0) {
        toast({
          title: "User not found",
          description: "No user with that email address was found",
          variant: "destructive"
        });
        return;
      }
      
      const recipient = users[0];
      
      // Check if conversation already exists
      const { data: conversations, error: convError } = await supabase
        .from('conversations')
        .select('id')
        .or(`participant1_id.eq.${userId},participant2_id.eq.${userId}`)
        .or(`participant1_id.eq.${recipient.id},participant2_id.eq.${recipient.id}`)
        .limit(1);
        
      if (convError) throw convError;
      
      let conversationId;
      
      if (conversations && conversations.length > 0) {
        // Conversation exists
        conversationId = conversations[0].id;
      } else {
        // Create new conversation
        const { data: newConv, error: createError } = await supabase
          .from('conversations')
          .insert({
            participant1_id: userId,
            participant2_id: recipient.id,
            created_at: new Date().toISOString()
          })
          .select('id')
          .single();
          
        if (createError) throw createError;
        conversationId = newConv.id;
      }
      
      // Select the conversation
      handleSelectConversation(
        conversationId, 
        recipient.id, 
        `${recipient.first_name || ''} ${recipient.last_name || ''}`.trim() || 'User'
      );
      
      setIsDialogOpen(false);
      setNewMessageEmail('');
      
      toast({
        title: "Conversation created",
        description: "You can now start messaging",
        variant: "default"
      });
    } catch (error) {
      console.error('Error starting new conversation:', error);
      toast({
        title: "Error",
        description: "Failed to start new conversation",
        variant: "destructive"
      });
    } finally {
      setIsStartingNewConversation(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-6 px-4 mt-16">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
          <Skeleton className="h-full" />
          <Skeleton className="h-full md:col-span-2" />
        </div>
      </div>
    );
  }
  
  if (!userId) {
    return (
      <div className="container mx-auto py-6 px-4 mt-16">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>
        <div className="bg-muted p-4 rounded-lg text-center">
          Please sign in to view your messages.
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-6 px-4 mt-16">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
        <div className="h-full">
          <ConversationList
            userId={userId}
            selectedConversationId={selectedConversation?.id}
            onSelectConversation={handleSelectConversation}
            onNewConversation={() => setIsDialogOpen(true)}
          />
        </div>
        
        <div className="h-full md:col-span-2">
          {selectedConversation ? (
            loadingMessages ? (
              <Skeleton className="h-full" />
            ) : (
              <ChatInterface
                conversationId={selectedConversation.id}
                currentUserId={userId}
                recipientId={selectedConversation.participantId}
                recipientName={selectedConversation.participantName}
                initialMessages={messages}
              />
            )
          ) : (
            <div className="h-full border rounded-lg flex items-center justify-center bg-muted/50">
              <div className="text-center p-6">
                <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                <p className="text-muted-foreground mb-4">
                  Select a conversation from the list or start a new one.
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Conversation
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Conversation</DialogTitle>
            <DialogDescription>
              Enter the email address of the user you want to message.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={newMessageEmail}
                onChange={(e) => setNewMessageEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleStartNewConversation}
              disabled={isStartingNewConversation || !newMessageEmail.trim()}
            >
              {isStartingNewConversation ? 'Starting...' : 'Start Conversation'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserMessages;
