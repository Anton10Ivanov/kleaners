
import { MapPin, Euro, Settings, Calendar, X, Star, Shield, Clock, UserCheck } from "lucide-react";

// Content sections organized into categories for the advantage cards
export const whyChooseUsContent = [
  {
    title: "Local Cleaners",
    description: "Our cleaners live in your area, thanks to our postal code-based system. This means no travel fees and prompt arrivals for every appointment.",
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
    title: "Exceptional Quality",
    description: "Our 95% success rate speaks volumes about our dedication to quality. Experience the difference with cleaners who truly care about their work.",
    icon: Star,
    color: "bg-gradient-to-br from-amber-500 to-orange-500",
    category: "quality"
  },
  {
    title: "Fully Insured",
    description: "All our cleaning services are fully insured up to €5M, providing you with complete peace of mind while we take care of your home.",
    icon: Shield,
    color: "bg-gradient-to-br from-green-500 to-teal-500",
    category: "security"
  },
  {
    title: "Fast Booking",
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
    category: "security"
  }
];

// Group the advantages by category for better organization
export const advantagesByCategory = {
  trust: whyChooseUsContent.filter(item => ['security', 'quality'].includes(item.category)),
  convenience: whyChooseUsContent.filter(item => ['convenience', 'transparency'].includes(item.category)),
  flexibility: whyChooseUsContent.filter(item => item.category === 'flexibility')
};
