
import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { serviceCategories } from '../navigationData';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  href: string;
  type: 'service' | 'page' | 'recent';
}

interface SearchIntegrationProps {
  className?: string;
}

export const SearchIntegration: React.FC<SearchIntegrationProps> = ({
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sample recent searches (in real app, this would come from localStorage/API)
  const recentSearches: SearchResult[] = [
    { id: '1', title: 'Home Cleaning', description: 'Regular home cleaning service', href: '/services/home-cleaning', type: 'recent' },
    { id: '2', title: 'Office Cleaning', description: 'Commercial office cleaning', href: '/services/office-cleaning', type: 'recent' }
  ];

  // Search function
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults(recentSearches);
      return;
    }

    const serviceResults = serviceCategories
      .filter(category => 
        category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map(category => ({
        id: category.id || category.title,
        title: category.title,
        description: category.description,
        href: category.href || '/services',
        type: 'service' as const
      }));

    setResults(serviceResults.slice(0, 6));
  };

  useEffect(() => {
    performSearch(query);
  }, [query]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }
      if (event.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle outside clicks
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative hidden md:block", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder="Search services... (Ctrl+K)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-10 w-64 focus:w-80 transition-all duration-200"
        />
        {query && (
          <Button
            size="sm"
            variant="ghost"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-border/50 backdrop-blur-sm z-50 max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <div className="p-2">
              {!query && (
                <div className="px-3 py-2 text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Recent Searches
                </div>
              )}
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => {
                    window.location.href = result.href;
                    setIsOpen(false);
                    setQuery('');
                  }}
                  className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors text-left"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {result.type === 'recent' ? (
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Star className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground">{result.title}</h4>
                    <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                      {result.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No results found for "{query}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
