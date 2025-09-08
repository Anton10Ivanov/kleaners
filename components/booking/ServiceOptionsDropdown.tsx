
import { useEffect } from "react";
import { Frequency } from '@/schemas/booking";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover";
import { Button } from '@/components/ui/button";
import { Info, Check } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table";

interface ServiceOptionsDropdownProps {
  frequency: Frequency | undefined;
  setFrequency: (value: Frequency) => void;
  isRegularCleaning?: boolean;
}

const ServiceOptionsDropdown = ({
  frequency,
  setFrequency,
  isRegularCleaning = false
}: ServiceOptionsDropdownProps) => {
  // Set default frequency to BiWeekly when component mounts
  useEffect(() => {
    if (!frequency) {
      setFrequency(Frequency.BiWeekly);
    }
  }, [frequency, setFrequency]);
  
  return (
    <div className="bg-white dark:bg-gray-800 card-spacing-md rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
        <h3 className="text-xl text-center md:text-left text-zinc-900 dark:text-white font-medium w-full md:w-1/3">
          Cleaning interval
        </h3>
        <div className="w-full md:w-2/3">
          <Select value={frequency} onValueChange={(value: Frequency) => setFrequency(value)}>
            <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
              <SelectItem value={Frequency.OneTime}>One Time</SelectItem>
              <SelectItem value={Frequency.Weekly}>Weekly</SelectItem>
              <SelectItem value={Frequency.BiWeekly}>Every 2 Weeks</SelectItem>
              {!isRegularCleaning && <SelectItem value={Frequency.Custom}>Custom Schedule</SelectItem>}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="link" className="text-primary hover:text-primary/80 text-sm dark:text-primary-foreground dark:hover:text-primary-foreground/80">
              <Info className="h-4 w-4 mr-1" /> Show comparison
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] sm:w-[450px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 card-spacing-none shadow-lg z-50" align="center">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200 dark:border-gray-700">
                  <TableHead className="text-gray-700 dark:text-gray-300">Service</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">One Time</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Weekly</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Biweekly</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-b border-gray-200 dark:border-gray-700">
                  <TableCell className="text-gray-700 dark:text-gray-300">Same Cleaner</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell><Check className="h-4 w-4 text-primary" /></TableCell>
                  <TableCell><Check className="h-4 w-4 text-primary" /></TableCell>
                </TableRow>
                <TableRow className="border-b border-gray-200 dark:border-gray-700">
                  <TableCell className="text-gray-700 dark:text-gray-300">Priority Booking</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell><Check className="h-4 w-4 text-primary" /></TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-gray-700 dark:text-gray-300">Flexible Rescheduling</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell><Check className="h-4 w-4 text-primary" /></TableCell>
                  <TableCell><Check className="h-4 w-4 text-primary" /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ServiceOptionsDropdown;
