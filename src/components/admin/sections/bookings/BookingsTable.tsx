
import { format, parseISO } from "date-fns";
import { SortAsc, SortDesc, MoreHorizontal, UserPlus, MessageSquare } from "lucide-react";
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
import { useState } from "react";
import { AssignProviderDialog } from "./AssignProviderDialog";
import { MessageClientDialog } from "./MessageClientDialog";

type Booking = Database["public"]["Tables"]["bookings"]["Row"];

interface BookingsTableProps {
  bookings: Booking[] | null;
  sortField: SortField;
  sortOrder: SortOrder;
  toggleSort: (field: SortField) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  deleteBooking: (id: string) => void;
  refreshData: () => void;
}

export const BookingsTable = ({
  bookings,
  sortField,
  sortOrder,
  toggleSort,
  updateBookingStatus,
  deleteBooking,
  refreshData,
}: BookingsTableProps) => {
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
  const [bookingToAssign, setBookingToAssign] = useState<string | null>(null);
  const [bookingToMessage, setBookingToMessage] = useState<string | null>(null);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? (
      <SortAsc className="h-4 w-4" />
    ) : (
      <SortDesc className="h-4 w-4" />
    );
  };

  const handleAssignProvider = (booking: Booking) => {
    setBookingToAssign(booking.id);
    setCurrentBooking(booking);
  };

  const handleMessageClient = (booking: Booking) => {
    setBookingToMessage(booking.id);
    setCurrentBooking(booking);
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <div className="overflow-x-auto">
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
              <TableHead className="hidden md:table-cell">Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">
                <Button
                  variant="ghost"
                  onClick={() => toggleSort('total_price')}
                  className="flex items-center gap-2"
                >
                  Total <SortIcon field="total_price" />
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">Provider</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings?.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">
                  {booking.date ? format(parseISO(booking.date), 'MMM dd') : 'Not scheduled'}
                  <div className="text-xs text-gray-500 md:hidden">
                    {booking.first_name} {booking.last_name}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {booking.first_name} {booking.last_name}
                  <div className="text-sm text-gray-500">{booking.email}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {booking.service_type}
                  <div className="text-sm text-gray-500">{booking.hours} hours</div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-full justify-start p-2">
                        <Badge
                          variant="outline"
                          className={statusColors[booking.status as keyof typeof statusColors] || statusColors.pending}
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
                <TableCell className="hidden sm:table-cell">€{booking.total_price}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {booking.provider_id ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Assigned
                    </Badge>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-blue-600 hover:text-blue-800 p-0"
                      onClick={() => handleAssignProvider(booking)}
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Assign
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleAssignProvider(booking)}
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Assign Provider
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleMessageClient(booking)}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message Client
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setBookingToDelete(booking.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Booking Dialog */}
      {bookingToDelete && (
        <DeleteBookingDialog
          open={!!bookingToDelete}
          onClose={() => setBookingToDelete(null)}
          onConfirm={() => {
            if (bookingToDelete) {
              deleteBooking(bookingToDelete);
              setBookingToDelete(null);
            }
          }}
        />
      )}

      {/* Assign Provider Dialog */}
      <AssignProviderDialog
        open={!!bookingToAssign}
        onClose={() => setBookingToAssign(null)}
        bookingId={bookingToAssign}
        onAssigned={refreshData}
        currentBooking={currentBooking}
      />

      {/* Message Client Dialog */}
      <MessageClientDialog
        open={!!bookingToMessage}
        onClose={() => setBookingToMessage(null)}
        booking={currentBooking}
        onMessageSent={refreshData}
      />
    </div>
  );
};
