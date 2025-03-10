
import { MapPin, Euro, Settings, Calendar, X, Star, Shield, Clock, UserCheck, Leaf, CheckCircle, FileText, MessageSquare, User, CalendarClock, Briefcase, Award } from "lucide-react";
import { AdvantageItem } from "./WhyChooseUsTypes";

// Content sections organized into categories for the advantage cards
export const whyChooseUsContent: AdvantageItem[] = [
  {
    title: "Local Trusted Cleaners",
    description: "Our carefully vetted cleaners live in your area, ensuring prompt arrivals with no travel fees and building community trust with every visit.",
    icon: MapPin,
    color: "bg-gradient-to-br from-cyan-500 to-emerald-500",
    category: "convenience"
  },
  {
    title: "Transparent Pricing",
    description: "No hidden costs or surprise charges. With our fixed pricing structure, you'll know exactly what you're paying from the start, giving you peace of mind.",
    icon: Euro,
    color: "bg-gradient-to-br from-orange-500 to-yellow-500",
    category: "transparency"
  },
  {
    title: "Customizable Service",
    description: "Every home is unique, and so are your cleaning needs. Tailor our services to match your specific requirements and adjust the cleaning scope as needed.",
    icon: Settings,
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
    category: "flexibility"
  },
  {
    title: "Flexible Scheduling",
    description: "Life is busy, and we understand that. Book appointments that work with your schedule, with availability Monday through Saturday.",
    icon: Calendar,
    color: "bg-gradient-to-br from-blue-500 to-teal-500",
    category: "flexibility"
  },
  {
    title: "No Commitments",
    description: "We're confident in our service quality without locking you into contracts. Book as needed, and cancel anytime with no penalties.",
    icon: X,
    color: "bg-gradient-to-br from-red-500 to-pink-500",
    category: "flexibility"
  },
  {
    title: "Satisfaction Guarantee",
    description: "Our 95% success rate and satisfaction guarantee ensure you'll be delighted with your cleaning, or we'll make it right at no additional cost.",
    icon: CheckCircle,
    color: "bg-gradient-to-br from-amber-500 to-orange-500",
    category: "quality"
  },
  {
    title: "Fully Insured",
    description: "All our cleaning services are fully insured up to €5M, providing you with complete peace of mind while we take care of your home.",
    icon: Shield,
    color: "bg-gradient-to-br from-green-500 to-teal-500",
    category: "trust"
  },
  {
    title: "Fast Online Booking",
    description: "Our streamlined booking process takes just 2 minutes. Select your service, enter your location, and you're all set.",
    icon: Clock,
    color: "bg-gradient-to-br from-blue-400 to-indigo-500",
    category: "convenience"
  },
  {
    title: "Vetted Professionals",
    description: "Every cleaner undergoes thorough background checks and training to ensure you receive the highest quality service.",
    icon: UserCheck,
    color: "bg-gradient-to-br from-indigo-500 to-purple-500",
    category: "trust"
  },
  {
    title: "Eco-Friendly Products",
    description: "We use environmentally responsible cleaning products that are effective yet gentle on your home and the planet.",
    icon: Leaf,
    color: "bg-gradient-to-br from-green-400 to-emerald-600",
    category: "quality"
  },
  {
    title: "Digital Cleaning Reports",
    description: "Receive detailed digital reports after each cleaning, documenting the work completed and any special attention areas.",
    icon: FileText,
    color: "bg-gradient-to-br from-blue-600 to-indigo-700",
    category: "convenience"
  },
  {
    title: "Same-Day Support",
    description: "Get quick responses to any questions or concerns with our responsive customer service team available throughout the day.",
    icon: MessageSquare,
    color: "bg-gradient-to-br from-pink-500 to-rose-600",
    category: "trust"
  },
  {
    title: "Regular Cleaner Matching",
    description: "We strive to match you with the same cleaner for recurring services, building familiarity with your home and preferences.",
    icon: User,
    color: "bg-gradient-to-br from-violet-500 to-purple-700",
    category: "convenience"
  },
  {
    title: "Smart Scheduling",
    description: "Our intelligent scheduling system finds the perfect time slot that works for both you and our cleaning professionals.",
    icon: CalendarClock,
    color: "bg-gradient-to-br from-sky-500 to-blue-700",
    category: "convenience"
  },
  {
    title: "Equipment Provided",
    description: "Our cleaners bring all necessary professional-grade equipment and supplies, so you don't have to worry about providing anything.",
    icon: Briefcase,
    color: "bg-gradient-to-br from-amber-600 to-orange-700",
    category: "convenience"
  },
  {
    title: "Service Warranty",
    description: "All our cleaning services come with a warranty period, ensuring any issues are promptly addressed to your complete satisfaction.",
    icon: Award,
    color: "bg-gradient-to-br from-emerald-500 to-green-700",
    category: "trust"
  }
];

// Group advantages by category using a more flexible approach
export const getAdvantagesByCategories = (): Record<string, AdvantageItem[]> => {
  const categoryMap: Record<string, AdvantageItem[]> = {};
  
  whyChooseUsContent.forEach(item => {
    // Map categories to display groups
    let displayCategory = item.category;
    if (['trust', 'security'].includes(item.category)) {
      displayCategory = 'trust';
    } else if (['convenience', 'transparency'].includes(item.category)) {
      displayCategory = 'convenience';
    } else if (['flexibility', 'quality'].includes(item.category)) {
      displayCategory = 'flexibility';
    }
    
    if (!categoryMap[displayCategory]) {
      categoryMap[displayCategory] = [];
    }
    categoryMap[displayCategory].push(item);
  });
  
  return categoryMap;
};

// Create category display mappings
export const categoryDisplayNames: Record<string, string> = {
  trust: 'Trust & Security',
  convenience: 'Convenience',
  flexibility: 'Flexibility & Quality'
};
