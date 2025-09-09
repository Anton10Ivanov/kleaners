'use client'

import React from 'react';
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from "lucide-react";


interface ServiceCategoryCardDSProps {
  title: string;
  description: string;
  image?: string;
  icon: React.ReactNode;
  services: string[];
  badge?: string;
  popular?: boolean;
  href: string;
  features?: string[];
  onExploreClick: () => void;
  className?: string;
}

/**
 * Service category card with design system integration
 * Mobile-optimized with touch-friendly interactions
 */
export function ServiceCategoryCardDS({
  title,
  description,
  image,
  icon,
  services,
  badge,
  popular,
  href,
  features,
  onExploreClick,
  className,
}: ServiceCategoryCardDSProps) {
  const { getMobileSpacing, getMobileButtonSize } = useMobileOptimizations();

  return (
    <Card className={cn(
      "card-primary group hover:card-elevated transition-all duration-300",
      "hover:transform hover:scale-[1.02] cursor-pointer",
      popular && "ring-2 ring-primary",
      className
    )}>
      {/* Header with image/icon */}
      <CardHeader className={cn("relative", getMobileSpacing('md'))}>
        {(badge || popular) && (
          <Badge 
            variant="secondary" 
            className="absolute top-3 right-3 bg-primary/10 text-primary"
          >
            {badge || (popular ? "Popular" : "")}
          </Badge>
        )}
        
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 text-primary flex-shrink-0">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {description}
            </p>
          </div>
        </div>

        {image && (
          <div className="mt-4 rounded-lg overflow-hidden">
            <Image src={image} alt={title}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            / width={500} height={300} />
          </div>
        )}
      </CardHeader>

      {/* Services list */}
      <CardContent className={cn("form-spacing-relaxed", getMobileSpacing('md'))}>
        <div className="form-spacing-tight">
          <h4 className="text-sm font-medium text-foreground">
            Popular Services:
          </h4>
          <div className="flex flex-wrap gap-2">
            {services.slice(0, 3).map((service, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="text-xs bg-muted/50"
              >
                {service}
              </Badge>
            ))}
            {services.length > 3 && (
              <Badge variant="outline" className="text-xs bg-muted/50">
                +{services.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <Button
          onClick={onExploreClick}
          variant="outline"
          className={cn(
            "w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors",
            getMobileButtonSize('md')
          )}
        >
          Explore Services
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}
