
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon } from "lucide-react";

export const ProviderDetails = ({ provider, onClose }: { provider: any; onClose: () => void }) => {
  const [loading, setLoading] = useState(false);

  // Extract initials for avatar
  const getInitials = (name: string) => {
    if (!name) return "SP";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Format status for badge
  const getStatusColor = (status: string) => {
    if (status === 'active') return "bg-green-500";
    if (status === 'pending') return "bg-yellow-500";
    if (status === 'inactive') return "bg-red-500";
    return "bg-gray-500";
  };

  // Fix the booking status comparison
  const isAvailableForBooking = (status: string) => {
    return (status === 'active');
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={provider.avatar_url} alt={provider.name} />
              <AvatarFallback>{getInitials(provider.name)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{provider.name}</CardTitle>
              <CardDescription>{provider.specialization || "Service Provider"}</CardDescription>
              <div className="flex items-center mt-1">
                <StarIcon className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                <span className="ml-1 text-sm font-medium">
                  {provider.rating || "4.8"} ({provider.reviews || "24"})
                </span>
              </div>
            </div>
          </div>
          <Badge className={getStatusColor(provider.status)}>
            {provider.status || "Active"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Contact</h3>
            <p className="mt-1">{provider.email || "provider@example.com"}</p>
            <p>{provider.phone || "+1 (555) 123-4567"}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Areas Served</h3>
            <p className="mt-1">{provider.areas_served || "Downtown, Suburb, Citywide"}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Services</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {(provider.services || ["Regular Cleaning", "Deep Cleaning", "Move In/Out"]).map(
                (service: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    {service}
                  </Badge>
                )
              )}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Notes</h3>
            <p className="mt-1 text-sm">{provider.notes || "Reliable service provider with excellent attention to detail."}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button
          disabled={!isAvailableForBooking(provider.status || "")}
          className="bg-primary hover:bg-primary/90"
        >
          Assign to Booking
        </Button>
      </CardFooter>
    </Card>
  );
};
