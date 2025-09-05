
<<<<<<< HEAD
import * as React from 'react';
=======
import React from 'react';
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
import { cn } from "@/lib/utils";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import { UnifiedContainer } from "@/components/layout/UnifiedContainer";
import { LayoutSection } from "@/components/layout/LayoutSection";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { MobileBookingCard } from "@/components/booking/mobile/MobileBookingCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Star, ArrowRight } from "lucide-react";
<<<<<<< HEAD
import { LazyImage } from "@/components/ui/LazyImage";
=======
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf

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
<<<<<<< HEAD
  subtitle?: string;
  heroImage?: string;
  features: ServiceFeature[];
  packages?: ServicePackage[];
  benefits: string[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  startingPrice?: string;
  responseTime?: string;
  onBookingClick?: (packageId?: string) => void;
  className?: string;
  showPackages?: boolean;
  showFAQs?: boolean;
=======
  heroImage?: string;
  features: ServiceFeature[];
  packages: ServicePackage[];
  benefits: string[];
  onBookingClick: (packageId: string) => void;
  className?: string;
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
}

/**
 * Mobile-first service page template using design system components
 * Provides consistent layout and styling for all service pages
 */
<<<<<<< HEAD
export const ServicePageTemplate: React.FC<ServicePageTemplateProps> = ({
  title,
  description,
  subtitle,
  heroImage,
  features,
  packages = [],
  benefits,
  faqs = [],
  startingPrice,
  responseTime,
  onBookingClick,
  className,
  showPackages = true,
  showFAQs = true
}) => {
  const { isMobile } = useMobileOptimizations();
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  const handleBookingClick = (packageId?: string) => {
    if (onBookingClick) {
      onBookingClick(packageId);
    } else {
      // Default booking navigation
      window.location.href = '/booking';
    }
  };
=======
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
  const { isMobile } = useMobileOptimizations();
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Hero Section */}
<<<<<<< HEAD
      <LayoutSection className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <UnifiedContainer size="xl">
          <div className={cn(
            "mobile-hero",
            isMobile ? "mobile-fade-in" : "grid grid-cols-2 gap-8 items-center py-16 lg:py-20"
          )}>
            <div className={cn(
              "space-y-6",
              isMobile ? "text-center mobile-stack" : "text-left"
            )}>
              {subtitle && (
                <Badge className="mobile-badge-primary mobile-scale-in">
                  <Star className="h-3 w-3" />
                  {subtitle}
                </Badge>
              )}
              
              <div className="space-y-4">
                <h1 className={cn(
                  "mobile-heading-xl",
                  !isMobile && "text-4xl lg:text-5xl"
                )}>
                  {title}
                </h1>
                
                <p className="mobile-body-lg">
                  {description}
                </p>
              </div>

              {/* Pricing and Response Time */}
              <div className={cn(
                "flex gap-4",
                isMobile ? "flex-col items-center mobile-slide-in-left" : "flex-row items-center"
              )}>
                {startingPrice && (
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <span className="mobile-caption">Starting from</span>
                    <span className={isMobile ? "text-xl" : "text-2xl"}>{startingPrice}</span>
                  </div>
                )}
                
                {responseTime && (
                  <div className="flex items-center gap-2 text-accent">
                    <Clock className="h-4 w-4" />
                    <span className="mobile-caption font-medium">{responseTime}</span>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <div className={cn(
                "flex gap-3 mobile-slide-in-right",
                isMobile ? "flex-col" : "flex-row"
              )}>
                <button
                  onClick={() => handleBookingClick()}
                  className={cn(
                    "mobile-btn-primary group",
                    isMobile ? "w-full" : ""
                  )}
                >
                  Book Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button
                  onClick={() => {
                    const featuresSection = document.getElementById('features');
                    featuresSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={cn(
                    "mobile-btn-secondary",
                    isMobile ? "w-full" : ""
                  )}
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Hero Image */}
            {heroImage && (
              <div className={cn(
                "relative mobile-scale-in",
                isMobile ? "order-first mb-8" : "order-last"
              )}>
                <LazyImage
                  src={heroImage}
                  alt={title}
                  className="w-full h-auto rounded-2xl shadow-2xl mobile-gpu-accelerated"
                  loading="eager"
=======
      <LayoutSection spacing="xl" background="accent">
        <UnifiedContainer size="xl">
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
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
                />
              </div>
            )}
          </div>
        </UnifiedContainer>
      </LayoutSection>

      {/* Features Section */}
      <LayoutSection spacing="lg">
        <UnifiedContainer size="xl">
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
        </UnifiedContainer>
      </LayoutSection>

      {/* Pricing Packages Section */}
<<<<<<< HEAD
      {showPackages && packages.length > 0 && (
        <LayoutSection spacing="lg" background="muted">
          <UnifiedContainer size="xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Choose Your Package
              </h2>
              <p className="text-muted-foreground">
                Flexible options to fit your needs and budget
              </p>
            </div>

            <ResponsiveGrid 
              cols={{ mobile: 1, tablet: 2, desktop: 3 }} 
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
                    onClick: () => handleBookingClick(pkg.id),
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
          </UnifiedContainer>
        </LayoutSection>
      )}
=======
      <LayoutSection spacing="lg" background="muted">
        <UnifiedContainer size="xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Choose Your Package
            </h2>
            <p className="text-muted-foreground">
              Flexible options to fit your needs and budget
            </p>
          </div>

          <ResponsiveGrid 
            cols={{ mobile: 1, tablet: 2, desktop: 3 }} 
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
        </UnifiedContainer>
      </LayoutSection>
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf

      {/* Benefits Section */}
      <LayoutSection spacing="lg">
        <UnifiedContainer size="xl">
<<<<<<< HEAD
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose Our Service?
            </h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="card-primary p-6 text-center space-y-3">
                <Star className="h-8 w-8 mx-auto text-primary" />
                <p className="text-muted-foreground leading-relaxed">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </UnifiedContainer>
      </LayoutSection>

      {/* FAQs Section */}
      {showFAQs && faqs.length > 0 && (
        <LayoutSection spacing="lg" background="muted">
          <UnifiedContainer size="lg">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Everything you need to know about our service
              </p>
            </div>
            
            <div className="space-y-4 max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="card-primary p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </UnifiedContainer>
        </LayoutSection>
      )}
=======
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
        </UnifiedContainer>
      </LayoutSection>
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
    </div>
  );
}
