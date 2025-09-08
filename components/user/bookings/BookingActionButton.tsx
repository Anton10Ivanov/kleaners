
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export function BookingActionButton(): JSX.Element {
  return (
    <div className="flex justify-center mb-6">
      <Link href="/">
        <Button className="bg-primary hover:bg-primary/90">
          <PlusCircle className="mr-2 h-4 w-4" /> Book New Service
        </Button>
      </Link>
    </div>
  );
}
