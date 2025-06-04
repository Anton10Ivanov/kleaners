
import React from 'react';
import { cn } from "@/lib/utils";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { Check, X, Star } from "lucide-react";

interface ServiceComparisonItem {
  id: string;
  title: string;
  price: string;
  popular?: boolean;
  features: {
    name: string;
    included: boolean;
  }[];
  href: string;
}

interface ServiceComparisonProps {
  services: ServiceComparisonItem[];
  title?: string;
  className?: string;
}

/**
 * Service comparison component with design system integration
 * Mobile-optimized comparison table with responsive design
 */
export function ServiceComparison({
  services,
  title = "Compare Our Services",
  className
}: ServiceComparisonProps) {
  const { isMobile, getMobileSpacing, getMobileButtonSize } = useMobileOptimizations();

  // Calculate responsive columns based on number of services
  const getResponsiveCols = () => {
    const serviceCount = services.length;
    if (serviceCount <= 3) {
      return { mobile: 1, tablet: 2, desktop: serviceCount as 1 | 2 | 3 };
    }
    return { mobile: 1, tablet: 2, desktop: 3 };
  };

  return (
    <div className={cn("space-y-6", className)}>
      {title && (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the service package that best fits your needs
          </p>
        </div>
      )}

      <ResponsiveGrid 
        cols={getResponsiveCols()} 
        gap="md"
      >
        {services.map((service) => (
          <Card
            key={service.id}
            className={cn(
              "card-primary relative",
              service.popular && "ring-2 ring-primary"
            )}
          >
            {service.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">
                  <Star className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              </div>
            )}

            <CardHeader className={cn("text-center", getMobileSpacing('md'))}>
              <CardTitle className="text-xl font-bold">
                {service.title}
              </CardTitle>
              <div className="text-3xl font-bold text-primary">
                {service.price}
              </div>
            </CardHeader>

            <CardContent className={cn("space-y-4", getMobileSpacing('md'))}>
              <div className="space-y-3">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-red-500 flex-shrink-0" />
                    )}
                    <span 
                      className={cn(
                        "text-sm",
                        feature.included ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                className={cn(
                  "w-full",
                  getMobileButtonSize('md'),
                  service.popular ? "btn-primary" : "btn-outline"
                )}
                onClick={() => window.location.href = service.href}
              >
                Choose {service.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </ResponsiveGrid>
    </div>
  );
}
