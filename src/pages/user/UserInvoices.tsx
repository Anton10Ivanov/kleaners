
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMediaQuery } from '@/hooks/use-media-query';

export const UserInvoices = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-001',
      date: '2023-06-15',
      service: 'Regular Cleaning',
      amount: 120.00,
      status: 'Paid',
    },
    {
      id: 'INV-002',
      date: '2023-07-20',
      service: 'Deep Cleaning',
      amount: 250.00,
      status: 'Paid',
    },
    {
      id: 'INV-003',
      date: '2023-08-05',
      service: 'Move-in Cleaning',
      amount: 300.00,
      status: 'Pending',
    },
  ]);

  const downloadInvoice = (invoiceId: string) => {
    console.log(`Downloading invoice ${invoiceId}`);
    // In a real app, this would trigger a download of the invoice PDF
  };

  return (
    <div className={`${isMobile ? 'p-4' : 'p-6'}`}>
      <Card>
        <CardHeader>
          <CardTitle className={`${isMobile ? 'text-xl' : 'text-2xl'}`}>Your Invoices</CardTitle>
          <CardDescription>View and download your invoice history</CardDescription>
        </CardHeader>
        <CardContent>
          {isMobile ? (
            // Mobile card view for invoices
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <Card key={invoice.id} className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{invoice.id}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      invoice.status === 'Paid' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                    }`}>
                      {invoice.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm mb-3">
                    <p><span className="font-medium">Date:</span> {invoice.date}</p>
                    <p><span className="font-medium">Service:</span> {invoice.service}</p>
                    <p><span className="font-medium">Amount:</span> ${invoice.amount.toFixed(2)}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => downloadInvoice(invoice.id)}
                  >
                    Download
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            // Desktop table view for invoices
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.service}</TableCell>
                    <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        invoice.status === 'Paid' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                      }`}>
                        {invoice.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => downloadInvoice(invoice.id)}
                      >
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
