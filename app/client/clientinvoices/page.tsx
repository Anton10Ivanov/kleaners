'use client'


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

export const ClientInvoices = () => {
  const navigate = useRouter();
  
  useEffect(() => {
    // Redirect to the bookings page with the completed filter
    const timer = setTimeout(() => {
      navigate('/client/bookings?filter=completed');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="container mx-auto card-spacing-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Invoices</CardTitle>
        </CardHeader>
        <CardContent className="text-center form-spacing-relaxed">
          <div className="section-spacing-md flex justify-center">
            <FileText className="h-16 w-16 text-primary opacity-70" />
          </div>
          
          <p className="text-muted-foreground">
            Invoices have been integrated with your booking history.
          </p>
          <p className="text-muted-foreground mb-6">
            You will be redirected to your completed bookings where you can view and download invoices.
          </p>
          
          <Button 
            variant="default" 
            onClick={() => navigate('/client/bookings?filter=completed')}
          >
            Go to Completed Bookings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientInvoices;
