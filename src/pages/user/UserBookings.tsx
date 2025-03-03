
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useUserBookings } from "@/hooks/useUserBookings";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

export default function UserBookings() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const { 
    bookings, 
    isLoading, 
    error 
  } = useUserBookings();
  
  // Filter bookings based on status and search query
  const filteredBookings = bookings?.filter(booking => {
    const matchesTab = 
      (activeTab === "upcoming" && booking.status === "pending") ||
      (activeTab === "completed" && booking.status === "completed") ||
      (activeTab === "cancelled" && booking.status === "cancelled");
      
    const matchesSearch = 
      !searchQuery || 
      booking.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Upcoming</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Bookings</h1>
        <p className="text-muted-foreground">View and manage all your cleaning service bookings</p>
      </div>

      {/* Search Bar - Optimized for mobile */}
      <div className="relative w-full mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search bookings by address or service..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 py-2 w-full bg-white dark:bg-gray-800 rounded-xl"
        />
      </div>

      {/* Tabs - Full width on mobile */}
      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
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

        {/* Each tab content - Card layout for mobile */}
        {["upcoming", "completed", "cancelled"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {isLoading ? (
              // Skeleton loaders - Optimized for mobile
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                    <CardContent className="space-y-3 pb-2">
                      <div className="flex items-center">
                        <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                      <div className="flex items-center">
                        <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                        <Skeleton className="h-3 w-3/4" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Skeleton className="h-8 w-full rounded-md" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <p className="text-red-500">Failed to load bookings. Please try again.</p>
                <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                  Refresh
                </Button>
              </div>
            ) : filteredBookings?.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-lg font-semibold">No {tab} bookings found</h3>
                <p className="text-muted-foreground mt-1">
                  {searchQuery 
                    ? "Try adjusting your search criteria"
                    : tab === "upcoming" 
                      ? "You don't have any upcoming bookings"
                      : tab === "completed" 
                        ? "You don't have any completed bookings yet"
                        : "You don't have any cancelled bookings"}
                </p>
                {tab === "upcoming" && (
                  <Button 
                    className="mt-4 bg-primary hover:bg-primary/90"
                    onClick={() => navigate("/")}
                  >
                    Book a Cleaning
                  </Button>
                )}
              </div>
            ) : (
              // Booking cards - Mobile optimized
              <div className="space-y-4">
                {filteredBookings?.map((booking) => (
                  <Card 
                    key={booking.id} 
                    className="overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <CardHeader className="pb-2 pt-3">
                      <div className="flex justify-between items-start mb-1">
                        <CardTitle className="text-base md:text-lg">
                          {booking.service === "regular" 
                            ? "Regular Cleaning" 
                            : booking.service === "moveInOut" 
                              ? "Move In/Out" 
                              : booking.service === "business" 
                                ? "Business Cleaning" 
                                : "Construction Cleaning"}
                        </CardTitle>
                        {getStatusBadge(booking.status)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {booking.bookingDate 
                          ? `Booked ${formatDistanceToNow(new Date(booking.bookingDate), { addSuffix: true })}` 
                          : "Recently booked"}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="space-y-3 pb-3">
                      <div className="flex items-start">
                        <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">{booking.scheduledDate || "Schedule pending"}</p>
                          <p className="text-xs text-muted-foreground">{booking.scheduledTime || "Time to be confirmed"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                        <p className="text-sm">
                          {booking.hours} {booking.hours === 1 ? "hour" : "hours"} 
                          {booking.frequency && ` (${booking.frequency === "weekly" ? "Weekly" : booking.frequency === "biweekly" ? "Biweekly" : "One-time"})`}
                        </p>
                      </div>
                      
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                        <p className="text-sm">{booking.address || "Address not provided"}</p>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-0 border-t border-border">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-between hover:bg-primary/5 py-2.5"
                        onClick={() => navigate(`/user/bookings/${booking.id}`)}
                      >
                        <span>View Details</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
