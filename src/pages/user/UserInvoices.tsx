
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, FileText, Download, Eye } from "lucide-react";
import type { User } from "@/types/supabase";

interface UserContextType {
  user: User;
}

interface Invoice {
  id: string;
  booking_id: string;
  user_id: string;
  amount: number;
  status: 'paid' | 'unpaid';
  created_at: string;
  due_date: string;
  invoice_number: string;
  service_type: string;
}

const UserInvoices = () => {
  const { user } = useOutletContext<UserContextType>();
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        // Example: Fetching related bookings and creating mock invoices from them
        const { data: bookings, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id);
        
        if (error) throw error;
        
        // For demonstration, we'll create mock invoices based on bookings
        // In a real app, you would fetch actual invoices from a dedicated table
        const mockInvoices: Invoice[] = (bookings || []).map((booking, index) => ({
          id: `inv-${booking.id}`,
          booking_id: booking.id,
          user_id: booking.user_id,
          amount: booking.total_price || 0,
          status: Math.random() > 0.3 ? 'paid' : 'unpaid',
          created_at: booking.created_at || new Date().toISOString(),
          due_date: new Date(new Date(booking.date || new Date()).getTime() + 15 * 24 * 60 * 60 * 1000).toISOString(),
          invoice_number: `INV-${2023 + index}-${1000 + index}`,
          service_type: booking.service_type
        }));
        
        setInvoices(mockInvoices);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchInvoices();
    }
  }, [user]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const handleDownload = (invoiceId: string) => {
    console.log(`Downloading invoice ${invoiceId}`);
    // In a real app, this would call an API endpoint to generate and download the invoice PDF
  };

  const handleView = (invoiceId: string) => {
    console.log(`Viewing invoice ${invoiceId}`);
    // In a real app, this would navigate to a detailed invoice view or open a modal
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold">My Invoices</h1>
        <p className="text-muted-foreground">View and manage your payment history</p>
      </div>

      {invoices.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No invoices found</h3>
            <p className="text-muted-foreground mb-4">
              Your invoices will appear here after you've made bookings.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <Card key={invoice.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{invoice.invoice_number}</CardTitle>
                    <CardDescription>{invoice.service_type}</CardDescription>
                  </div>
                  <div className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${invoice.status === 'paid' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300' 
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-300'}
                  `}>
                    {invoice.status === 'paid' ? 'Paid' : 'Unpaid'}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Invoice Date</p>
                    <p className="font-medium">{formatDate(invoice.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Due Date</p>
                    <p className="font-medium">{formatDate(invoice.due_date)}</p>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-border">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">Amount</p>
                    <p className="text-lg font-semibold">{formatCurrency(invoice.amount)}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => handleView(invoice.id)}
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => handleDownload(invoice.id)}
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserInvoices;
