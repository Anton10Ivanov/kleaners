
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CalendarCheck, 
  Clock, 
  CheckCircle2,
  Calendar,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

interface BookingSummary {
  total: number;
  upcoming: number;
  pending: number;
  completed: number;
}

interface FilterableStatsCardsProps {
  filterType: string;
  setFilterType: (type: string) => void;
  bookingSummary: BookingSummary;
}

export const FilterableStatsCards = ({
  filterType,
  setFilterType,
  bookingSummary,
}: FilterableStatsCardsProps) => {
  const { total, upcoming, pending, completed } = bookingSummary;

  const handleFilterClick = (type: string) => {
    setFilterType(type);
  };

  // Define the cards with their properties for more consistent rendering
  const cards = [
    {
      id: "all",
      label: "All Bookings",
      value: total,
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      id: "upcoming",
      label: "Upcoming",
      value: upcoming,
      icon: CalendarCheck,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: "pending",
      label: "Pending",
      value: pending,
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      id: "completed",
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => {
        const isActive = filterType === card.id;
        const Icon = card.icon;
        
        return (
          <Card 
            key={card.id} 
            className={`overflow-hidden transition-all duration-200 ${
              isActive ? "ring-2 ring-primary shadow-md" : "hover:shadow-sm"
            }`}
          >
            <CardContent className="card-spacing-none">
              <Button
                onClick={() => handleFilterClick(card.id)}
                variant="ghost"
                className={`w-full h-full rounded-none card-spacing-sm flex flex-col items-center justify-center gap-3 ${
                  isActive ? "bg-white" : "hover:bg-gray-50"
                }`}
              >
                <div className={`p-2 rounded-full ${isActive ? card.bgColor : "bg-gray-100"}`}>
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </div>
                
                <div className="flex flex-col items-center">
                  <span className={`text-2xl font-bold ${isActive ? "text-primary" : ""}`}>
                    {card.value}
                  </span>
                  <span className="text-sm text-muted-foreground mt-1">
                    {card.label}
                  </span>
                </div>
                
                {isActive && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-1 flex items-center text-xs text-primary"
                  >
                    <span>View {card.label}</span>
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </motion.div>
                )}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
