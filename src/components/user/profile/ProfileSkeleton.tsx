
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

/**
 * ProfileSkeleton Component
 * 
 * Displays a loading skeleton for the user profile
 * 
 * @returns {JSX.Element} Profile skeleton component
 */
export function ProfileSkeleton(): JSX.Element {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col items-center mb-6">
        <Skeleton className="h-24 w-24 rounded-full mb-4" />
        <Skeleton className="h-8 w-48 mb-4" />
      </div>
      
      <Card>
        <CardContent className="mt-6">
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
