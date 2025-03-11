
/**
 * Creates a new conversation between two users
 * 
 * @param userId - ID of the user initiating the conversation
 * @param recipientId - ID of the recipient user
 * @returns Promise resolving to the conversation ID
 */
export const createConversation = async (userId: string, recipientId: string): Promise<string> => {
  // In a real app, this would make an API call to create a conversation
  console.log(`Creating conversation between ${userId} and ${recipientId}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Generate a random conversation ID
  const conversationId = `conv_${Math.random().toString(36).substring(2, 12)}`;
  
  console.log(`Created conversation with ID: ${conversationId}`);
  
  return conversationId;
};

/**
 * Fetches conversations for a user
 * 
 * @param userId - ID of the user
 * @returns Promise resolving to an array of conversations
 */
export const fetchConversations = async (userId: string) => {
  // In a real app, this would make an API call to fetch conversations
  console.log(`Fetching conversations for user ${userId}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock conversations
  return [
    {
      id: 'conv_123',
      participantId: 'user456',
      participantName: 'Jane Doe',
      lastMessage: 'Hello there!',
      lastMessageTime: new Date().toISOString(),
      unreadCount: 2
    },
    {
      id: 'conv_456',
      participantId: 'user789',
      participantName: 'John Smith',
      lastMessage: 'When will my cleaning be done?',
      lastMessageTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      unreadCount: 0
    }
  ];
};
