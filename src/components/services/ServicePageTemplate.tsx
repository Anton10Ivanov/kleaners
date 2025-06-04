
import React from 'react';
import { cn } from "@/lib/utils";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import { DesignSystemContainer } from "@/components/layout/DesignSystemContainer";
import { LayoutSection } from "@/components/layout/LayoutSection";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { MobileBookingCard } from "@/components/booking/mobile/MobileBookingCard";
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
  heroImage?: string;
  features: ServiceFeature[];
  packages: ServicePackage[];
  benefits: string[];
  onBookingClick: (packageId: string) => void;
  className?: string;
}

/**
 * Mobile-first service page template using design system components
 * Provides consistent layout and styling for all service pages
 */
export function ServicePageTemplate({
  title,
  description,
  heroImage,
  features,
  packages,
  benefits,
  onBookingClick,
  className,
}: ServicePageTemplateProps) {
  const { isMobile, getMobileSpacing } = useMobileOptimizations();

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Hero Section */}
      <LayoutSection spacing="xl" background="accent">
        <DesignSystemContainer size="xl">
          <div className={cn(
            "grid gap-8 items-center",
            isMobile ? "grid-cols-1 text-center" : "grid-cols-2"
          )}>
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {description}
              </p>
              <Button 
                onClick={() => onBookingClick(packages[0]?.id)}
                className="btn-primary w-full md:w-auto"
              >
                Book Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            {heroImage && (
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt={title}
                  className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
                />
              </div>
            )}
          </div>
        </DesignSystemContainer>
      </LayoutSection>

      {/* Features Section */}
      <LayoutSection spacing="lg">
        <DesignSystemContainer size="xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What's Included
            </h2>
            <p className="text-muted-foreground">
              Professional service with attention to detail
            </p>
          </div>
          
          <ResponsiveGrid columns={{ mobile: 1, tablet: 2, desktop: 3 }} gap="lg">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="card-primary p-6 text-center space-y-4 hover:shadow-md transition-shadow"
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
        </DesignSystemContainer>
      </LayoutSection>

      {/* Pricing Packages Section */}
      <LayoutSection spacing="lg" background="muted">
        <DesignSystemContainer size="xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Choose Your Package
            </h2>
            <p className="text-muted-foreground">
              Flexible options to fit your needs and budget
            </p>
          </div>

          <ResponsiveGrid 
            columns={{ mobile: 1, tablet: 2, desktop: 3 }} 
            gap="lg"
            className="max-w-5xl mx-auto"
          >
            {packages.map((pkg) => (
              <MobileBookingCard
                key={pkg.id}
                title={pkg.name}
                description={pkg.description}
                price={pkg.price}
                duration={pkg.duration}
                className={cn(
                  "relative h-full",
                  pkg.popular && "ring-2 ring-primary"
                )}
                action={{
                  label: "Select Package",
                  onClick: () => onBookingClick(pkg.id),
                  variant: pkg.popular ? "default" : "outline"
                }}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                
                <div className="space-y-3 mt-4">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </MobileBookingCard>
            ))}
          </ResponsiveGrid>
        </DesignSystemContainer>
      </LayoutSection>

      {/* Benefits Section */}
      <LayoutSection spacing="lg">
        <DesignSystemContainer size="xl">
          <div className="grid gap-8 items-center md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Why Choose Our Service?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="card-primary p-8 text-center space-y-4">
              <Clock className="h-12 w-12 mx-auto text-primary" />
              <h3 className="text-xl font-semibold text-foreground">
                Quick & Easy Booking
              </h3>
              <p className="text-muted-foreground">
                Book your service in just a few clicks. Our team will handle the rest.
              </p>
              <Button 
                onClick={() => onBookingClick(packages[0]?.id)}
                className="btn-primary w-full"
              >
                Get Started Today
              </Button>
            </div>
          </div>
        </DesignSystemContainer>
      </LayoutSection>
    </div>
  );
}
