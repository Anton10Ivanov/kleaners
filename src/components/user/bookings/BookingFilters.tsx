
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * BookingFiltersProps interface
 */
interface BookingFiltersProps {
  /**
   * Currently active tab
   */
  activeTab: string;
  
  /**
   * Current search query
   */
  searchQuery: string;
  
  /**
   * Handler for tab change
   * @param value - New tab value
   */
  onTabChange: (value: string) => void;
  
  /**
   * Handler for search query change
   * @param query - New search query
   */
  onSearchChange: (query: string) => void;
  
  /**
   * Content to render for each tab
   */
  children: React.ReactNode;
}

/**
 * BookingFilters Component
 * 
 * Provides filtering and tab navigation for bookings
 * 
 * @param {BookingFiltersProps} props - Component props
 * @returns {JSX.Element} Booking filters UI component
 */
export const BookingFilters = ({
  activeTab,
  searchQuery,
  onTabChange,
  onSearchChange,
  children,
}: BookingFiltersProps): JSX.Element => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {/* Search Bar - Optimized for mobile */}
      <div className="relative w-full mb-6">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" 
          aria-hidden="true"
        />
        <Input
          type="text"
          placeholder="Search bookings by address or service..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 py-2 w-full bg-white dark:bg-gray-800 rounded-xl"
          aria-label="Search bookings"
        />
      </div>

      {/* Tabs - Full width on mobile */}
      <Tabs 
        defaultValue="upcoming" 
        value={activeTab} 
        onValueChange={onTabChange} 
        className="w-full"
      >
        <TabsList className="w-full justify-start md:justify-start rounded-xl p-1 mb-6 bg-muted/50">
          <TabsTrigger
            value="upcoming"
            className={`flex-1 ${isMobile ? 'text-sm py-1.5' : ''} rounded-lg`}
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className={`flex-1 ${isMobile ? 'text-sm py-1.5' : ''} rounded-lg`}
          >
            Completed
          </TabsTrigger>
          <TabsTrigger
            value="cancelled"
            className={`flex-1 ${isMobile ? 'text-sm py-1.5' : ''} rounded-lg`}
          >
            Cancelled
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="upcoming">
          {children}
        </TabsContent>
        
        <TabsContent value="completed">
          {children}
        </TabsContent>
        
        <TabsContent value="cancelled">
          {children}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default BookingFilters;
