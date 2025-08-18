
import React, { useState, useMemo } from 'react';
import { cn } from "@/lib/utils";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import { UnifiedContainer } from "@/components/layout/UnifiedContainer";
import { LayoutSection } from "@/components/layout/LayoutSection";
import { ServiceSearch } from "./ServiceSearch";
import { ServiceCategoriesGrid } from "./ServiceCategoriesGrid";

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  popular?: boolean;
  href: string;
  features?: string[];
  category: string;
}

interface ServiceBrowsingInterfaceProps {
  services: ServiceCategory[];
  title?: string;
  className?: string;
}

/**
 * Complete service browsing interface with search, filters, and grid
 * Mobile-first design with design system integration
 */
export function ServiceBrowsingInterface({
  services,
  title = "Browse Our Services",
  className
}: ServiceBrowsingInterfaceProps) {
  const { isMobile } = useMobileOptimizations();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Extract unique categories for filtering
  const availableFilters = useMemo(() => {
    const categories = services.map(service => service.category);
    return Array.from(new Set(categories));
  }, [services]);

  // Filter services based on search and filters
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = !searchQuery || 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = activeFilters.length === 0 || 
        activeFilters.includes(service.category);

      return matchesSearch && matchesFilter;
    });
  }, [services, searchQuery, activeFilters]);

  return (
    <LayoutSection spacing="xl" className={className}>
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find the perfect cleaning service for your needs. Professional, reliable, and affordable.
            </p>
          </div>

          {/* Search and Filters */}
          <ServiceSearch
            onSearch={setSearchQuery}
            onFilterChange={setActiveFilters}
            availableFilters={availableFilters}
          />

          {/* Results Summary */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
              {searchQuery && ` for "${searchQuery}"`}
              {activeFilters.length > 0 && ` in ${activeFilters.join(', ')}`}
            </p>
          </div>

          {/* Services Grid */}
          {filteredServices.length > 0 ? (
            <ServiceCategoriesGrid
              categories={filteredServices}
              title="" // No title since we have the main header
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                No services found matching your criteria
              </p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or removing some filters
              </p>
            </div>
          )}
        </div>
    </LayoutSection>
  );
}
