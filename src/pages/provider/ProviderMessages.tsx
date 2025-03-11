
import { PageHeader } from '@/components/layout/PageHeader';
import MessagesSidebar from '@/components/provider/messages/MessagesSidebar';
import MessagesContent from '@/components/provider/messages/MessagesContent';
import { useConversationManagement } from '@/hooks/useConversationManagement';
import { Container } from '@/components/layout/Container';
import { useMediaQuery } from '@/hooks/use-media-query';

const ProviderMessages = () => {
  const providerId = "provider123"; // In a real app, get this from auth state
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const {
    selectedConversation,
    handleSelectConversation,
    handleNewConversation
  } = useConversationManagement(providerId);
  
  return (
    <div className="py-4 md:py-6 animate-fadeIn">
      <PageHeader 
        title="Messages" 
        description="Manage your conversations with clients" 
        className="mb-6"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {/* On mobile, only show the sidebar when no conversation is selected */}
        {(!isMobile || (isMobile && !selectedConversation)) && (
          <div className="md:col-span-1">
            <MessagesSidebar 
              providerId={providerId}
              selectedConversationId={selectedConversation?.id}
              onSelectConversation={handleSelectConversation}
              onNewConversation={handleNewConversation}
            />
          </div>
        )}
        
        {/* On mobile, only show the content when a conversation is selected */}
        {(!isMobile || (isMobile && selectedConversation)) && (
          <div className="md:col-span-2 xl:col-span-3">
            <MessagesContent
              selectedConversation={selectedConversation}
              providerId={providerId}
              onNewConversation={handleNewConversation}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderMessages;
