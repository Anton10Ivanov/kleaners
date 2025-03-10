
import { MapPin, Euro, Settings, Calendar, X, Star, Shield, Clock, UserCheck, Leaf, CheckCircle, FileText, MessageSquare, User, CalendarClock, Briefcase, Award } from "lucide-react";

// Define our three complementary colors
const colors = {
  primary: "#0FA0CE", // Current blue
  secondary: "#28A745", // Green
  tertiary: "#7E69AB" // Purple/violet
};

// Content sections organized into categories for the advantage cards
export const whyChooseUsContent = [
  {
    title: "Local Trusted Cleaners",
    description: "Vetted cleaners from your area ensure prompt service with no travel fees and build community trust.",
    icon: MapPin,
    iconColor: colors.primary,
    category: "convenience"
  },
  {
    title: "Transparent Pricing",
    description: "No hidden costs or surprise charges - our fixed pricing means you know exactly what you'll pay.",
    icon: Euro,
    iconColor: colors.secondary,
    category: "transparency"
  },
  {
    title: "Customizable Service",
    description: "Tailor our services to match your specific needs and adjust cleaning scope as required.",
    icon: Settings,
    iconColor: colors.tertiary,
    category: "flexibility"
  },
  {
    title: "Flexible Scheduling",
    description: "Book appointments Monday through Saturday that fit your busy schedule.",
    icon: Calendar,
    iconColor: colors.primary,
    category: "flexibility"
  },
  {
    title: "No Commitments",
    description: "Book as needed and cancel anytime - no contracts or penalties.",
    icon: X,
    iconColor: colors.secondary,
    category: "flexibility"
  },
  {
    title: "Satisfaction Guarantee",
    description: "Our 95% success rate guarantees you'll be delighted, or we'll fix it at no extra cost.",
    icon: CheckCircle,
    iconColor: colors.tertiary,
    category: "quality"
  },
  {
    title: "Fully Insured",
    description: "Complete peace of mind with our €5M insurance coverage for all services.",
    icon: Shield,
    iconColor: colors.primary,
    category: "trust"
  },
  {
    title: "Fast Online Booking",
    description: "Book in just 2 minutes - select service, enter location, done.",
    icon: Clock,
    iconColor: colors.secondary,
    category: "convenience"
  },
  {
    title: "Vetted Professionals",
    description: "Every cleaner undergoes thorough background checks and training to ensure top quality.",
    icon: UserCheck,
    iconColor: colors.tertiary,
    category: "trust"
  },
  {
    title: "Eco-Friendly Products",
    description: "We use green cleaning products that are effective but gentle on your home and the planet.",
    icon: Leaf,
    iconColor: colors.primary,
    category: "quality"
  },
  {
    title: "Digital Cleaning Reports",
    description: "Receive detailed digital reports after each cleaning documenting all completed work.",
    icon: FileText,
    iconColor: colors.secondary,
    category: "convenience"
  },
  {
    title: "Same-Day Support",
    description: "Get quick responses from our customer service team throughout the day.",
    icon: MessageSquare,
    iconColor: colors.tertiary,
    category: "trust"
  },
  {
    title: "Regular Cleaner Matching",
    description: "We pair you with the same cleaner for recurring services to build familiarity.",
    icon: User,
    iconColor: colors.primary,
    category: "convenience"
  },
  {
    title: "Smart Scheduling",
    description: "Our system finds perfect time slots that work for both you and our cleaners.",
    icon: CalendarClock,
    iconColor: colors.secondary,
    category: "convenience"
  },
  {
    title: "Equipment Provided",
    description: "Cleaners bring all professional equipment and supplies - you provide nothing.",
    icon: Briefcase,
    iconColor: colors.tertiary,
    category: "convenience"
  },
  {
    title: "Service Warranty",
    description: "All services include a warranty period with prompt resolution of any issues.",
    icon: Award,
    iconColor: colors.primary,
    category: "trust"
  }
];

// Group the advantages by category for better organization
export const advantagesByCategory = {
  trust: whyChooseUsContent.filter(item => ['trust', 'security'].includes(item.category)),
  convenience: whyChooseUsContent.filter(item => ['convenience', 'transparency'].includes(item.category)),
  flexibility: whyChooseUsContent.filter(item => ['flexibility', 'quality'].includes(item.category))
};
