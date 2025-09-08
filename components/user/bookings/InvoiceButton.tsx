
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

  // Use a shorter timeout to improve perceived performance
  useEffect(() => {
    const checkInvoice = async () => {
      try {
        setIsChecking(true);
        const available = await hasInvoice(bookingId);
        setInvoiceAvailable(available);
      } catch (error) {
        console.error('Error checking invoice availability:', error);
        // Show button anyway on error (optimistic UI)
        setInvoiceAvailable(true);
      } finally {
        setIsChecking(false);
      }
    };
    
    // Add a small delay before checking to prevent blocking UI updates
    const timer = setTimeout(() => {
      checkInvoice();
    }, 100);
    
    return () => clearTimeout(timer);
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

  // Always show button while checking (avoid layout shifts)
  // This improves perceived performance - show a loading state instead of nothing
  if (isChecking) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
        disabled
      >
        <FileText className="h-4 w-4 mr-2" />
        Get Invoice
      </Button>
    );
  }

  // No invoice available - don't render button
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
