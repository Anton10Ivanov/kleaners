
import { useMediaQuery } from '@/hooks/use-media-query';
import ModernServiceTemplate from "./ModernServiceTemplate";
import MobileOptimizedServiceTemplate from "./MobileOptimizedServiceTemplate";

interface ServiceFeature {
  icon: any;
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

interface ResponsiveServiceTemplateProps {
  data: ServicePageData;
  showTestimonials?: boolean;
}

const ResponsiveServiceTemplate = ({ data, showTestimonials = false }: ResponsiveServiceTemplateProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return <MobileOptimizedServiceTemplate data={data} showTestimonials={showTestimonials} />;
  }

  return <ModernServiceTemplate data={data} showTestimonials={showTestimonials} />;
};

export default ResponsiveServiceTemplate;
