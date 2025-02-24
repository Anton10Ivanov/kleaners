
import { useState } from "react";
import { Input } from "@/components/ui/input";

export const CustomersSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border p-4">
        <p className="text-muted-foreground">
          Customer management functionality coming in the next update...
        </p>
      </div>
    </div>
  );
};
