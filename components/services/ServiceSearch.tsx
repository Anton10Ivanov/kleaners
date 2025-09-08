
import React, { useState } from 'react';
import { cn } from '@/lib/utils";
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations";
import { Input } from '@/components/ui/input";
import { Button } from '@/components/ui/button";
import { Badge } from '@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";

interface ServiceSearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: string[]) => void;
  availableFilters: string[];
  className?: string;
}

/**
 * Service search and filter component with design system integration
 * Mobile-optimized search interface with touch-friendly filters
 */
export function ServiceSearch({
  onSearch,
  onFilterChange,
  availableFilters,
  className
}: ServiceSearchProps) {
  const { isMobile, getMobileSpacing, getMobileButtonSize } = useMobileOptimizations();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const toggleFilter = (filter: string) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter];
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setActiveFilters([]);
    onFilterChange([]);
  };

  return (
    <div className={cn("form-spacing-relaxed", className)}>
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for cleaning services..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className={cn(
            "pl-10 pr-4",
            getMobileSpacing('md'),
            "input-primary"
          )}
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "gap-2",
            getMobileButtonSize('md')
          )}
        >
          <Filter className="h-4 w-4" />
          {isMobile ? "Filters" : "Filter Services"}
          {activeFilters.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFilters.length}
            </Badge>
          )}
        </Button>

        {activeFilters.length > 0 && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className={cn(
              "gap-1 text-muted-foreground",
              getMobileButtonSize('sm')
            )}
          >
            <X className="h-3 w-3" />
            Clear
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="default"
              className="cursor-pointer hover:bg-primary/80"
              onClick={() => toggleFilter(filter)}
            >
              {filter}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}

      {/* Filter Options */}
      {showFilters && (
        <div className={cn(
          "bg-card border border-border rounded-lg",
          getMobileSpacing('md')
        )}>
          <div className="form-spacing-tight">
            <h3 className="font-medium text-foreground mb-3">
              Filter by Category
            </h3>
            <div className="flex flex-wrap gap-2">
              {availableFilters.map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilters.includes(filter) ? "default" : "outline"}
                  onClick={() => toggleFilter(filter)}
                  className={cn(
                    "text-sm",
                    getMobileButtonSize('sm')
                  )}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
