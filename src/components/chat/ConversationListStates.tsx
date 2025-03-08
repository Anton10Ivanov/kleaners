
import { Skeleton } from '@/components/ui/skeleton';

interface EmptyStateProps {
  searchQuery: string;
}

export const EmptyState = ({ searchQuery }: EmptyStateProps) => {
  return (
    <div className="p-8 text-center text-muted-foreground">
      {searchQuery.trim() !== '' 
        ? 'No conversations matching your search.' 
        : 'No conversations yet.'}
    </div>
  );
};

export const LoadingState = () => {
  return (
    <div className="p-3 space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};
