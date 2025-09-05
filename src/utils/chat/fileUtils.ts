
import { supabase } from '@/integrations/supabase/client';
import { FileAttachment } from './types';

// Upload file attachments
export const uploadAttachments = async (files: File[], conversationId: string): Promise<FileAttachment[]> => {
  const uploadedAttachments: FileAttachment[] = [];
  
  for (const file of files) {
    const fileId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const filePath = `${conversationId}/${fileId}-${file.name}`;
    
    try {
      const { data, error } = await supabase
        .storage
        .from('message_attachments')
        .upload(filePath, file);
      
      if (error) throw error;
      
      const { data: { publicUrl } } = supabase
        .storage
        .from('message_attachments')
        .getPublicUrl(filePath);
      
      uploadedAttachments.push({
        id: fileId,
        name: file.name,
        type: file.type,
        url: publicUrl,
        size: file.size
      });
    } catch (error) {
      console.error(`Error uploading file ${file.name}:`, error);
    }
  }
  
  return uploadedAttachments;
};
