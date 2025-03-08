
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useInvoices } from '@/hooks/useInvoices';

interface InvoiceButtonProps {
  bookingId: string;
}

export function InvoiceButton({ bookingId }: InvoiceButtonProps): JSX.Element | null {
  const { viewInvoice, hasInvoice, isDownloading } = useInvoices();
  const [invoiceAvailable, setInvoiceAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const checkInvoice = async () => {
      const available = await hasInvoice(bookingId);
      setInvoiceAvailable(available);
    };
    
    checkInvoice();
  }, [bookingId, hasInvoice]);

  // Don't render until we know if invoice is available
  if (invoiceAvailable === null) {
    return null;
  }

  // No invoice available, don't render button
  if (!invoiceAvailable) {
    return null;
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="mt-2"
      onClick={() => viewInvoice(bookingId)}
      disabled={isDownloading}
    >
      <FileText className="h-4 w-4 mr-2" />
      {isDownloading ? 'Loading...' : 'View Invoice'}
    </Button>
  );
}
