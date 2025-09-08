
import { useState } from "react";
import { Button } from '@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card";
import { Badge } from '@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Star, Clock, Shield, CheckCircle, Phone, ChevronDown, ChevronUp } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ServiceFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ServiceTestimonial {
  name: string;
  rating: number;
  text: string;
  service: string;
}

interface ServiceFAQ {
  question: string;
  answer: string;
}

interface ServicePageData {
  title: string;
  subtitle: string;
  heroImage: string;
  valueProposition: string;
  problemStatement: string;
  solutionStatement: string;
  features: ServiceFeature[];
  startingPrice: string;
  responseTime: string;
  testimonials: ServiceTestimonial[];
  completedJobs: number;
  averageRating: number;
  faqs: ServiceFAQ[];
  ctaText: string;
}

interface MobileOptimizedServiceTemplateProps {
  data: ServicePageData;
  showTestimonials?: boolean;
}

const MobileOptimizedServiceTemplate = ({ data, showTestimonials = false }: MobileOptimizedServiceTemplateProps) => {
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);
  const [showProblemSolution, setShowProblemSolution] = useState(false);
  const [showMoreFAQs, setShowMoreFAQs] = useState(false);
  const navigate = useRouter();

  const visibleFeatures = showMoreFeatures ? data.features : data.features.slice(0, 2);
  const visibleFAQs = showMoreFAQs ? data.faqs : data.faqs.slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Hero Section - Compact */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${data.heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 w-full px-4 section-spacing-lg">
          <div className="max-w-lg mx-auto text-center">
            <Badge className="mb-3 bg-primary/20 text-primary border-primary/30 text-xs">
              Professional Service
            </Badge>
            
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              {data.title}
            </h1>
            
            <p className="text-base text-white/90 mb-6 leading-relaxed">
              {data.valueProposition}
            </p>
            
            {/* Prominent Mobile CTA */}
            <div className="form-spacing-normal">
              <Button
                onClick={() => navigate('/contact')}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-base font-semibold"
              >
                {data.ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 h-12 text-base backdrop-blur-sm"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </Button>
            </div>
            
            {/* Compact Trust Indicators */}
            <div className="flex justify-center items-center gap-4 mt-6 text-white/80 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-muted-gold text-muted-gold" />
                <span className="font-medium">{data.averageRating}</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>{data.completedJobs}+ jobs</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-blue-400" />
                <span>{data.responseTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Pricing Card - Above the fold */}
      <section className="section-spacing-sm px-4 bg-primary/5">
        <div className="max-w-lg mx-auto">
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardContent className="card-spacing-sm">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Starting from</p>
                <p className="text-2xl font-bold text-primary">{data.startingPrice}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Response: {data.responseTime}</p>
              </div>
              
              <Button
                onClick={() => navigate('/contact')}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white h-12"
              >
                Book Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <div className="flex justify-center items-center gap-4 mt-3 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Shield className="h-3 w-3 text-green-500" />
                  <span>Insured</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span>Guaranteed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Service Features - Collapsible */}
      <section className="section-spacing-md px-4">
        <div className="max-w-lg mx-auto">
          <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Why Choose Our Service
          </h2>
          
          <div className="form-spacing-normal">
            {visibleFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-spacing-sm">
                  <CardContent className="card-spacing-none">
                    <div className="flex items-start gap-3">
                      <feature.icon className="h-6 w-6 text-primary mt-1 shrink-0" />
                      <div>
                        <h3 className="font-medium mb-1 text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {data.features.length > 2 && (
            <Button
              variant="ghost"
              onClick={() => setShowMoreFeatures(!showMoreFeatures)}
              className="w-full mt-4 text-primary"
            >
              {showMoreFeatures ? (
                <>
                  Show Less
                  <ChevronUp className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  See {data.features.length - 2} More Features
                  <ChevronDown className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </section>

      {/* Problem-Solution - Collapsible */}
      <section className="section-spacing-md px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-lg mx-auto">
          <Button
            variant="ghost"
            onClick={() => setShowProblemSolution(!showProblemSolution)}
            className="w-full text-left card-spacing-none h-auto"
          >
            <div className="flex items-center justify-between w-full">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                How We Help
              </h2>
              {showProblemSolution ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </div>
          </Button>

          <AnimatePresence>
            {showProblemSolution && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 form-spacing-relaxed"
              >
                <Card className="card-spacing-sm">
                  <CardContent className="card-spacing-none">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">The Problem</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {data.problemStatement}
                    </p>
                  </CardContent>
                </Card>
                <Card className="card-spacing-sm">
                  <CardContent className="card-spacing-none">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Our Solution</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {data.solutionStatement}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FAQ Section - Collapsible */}
      {data.faqs.length > 0 && (
        <section className="section-spacing-md px-4">
          <div className="max-w-lg mx-auto">
            <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-6">
              Common Questions
            </h2>
            
            <div className="form-spacing-normal">
              {visibleFAQs.map((faq, index) => (
                <Card key={index} className="card-spacing-sm">
                  <CardContent className="card-spacing-none">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {data.faqs.length > 2 && (
              <Button
                variant="ghost"
                onClick={() => setShowMoreFAQs(!showMoreFAQs)}
                className="w-full mt-4 text-primary"
              >
                {showMoreFAQs ? (
                  <>
                    Show Less
                    <ChevronUp className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    See {data.faqs.length - 2} More Questions
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </section>
      )}

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 card-spacing-sm bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50 md:hidden">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 h-12"
          >
            <Phone className="mr-2 h-4 w-4" />
            Call
          </Button>
          <Button
            onClick={() => navigate('/contact')}
            size="lg"
            className="flex-1 bg-primary hover:bg-primary/90 text-white h-12"
          >
            Book Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Bottom padding to account for sticky CTA */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default MobileOptimizedServiceTemplate;
