
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check } from "lucide-react";

interface ServiceOptionsProps {
  frequency: string;
  setFrequency: (value: string) => void;
}

const ServiceOptions = ({ frequency, setFrequency }: ServiceOptionsProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">How often should we clean?</h3>
        <Popover>
          <PopoverTrigger className="text-primary text-sm hover:underline">
            What is included?
          </PopoverTrigger>
          <PopoverContent className="w-[300px] sm:w-[450px]" align="end">
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
                  <TableCell>Same Kleaner</TableCell>
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div 
          className={`p-4 rounded-lg border cursor-pointer transition-all ${frequency === 'onetime' ? 'border-primary' : 'border-gray-200'}`}
          onClick={() => setFrequency('onetime')}
        >
          <h4 className="font-semibold mb-1">One Time</h4>
          <p className="text-gray-600">35.00 €/hour</p>
        </div>
        <div 
          className={`p-4 rounded-lg border cursor-pointer transition-all relative ${frequency === 'weekly' ? 'border-primary' : 'border-gray-200'}`}
          onClick={() => setFrequency('weekly')}
        >
          <h4 className="font-semibold mb-1">Weekly</h4>
          <p className="text-gray-600">27.00 €/hour</p>
          <p className="text-xs text-gray-500 mt-1">Same Kleaner every time</p>
        </div>
        <div 
          className={`p-4 rounded-lg border cursor-pointer transition-all relative ${frequency === 'biweekly' ? 'border-primary' : 'border-gray-200'}`}
          onClick={() => setFrequency('biweekly')}
        >
          {(frequency === 'biweekly' || (!frequency && !['weekly', 'onetime'].includes(frequency))) && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs">
              Most Popular
            </div>
          )}
          <h4 className="font-semibold mb-1">Every 2 Weeks</h4>
          <p className="text-gray-600">30.00 €/hour</p>
          <p className="text-xs text-gray-500 mt-1">Same Kleaner every time</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceOptions;
