
import { PageHeader } from '@/components/layout/PageHeader';
import MessagesSidebar from '@/components/provider/messages/MessagesSidebar';
import MessagesContent from '@/components/provider/messages/MessagesContent';
import { useConversationManagement } from '@/hooks/useConversationManagement';
import { Container } from '@/components/layout/Container';

const ProviderMessages = () => {
  const providerId = "provider123"; // In a real app, get this from auth state
  
  const {
    selectedConversation,
    handleSelectConversation,
    handleNewConversation
  } = useConversationManagement(providerId);
  
  return (
    <Container size="3xl" className="py-4 md:py-6 mt-4 md:mt-6 animate-fadeIn">
      <PageHeader 
        title="Messages" 
        description="Manage your conversations with clients" 
        className="mb-6"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        <div className="md:col-span-1 xl:col-span-2">
          <MessagesSidebar 
            providerId={providerId}
            selectedConversationId={selectedConversation?.id}
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
          />
        </div>
        
        <div className="md:col-span-3 xl:col-span-3">
          <MessagesContent
            selectedConversation={selectedConversation}
            providerId={providerId}
            onNewConversation={handleNewConversation}
          />
        </div>
      </div>
    </Container>
  );
};

export default ProviderMessages;
