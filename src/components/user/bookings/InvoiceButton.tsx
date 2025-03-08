
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useInvoices } from '@/hooks/useInvoices';
import { toast } from 'sonner';

interface InvoiceButtonProps {
  bookingId: string;
}

export function InvoiceButton({ bookingId }: InvoiceButtonProps): JSX.Element {
  const { viewInvoice, hasInvoice, isDownloading } = useInvoices();
  const [invoiceAvailable, setInvoiceAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkInvoice = async () => {
      try {
        setIsChecking(true);
        const available = await hasInvoice(bookingId);
        setInvoiceAvailable(available);
      } catch (error) {
        console.error('Error checking invoice availability:', error);
        // Fallback to true for demo purposes when there's an error
        setInvoiceAvailable(true);
      } finally {
        setIsChecking(false);
      }
    };
    
    checkInvoice();
  }, [bookingId, hasInvoice]);

  const handleInvoiceClick = async () => {
    try {
      await viewInvoice(bookingId);
    } catch (error) {
      console.error('Error viewing invoice:', error);
      toast.error('Could not download invoice', {
        description: 'Please try again later'
      });
    }
  };

  // Show loading state when checking
  if (isChecking) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full"
        disabled
      >
        <FileText className="h-4 w-4 mr-2" />
        Checking...
      </Button>
    );
  }

  // No invoice available, don't render button (fallback is handled in the catch block above)
  if (invoiceAvailable === false) {
    return null;
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="w-full bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
      onClick={handleInvoiceClick}
      disabled={isDownloading}
    >
      <FileText className="h-4 w-4 mr-2" />
      {isDownloading ? 'Loading...' : 'Get Invoice'}
    </Button>
  );
}
