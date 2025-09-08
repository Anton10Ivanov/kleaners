
import { useState } from "react";
import { Button } from '@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog";
import { Input } from '@/components/ui/input";
import { Label } from '@/components/ui/label";
import { Database } from '@/integrations/supabase/types";
import { Badge } from '@/components/ui/badge";
import { X } from "lucide-react";

type ServiceProvider = Database["public"]["Tables"]["service_providers"]["Row"];

interface ProviderFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<ServiceProvider>) => void;
  initialData?: ServiceProvider;
}

export const ProviderForm = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: ProviderFormProps) => {
  const [formData, setFormData] = useState<Partial<ServiceProvider>>(
    initialData || {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      services: [],
      username: "",
      password: "",
    }
  );
  const [newService, setNewService] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addService = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newService.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        services: [...(prev.services || []), newService.trim()],
      }));
      setNewService("");
    }
  };

  const removeService = (serviceToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services?.filter((service) => service !== serviceToRemove),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {initialData ? "Edit Provider" : "Add Provider"}
            </DialogTitle>
          </DialogHeader>
          <div className="form-spacing-relaxed section-spacing-xs">
            <div className="grid grid-cols-2 gap-4">
              <div className="form-spacing-tight">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-spacing-tight">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-spacing-tight">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-spacing-tight">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-spacing-tight">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password || ""}
                  onChange={handleInputChange}
                  required={!initialData}
                />
              </div>
            </div>
            <div className="form-spacing-tight">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-spacing-tight">
              <Label htmlFor="services">Services</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.services?.map((service) => (
                  <Badge key={service} variant="secondary">
                    {service}
                    <button
                      type="button"
                      onClick={() => removeService(service)}
                      className="ml-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Input
                id="services"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                onKeyDown={addService}
                placeholder="Type a service and press Enter"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
