
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check } from "lucide-react";
import { Frequency } from "@/schemas/booking";
import { useEffect } from "react";

interface ServiceOptionsProps {
  frequency: Frequency | undefined;
  setFrequency: (value: Frequency) => void;
  isRegularCleaning?: boolean;
}

const ServiceOptions = ({
  frequency,
  setFrequency,
  isRegularCleaning = false
}: ServiceOptionsProps) => {
  // Set default frequency to Biweekly when component mounts
  useEffect(() => {
    if (!frequency) {
      setFrequency(Frequency.Biweekly);
    }
  }, []);
  
  return <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-6">
        <h3 className="text-xl text-center text-zinc-900 font-normal">Cleaning interval</h3>
        <Select value={frequency} onValueChange={(value: Frequency) => setFrequency(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={Frequency.OneTime}>One Time</SelectItem>
            <SelectItem value={Frequency.Weekly}>Weekly</SelectItem>
            <SelectItem value={Frequency.Biweekly}>Every 2 Weeks</SelectItem>
            {!isRegularCleaning && <SelectItem value={Frequency.Custom}>Custom Schedule</SelectItem>}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-center">
        <Popover>
          <PopoverTrigger className="text-primary text-sm hover:underline">Show differences</PopoverTrigger>
          <PopoverContent className="w-[300px] sm:w-[450px]" align="center">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>One Time</TableHead>
                  <TableHead>Weekly</TableHead>
                  <TableHead>Biweekly</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Same Cleaner</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell><Check className="h-4 w-4 text-primary" /></TableCell>
                  <TableCell><Check className="h-4 w-4 text-primary" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Priority Booking</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell><Check className="h-4 w-4 text-primary" /></TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Flexible Rescheduling</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell><Check className="h-4 w-4 text-primary" /></TableCell>
                  <TableCell><Check className="h-4 w-4 text-primary" /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </PopoverContent>
        </Popover>
      </div>
    </div>;
};

export default ServiceOptions;
