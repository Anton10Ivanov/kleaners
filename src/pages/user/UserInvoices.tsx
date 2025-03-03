
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMediaQuery } from '@/hooks/use-media-query';

export const UserInvoices = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <div className={`${isMobile ? 'p-4' : 'p-6'}`}>
      <Card>
        <CardHeader>
          <CardTitle>My Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">You have no invoices at this time.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserInvoices;
