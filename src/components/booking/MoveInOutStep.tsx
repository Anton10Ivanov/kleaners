
import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MoveInOutStepProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const MoveInOutStep = ({ date, setDate }: MoveInOutStepProps) => {
  const [squareMeters, setSquareMeters] = useState(50);
  const [bathrooms, setBathrooms] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [cleaningType, setCleaningType] = useState<'movein' | 'moveout'>('moveout');
  const [additionalNotes, setAdditionalNotes] = useState('');

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-6">Move In/Out Cleaning Details</h3>
        
        <div className="space-y-6">
          <div>
            <Label>Cleaning Type</Label>
            <Select 
              value={cleaningType} 
              onValueChange={(value) => setCleaningType(value as 'movein' | 'moveout')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select cleaning type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="movein">Move In Cleaning</SelectItem>
                <SelectItem value="moveout">Move Out Cleaning</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Property Size (m²)</Label>
            <Input 
              type="number"
              min={20}
              value={squareMeters}
              onChange={(e) => setSquareMeters(Number(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Bedrooms</Label>
              <Input 
                type="number"
                min={0}
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Bathrooms</Label>
              <Input 
                type="number"
                min={0}
                value={bathrooms}
                onChange={(e) => setBathrooms(Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <Label>Additional Notes</Label>
            <Textarea 
              placeholder="Any specific requirements or details we should know about?"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-6">Select a Date</h3>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          disabled={(date) => date < new Date() || date.getDay() === 0}
        />
      </div>
    </div>
  );
};

export default MoveInOutStep;
