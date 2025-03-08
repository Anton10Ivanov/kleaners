
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Invoice {
  id: string;
  booking_id: string;
  file_path: string;
  created_at: string;
  amount: number;
  invoice_number: string;
  status: string;
}

export function useInvoices() {
  const [isDownloading, setIsDownloading] = useState(false);

  /**
   * Downloads an invoice PDF for a specific booking
   * @param bookingId Booking ID to download invoice for
   * @returns URL to the downloaded file or null if error
   */
  const downloadInvoice = async (bookingId: string): Promise<string | null> => {
    setIsDownloading(true);
    try {
      // Fetch invoice record from database
      const { data: invoice, error: fetchError } = await supabase
        .from('invoices')
        .select('*')
        .eq('booking_id', bookingId)
        .single();

      if (fetchError || !invoice) {
        toast.error('Invoice not found');
        return null;
      }

      // Download the file from storage
      const { data: fileData, error: downloadError } = await supabase
        .storage
        .from('invoices')
        .download(invoice.file_path);
      
      if (downloadError || !fileData) {
        toast.error('Error downloading invoice');
        return null;
      }

      // Create a URL for the blob
      const url = URL.createObjectURL(fileData);
      toast.success('Invoice downloaded successfully');
      return url;
    } catch (error) {
      console.error('Error downloading invoice:', error);
      toast.error('Error downloading invoice');
      return null;
    } finally {
      setIsDownloading(false);
    }
  };

  /**
   * Opens the invoice in a new tab for viewing
   * @param bookingId Booking ID to view invoice for
   */
  const viewInvoice = async (bookingId: string): Promise<void> => {
    const url = await downloadInvoice(bookingId);
    if (url) {
      window.open(url, '_blank');
    }
  };

  /**
   * Checks if a booking has an invoice associated with it
   * @param bookingId Booking ID to check
   * @returns Boolean indicating if invoice exists
   */
  const hasInvoice = async (bookingId: string): Promise<boolean> => {
    const { data, error } = await supabase
      .from('invoices')
      .select('id')
      .eq('booking_id', bookingId)
      .maybeSingle();
    
    if (error) {
      console.error('Error checking invoice status:', error);
      return false;
    }
    
    return !!data;
  };

  return {
    downloadInvoice,
    viewInvoice,
    hasInvoice,
    isDownloading
  };
}
