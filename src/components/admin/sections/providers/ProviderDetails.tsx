
import { useState } from "react";
import { format } from "date-fns";
import { Check, ChevronsUpDown, Copy, Mail, Phone, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Database } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { BookingStatus } from "@/components/admin/sections/bookings/types";

type ServiceProvider = Database["public"]["Tables"]["service_providers"]["Row"];
type Booking = Database["public"]["Tables"]["bookings"]["Row"];

interface ProviderDetailsProps {
  provider: ServiceProvider;
  onUpdate: () => void;
}

export const ProviderDetails = ({ provider, onUpdate }: ProviderDetailsProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(provider.first_name);
  const [lastName, setLastName] = useState(provider.last_name);
  const [email, setEmail] = useState(provider.email);
  const [phone, setPhone] = useState(provider.phone || "");
  const [username, setUsername] = useState(provider.username || "");
  const [password, setPassword] = useState("");
  const [services, setServices] = useState<string[]>(provider.services || []);
  const [isSaving, setIsSaving] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const availableServices = [
    "Regular Cleaning",
    "Deep Cleaning",
    "Move In/Out Cleaning",
    "Post Construction Cleaning",
    "Office Cleaning",
  ];

  const fetchBookings = async (date: Date) => {
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("date", formattedDate)
        .eq("provider_id", provider.id);

      if (error) {
        console.error("Error fetching bookings:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch bookings: " + error.message,
        });
        return;
      }

      setBookings(data || []);
    } catch (error: any) {
      console.error("Error fetching bookings:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch bookings: " + error.message,
      });
    }
  };

  // Fix error: Expected 0-1 arguments, but got 2
  useState(() => {
    if (selectedDate) {
      fetchBookings(selectedDate);
    }
  });

  const handleServiceToggle = (service: string) => {
    setServices((prevServices) =>
      prevServices.includes(service)
        ? prevServices.filter((s) => s !== service)
        : [...prevServices, service]
    );
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFirstName(provider.first_name);
    setLastName(provider.last_name);
    setEmail(provider.email);
    setPhone(provider.phone || "");
    setUsername(provider.username || "");
    setServices(provider.services || []);
    setPassword("");
  };

  const handleSaveClick = async () => {
    setIsSaving(true);
    try {
      const updates: Partial<ServiceProvider> = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        username: username,
        services: services,
      };

      if (password) {
        updates.password = password;
      }

      const { data, error } = await supabase
        .from("service_providers")
        .update(updates)
        .eq("id", provider.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating provider:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update provider: " + error.message,
        });
        return;
      }

      toast({
        title: "Success",
        description: "Provider updated successfully",
      });
      setIsEditing(false);
      onUpdate();
    } catch (error: any) {
      console.error("Error updating provider:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update provider: " + error.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Provider Details</h3>
        {!isEditing ? (
          <Button size="sm" onClick={handleEditClick}>
            Edit Details
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleCancelClick}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSaveClick}
              disabled={isSaving}
              // Fix the isLoading prop error by removing it, since it doesn't exist on Button
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Personal Information */}
        <div className="space-y-2">
          <h4 className="font-medium">Personal Information</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            {isEditing && (
              <>
                <div className="col-span-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!isEditing}
                    placeholder="Leave blank to keep current password"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Service Information */}
        <div className="space-y-2">
          <h4 className="font-medium">Service Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {availableServices.map((service) => (
              <div key={service} className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id={service}
                  checked={services.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                  disabled={!isEditing}
                />
                <Label htmlFor={service}>{service}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bookings Calendar */}
      <div className="space-y-2">
        <h4 className="font-medium">Bookings</h4>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {selectedDate ? (
                format(selectedDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) =>
                date > new Date()
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {bookings.length > 0 ? (
          <div className="space-y-2">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-md border p-4 shadow-sm"
              >
                <div className="font-medium">
                  {booking.first_name} {booking.last_name} - {booking.service_type}
                </div>
                <div className="text-sm text-muted-foreground">
                  {booking.date && format(new Date(booking.date), "PPP")}
                </div>
                {/* Fix the type comparison error with appropriate type checking */}
                {(booking.status === "pending" || 
                  booking.status === "cancelled" || 
                  booking.status === "assigned") && (
                  <div className="text-sm text-red-500">
                    This booking needs attention.
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            No bookings for this date.
          </div>
        )}
      </div>
    </div>
  );
};
