
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, FileText, Calendar, ChevronRight, Download, Receipt, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// Mock data for invoices
const mockInvoices = [
  {
    id: "INV-001",
    amount: 149.99,
    date: new Date(2023, 9, 15),
    status: "paid",
    service: "Regular Cleaning",
    bookingId: "BK-2023-001"
  },
  {
    id: "INV-002",
    amount: 299.99,
    date: new Date(2023, 10, 2),
    status: "paid",
    service: "Move In/Out Cleaning",
    bookingId: "BK-2023-002"
  },
  {
    id: "INV-003",
    amount: 89.99,
    date: new Date(2023, 10, 20),
    status: "unpaid",
    dueDate: new Date(2023, 11, 5),
    service: "Regular Cleaning",
    bookingId: "BK-2023-003"
  },
  {
    id: "INV-004",
    amount: 89.99,
    date: new Date(2023, 11, 10),
    status: "processing",
    service: "Regular Cleaning",
    bookingId: "BK-2023-004"
  }
];

export default function UserInvoices() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Simulate loading briefly
  useState(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  });
  
  // Filter invoices based on active tab and search query
  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesTab = 
      activeTab === "all" ||
      (activeTab === "paid" && invoice.status === "paid") ||
      (activeTab === "unpaid" && invoice.status === "unpaid") ||
      (activeTab === "processing" && invoice.status === "processing");
      
    const matchesSearch = 
      !searchQuery || 
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.service.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });
  
  const handleDownload = (invoiceId: string) => {
    toast({
      title: "Invoice Downloaded",
      description: `Invoice ${invoiceId} has been downloaded successfully.`,
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Paid</Badge>;
      case "unpaid":
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Unpaid</Badge>;
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Processing</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Invoices</h1>
        <p className="text-muted-foreground">View and manage your invoice history</p>
      </div>

      {/* Search Bar - Mobile optimized */}
      <div className="relative w-full mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search invoices by ID or service..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 py-2 w-full bg-white dark:bg-gray-800 rounded-xl"
        />
      </div>

      {/* Tabs - Full width on mobile */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start md:justify-start mb-6 bg-muted/50 rounded-xl">
          <TabsTrigger 
            value="all" 
            className={`flex-1 ${isMobile ? 'text-sm py-1.5' : ''} rounded-lg`}
          >
            All
          </TabsTrigger>
          <TabsTrigger 
            value="paid" 
            className={`flex-1 ${isMobile ? 'text-sm py-1.5' : ''} rounded-lg`}
          >
            Paid
          </TabsTrigger>
          <TabsTrigger 
            value="unpaid" 
            className={`flex-1 ${isMobile ? 'text-sm py-1.5' : ''} rounded-lg`}
          >
            Unpaid
          </TabsTrigger>
          <TabsTrigger 
            value="processing" 
            className={`flex-1 ${isMobile ? 'text-sm py-1.5' : ''} rounded-lg`}
          >
            Processing
          </TabsTrigger>
        </TabsList>

        {/* Tab content - Card layout for mobile */}
        {["all", "paid", "unpaid", "processing"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {isLoading ? (
              // Skeleton loaders
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 pb-2">
                      <div className="flex items-center">
                        <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                      <div className="flex items-center">
                        <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                        <Skeleton className="h-3 w-40" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Skeleton className="h-9 w-full rounded-md" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : filteredInvoices.length === 0 ? (
              <div className="text-center py-10">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold">No invoices found</h3>
                <p className="text-muted-foreground mt-1">
                  {searchQuery 
                    ? "Try adjusting your search criteria"
                    : `You don't have any ${tab !== 'all' ? tab + ' ' : ''}invoices`}
                </p>
              </div>
            ) : (
              // Invoice cards - Mobile optimized
              <div className="space-y-4">
                {filteredInvoices.map((invoice) => (
                  <Card 
                    key={invoice.id} 
                    className="overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <CardHeader className="pb-2 pt-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base md:text-lg flex items-center gap-1">
                          <Receipt className="h-4 w-4 mr-1 opacity-70" />
                          {invoice.id}
                        </CardTitle>
                        {getStatusBadge(invoice.status)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(invoice.date, { addSuffix: true })}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="space-y-3 pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{invoice.service}</span>
                        </div>
                        <span className="font-bold">{invoice.amount.toFixed(2)} €</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          {invoice.date.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      {invoice.status === "unpaid" && invoice.dueDate && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-amber-500" />
                          <span className="text-sm text-amber-600">
                            Due {invoice.dueDate.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Booking: {invoice.bookingId}</span>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-0 border-t border-border flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1"
                        onClick={() => {}}
                      >
                        <ChevronRight className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button 
                        size="sm"
                        className="flex-1 bg-primary hover:bg-primary/90"
                        onClick={() => handleDownload(invoice.id)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
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
