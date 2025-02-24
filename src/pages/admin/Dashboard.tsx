
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Database } from "@/integrations/supabase/types";

type BookingStatus = Database["public"]["Enums"]["booking_status"];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
} as const;

const Dashboard = () => {
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | null>(null);

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['admin-bookings', selectedStatus],
    queryFn: async () => {
      const query = supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (selectedStatus) {
        query.eq('status', selectedStatus);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return data;
    }
  });

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Bookings Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
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
                      <Badge variant="outline" className={statusColors[booking.status as keyof typeof statusColors]}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>€{booking.total_price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
