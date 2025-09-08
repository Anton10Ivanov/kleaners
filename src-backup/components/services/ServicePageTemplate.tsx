import React from 'react';
import { cn } from "@/lib/utils";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import { UnifiedContainer } from "@/components/layout/UnifiedContainer";
import { LayoutSection } from "@/components/layout/LayoutSection";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { ResponsiveBookingCard } from "@/components/booking/shared/ResponsiveBookingCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Star, ArrowRight } from "lucide-react";


interface ServiceFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}

interface ServicePageTemplateProps {
  title: string;
  description: string;
  features: ServiceFeature[];
  packages: ServicePackage[];
  className?: string;
}

/**
 * Mobile-first service page template using design system components
 * Provides consistent layout and styling for all service pages
 */
export const ServicePageTemplate: React.FC<ServicePageTemplateProps> = ({
  title,
  description,
  features,
  packages,
  className
}) => {
  const { isMobile } = useMobileOptimizations();

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Hero Section */}
      <LayoutSection spacing="lg">
        <UnifiedContainer variant="hero">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {description}
            </p>
            {isMobile && (
              <div className="mt-8">
                <ResponsiveBookingCard
                  title="Book Home Cleaning"
                  description="Professional cleaning service for your home"
                  price={89}
                  duration="2-3 hours"
                  action={{
                    label: "Book Now",
                    onClick: () => console.log("Book home cleaning")
                  }}
                />
              </div>
            )}
          </div>
        </UnifiedContainer>
      </LayoutSection>

      {/* Features Section */}
      <LayoutSection spacing="lg">
        <UnifiedContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What's Included
            </h2>
            <p className="text-muted-foreground">
              Professional service with attention to detail
            </p>
          </div>
          
          <ResponsiveGrid cols={{ mobile: 1, tablet: 2, desktop: 3 }} gap="lg">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="card-primary card-spacing-md text-center form-spacing-relaxed hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 mx-auto text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </ResponsiveGrid>
        </UnifiedContainer>
      </LayoutSection>

      {/* Pricing Packages Section */}
      <LayoutSection spacing="lg">
        <UnifiedContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Service Packages
            </h2>
            <p className="text-muted-foreground">
              Choose the package that fits your needs
            </p>
          </div>
          <ResponsiveGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {packages.map((pkg) => (
              <div key={pkg.id} className="border rounded-lg card-spacing-md hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                  <p className="text-muted-foreground mb-4">{pkg.description}</p>
                  <div className="text-3xl font-bold text-primary mb-4">
                    €{pkg.price}
                  </div>
                  <div className="text-sm text-muted-foreground mb-6">
                    {pkg.duration}
                  </div>
                  <ul className="form-spacing-tight mb-6">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">
                    Book Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </ResponsiveGrid>
        </UnifiedContainer>
      </LayoutSection>

      {/* Benefits Section */}
      <LayoutSection spacing="lg">
        <UnifiedContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose Us
            </h2>
            <p className="text-muted-foreground">
              Professional service with guaranteed satisfaction
            </p>
          </div>
          <ResponsiveGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-muted-foreground">
                We ensure the highest standards of cleanliness and service
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">On-Time Service</h3>
              <p className="text-muted-foreground">
                Punctual and reliable service every time
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Satisfaction Promise</h3>
              <p className="text-muted-foreground">
                100% satisfaction guarantee or we'll make it right
              </p>
            </div>
          </ResponsiveGrid>
        </UnifiedContainer>
      </LayoutSection>
    </div>
  );
};
