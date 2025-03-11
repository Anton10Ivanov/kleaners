
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CalendarCheck, 
  Clock, 
  CheckCircle2,
  Calendar
} from "lucide-react";

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

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className={`overflow-hidden ${filterType === "all" ? "ring-2 ring-primary" : ""}`}>
        <CardContent className="p-0">
          <Button
            onClick={() => handleFilterClick("all")}
            variant="ghost"
            className="w-full h-full rounded-none p-4 flex flex-col items-center justify-center gap-2"
          >
            <Calendar className="h-6 w-6 text-primary" />
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">{total}</span>
              <span className="text-sm text-muted-foreground">All Bookings</span>
            </div>
          </Button>
        </CardContent>
      </Card>

      <Card className={`overflow-hidden ${filterType === "upcoming" ? "ring-2 ring-primary" : ""}`}>
        <CardContent className="p-0">
          <Button
            onClick={() => handleFilterClick("upcoming")}
            variant="ghost"
            className="w-full h-full rounded-none p-4 flex flex-col items-center justify-center gap-2"
          >
            <CalendarCheck className="h-6 w-6 text-blue-500" />
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">{upcoming}</span>
              <span className="text-sm text-muted-foreground">Upcoming</span>
            </div>
          </Button>
        </CardContent>
      </Card>

      <Card className={`overflow-hidden ${filterType === "pending" ? "ring-2 ring-primary" : ""}`}>
        <CardContent className="p-0">
          <Button
            onClick={() => handleFilterClick("pending")}
            variant="ghost"
            className="w-full h-full rounded-none p-4 flex flex-col items-center justify-center gap-2"
          >
            <Clock className="h-6 w-6 text-amber-500" />
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">{pending}</span>
              <span className="text-sm text-muted-foreground">Pending</span>
            </div>
          </Button>
        </CardContent>
      </Card>

      <Card className={`overflow-hidden ${filterType === "completed" ? "ring-2 ring-primary" : ""}`}>
        <CardContent className="p-0">
          <Button
            onClick={() => handleFilterClick("completed")}
            variant="ghost"
            className="w-full h-full rounded-none p-4 flex flex-col items-center justify-center gap-2"
          >
            <CheckCircle2 className="h-6 w-6 text-green-500" />
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">{completed}</span>
              <span className="text-sm text-muted-foreground">Completed</span>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
