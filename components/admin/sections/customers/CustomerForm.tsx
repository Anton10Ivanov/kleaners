
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog";
import { Input } from '@/components/ui/input";
import { Label } from '@/components/ui/label";
import { Textarea } from '@/components/ui/textarea";
import { Database } from '@/integrations/supabase/types";
import { useState } from "react";
import { Button } from '@/components/ui/button";

type Client = Database["public"]["Tables"]["clients"]["Row"];

interface CustomerFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Client>) => void;
  initialData?: Client;
}

export const CustomerForm = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: CustomerFormProps) => {
  const [formData, setFormData] = useState<Partial<Client>>(
    initialData || {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      notes: "",
      username: "",
      password: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Client" : "Add New Client"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="form-spacing-relaxed">
          <div className="grid grid-cols-2 gap-4">
            <div className="form-spacing-tight">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-spacing-tight">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
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
              onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
              value={formData.phone || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-spacing-tight">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-spacing-tight">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes || ""}
              onChange={handleChange}
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
