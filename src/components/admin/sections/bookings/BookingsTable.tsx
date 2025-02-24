
import { format, parseISO } from "date-fns";
import { SortAsc, SortDesc } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Database } from "@/integrations/supabase/types";
import { BookingStatus, SortField, SortOrder, statusColors } from "./types";
import { DeleteBookingDialog } from "./DeleteBookingDialog";

type Booking = Database["public"]["Tables"]["bookings"]["Row"];

interface BookingsTableProps {
  bookings: Booking[] | null;
  sortField: SortField;
  sortOrder: SortOrder;
  toggleSort: (field: SortField) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  deleteBooking: (id: string) => void;
}

export const BookingsTable = ({
  bookings,
  sortField,
  sortOrder,
  toggleSort,
  updateBookingStatus,
  deleteBooking,
}: BookingsTableProps) => {
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? (
      <SortAsc className="h-4 w-4" />
    ) : (
      <SortDesc className="h-4 w-4" />
    );
  };

  return (
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
                {booking.date ? format(parseISO(booking.date), 'PPp') : 'Not scheduled'}
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
                      <Badge
                        variant="outline"
                        className={statusColors[booking.status as keyof typeof statusColors]}
                      >
                        {booking.status}
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {Object.keys(statusColors).map((status) => (
                      <DropdownMenuItem
                        key={status}
                        onClick={() => updateBookingStatus(booking.id, status as BookingStatus)}
                      >
                        <Badge
                          variant="outline"
                          className={statusColors[status as keyof typeof statusColors]}
                        >
                          {status}
                        </Badge>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>€{booking.total_price}</TableCell>
              <TableCell>
                <DeleteBookingDialog
                  onConfirm={() => deleteBooking(booking.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
