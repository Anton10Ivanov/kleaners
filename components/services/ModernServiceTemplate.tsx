
import { Button } from '@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card";
import { Badge } from '@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Star, Clock, Shield, CheckCircle, Phone } from "lucide-react";
import { LucideIcon } from "lucide-react";

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

interface ModernServiceTemplateProps {
  data: ServicePageData;
  showTestimonials?: boolean;
}

const ModernServiceTemplate = ({ data, showTestimonials = false }: ModernServiceTemplateProps) => {
  const navigate = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${data.heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-spacing-2xl">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              Professional Service
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {data.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {data.valueProposition}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                onClick={() => navigate('/contact')}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 section-spacing-xs text-lg font-semibold"
              >
                {data.ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 section-spacing-xs text-lg backdrop-blur-sm"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-muted-gold text-muted-gold" />
                <span className="font-semibold">{data.averageRating}</span>
                <span>rating</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>{data.completedJobs}+ completed jobs</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-400" />
                <span>{data.responseTime} response</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem-Solution Section */}
      <section className="section-spacing-xl bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                The Problem
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {data.problemStatement}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Solution
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {data.solutionStatement}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="section-spacing-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose Our Service
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.features.map((feature, index) => (
              <Card key={index} className="text-center card-spacing-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials - Only show if showTestimonials is true */}
      {showTestimonials && (
        <section className="section-spacing-xl bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              What Our Customers Say
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {data.testimonials.map((testimonial, index) => (
                <Card key={index} className="card-spacing-md">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating 
                              ? 'fill-muted-gold text-muted-gold' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                      "{testimonial.text}"
                    </p>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.service}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing & Booking Section */}
      <section className="section-spacing-xl bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Book Your Service?
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl card-spacing-lg shadow-lg mb-8">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Starting from</p>
                <p className="text-3xl font-bold text-primary">{data.startingPrice}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Response Time</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">{data.responseTime}</p>
              </div>
              
              <div>
                <Button
                  onClick={() => navigate('/contact')}
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white px-8 py-3"
                >
                  Book Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span>Fully Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Satisfaction Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {data.faqs.length > 0 && (
        <section className="section-spacing-xl">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="form-spacing-loose">
              {data.faqs.map((faq, index) => (
                <Card key={index} className="card-spacing-md">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernServiceTemplate;
