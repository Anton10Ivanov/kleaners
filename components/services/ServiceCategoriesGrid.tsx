
import React from 'react';
import { cn } from '@/lib/utils";
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations";
import { ResponsiveGrid } from '@/components/layout/ResponsiveGrid";
import { ServiceCategoryCardDS } from "./ServiceCategoryCardDS";
import { Home, Building, Sparkles } from "lucide-react";

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  popular?: boolean;
  href: string;
  features?: string[];
  category?: string;
}

interface ServiceCategoriesGridProps {
  categories: ServiceCategory[];
  title?: string;
  className?: string;
}

/**
 * Service categories grid with design system integration
 * Mobile-first responsive grid using ServiceCategoryCardDS components
 */
export function ServiceCategoriesGrid({
  categories,
  title = "Our Services",
  className
}: ServiceCategoriesGridProps) {
  const { getMobileSpacing } = useMobileOptimizations();

  // Helper function to get appropriate icon for service category
  const getServiceIcon = (category: ServiceCategory) => {
    if (category.title.toLowerCase().includes('home')) return <Home className="w-full h-full" />;
    if (category.title.toLowerCase().includes('office')) return <Building className="w-full h-full" />;
    return <Sparkles className="w-full h-full" />;
  };

  // Helper function to extract services from features
  const getServices = (category: ServiceCategory) => {
    return category.features?.slice(0, 5) || ['Professional cleaning', 'Quality service', 'Reliable staff'];
  };

  return (
    <div className={cn("form-spacing-loose", className)}>
      {title && (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">
            Professional cleaning services tailored to your needs
          </p>
        </div>
      )}
      
      <ResponsiveGrid 
        cols={{ mobile: 1, tablet: 2, desktop: 3 }} 
        gap="lg"
        className={getMobileSpacing('md')}
      >
        {categories.map((category) => (
          <ServiceCategoryCardDS
            key={category.id}
            title={category.title}
            description={category.description}
            image={category.image}
            icon={getServiceIcon(category)}
            services={getServices(category)}
            popular={category.popular}
            href={category.href}
            features={category.features}
            onExploreClick={() => window.location.href = category.href}
          />
        ))}
      </ResponsiveGrid>
    </div>
  );
}
