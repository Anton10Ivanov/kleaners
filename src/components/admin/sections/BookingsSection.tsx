
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format, isWithinInterval, parseISO } from "date-fns";
import { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search, SortAsc, SortDesc, Calendar, Trash2 } from "lucide-react";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

type BookingStatus = Database["public"]["Enums"]["booking_status"];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
} as const;

type SortField = "date" | "total_price" | "created_at";
type SortOrder = "asc" | "desc";

export const BookingsSection = () => {
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['admin-bookings', selectedStatus, searchTerm, sortField, sortOrder, dateRange],
    queryFn: async () => {
      let query = supabase
        .from('bookings')
        .select('*')
        .order(sortField, { ascending: sortOrder === 'asc' });

      if (selectedStatus) {
        query = query.eq('status', selectedStatus);
      }

      if (searchTerm) {
        query = query.or(
          `first_name.ilike.%${searchTerm}%,` +
          `last_name.ilike.%${searchTerm}%,` +
          `email.ilike.%${searchTerm}%`
        );
      }

      const { data, error } = await query;
      if (error) throw error;

      // Filter by date range if set
      if (dateRange?.from && dateRange?.to) {
        return data.filter(booking => 
          booking.date && 
          isWithinInterval(parseISO(booking.date), {
            start: dateRange.from,
            end: dateRange.to
          })
        );
      }

      return data;
    },
  });

  const updateBookingStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: BookingStatus }) => {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
      toast({
        title: "Success",
        description: "Booking status updated successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update booking status: " + error.message,
      });
    },
  });

  const deleteBooking = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
      toast({
        title: "Success",
        description: "Booking deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete booking: " + error.message,
      });
    },
  });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />;
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading bookings...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
        </div>
        <RadioGroup
          defaultValue={selectedStatus || "all"}
          onValueChange={(value) => setSelectedStatus(value === "all" ? null : value as BookingStatus)}
          className="flex flex-wrap gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">All</Label>
          </div>
          {Object.keys(statusColors).map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <RadioGroupItem value={status} id={status} />
              <Label htmlFor={status} className="capitalize">{status}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort('date')}
                  className="flex items-center gap-2"
                >
                  Date <SortIcon field="date" />
                </Button>
              </TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort('total_price')}
                  className="flex items-center gap-2"
                >
                  Total <SortIcon field="total_price" />
                </Button>
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings?.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  {booking.date ? format(new Date(booking.date), 'PPp') : 'Not scheduled'}
                </TableCell>
                <TableCell>
                  {booking.first_name} {booking.last_name}
                  <div className="text-sm text-gray-500">{booking.email}</div>
                </TableCell>
                <TableCell>
                  {booking.service_type}
                  <div className="text-sm text-gray-500">{booking.hours} hours</div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-full justify-start p-2">
                        <Badge variant="outline" className={statusColors[booking.status as keyof typeof statusColors]}>
                          {booking.status}
                        </Badge>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {Object.keys(statusColors).map((status) => (
                        <DropdownMenuItem
                          key={status}
                          onClick={() => updateBookingStatus.mutate({ 
                            id: booking.id, 
                            status: status as BookingStatus 
                          })}
                        >
                          <Badge variant="outline" className={statusColors[status as keyof typeof statusColors]}>
                            {status}
                          </Badge>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell>€{booking.total_price}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this booking?')) {
                        deleteBooking.mutate(booking.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

