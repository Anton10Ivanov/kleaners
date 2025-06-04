
import React from 'react';
import { cn } from "@/lib/utils";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { ServiceCategoryCardDS } from "./ServiceCategoryCardDS";

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  popular?: boolean;
  href: string;
  features?: string[];
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

  return (
    <div className={cn("space-y-6", className)}>
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
            popular={category.popular}
            href={category.href}
            features={category.features}
          />
        ))}
      </ResponsiveGrid>
    </div>
  );
}
