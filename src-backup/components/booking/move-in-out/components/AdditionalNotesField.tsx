
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface AdditionalNotesFieldProps {
  additionalNotes: string;
  setAdditionalNotes: (value: string) => void;
}

const AdditionalNotesField = ({
  additionalNotes,
  setAdditionalNotes,
}: AdditionalNotesFieldProps) => {
  return (
    <div className="form-spacing-relaxed animate-fadeIn">
      <Label className="text-secondary-text">Additional Notes</Label>
      <Textarea
        placeholder="Is there anything else we should know about your property?"
        value={additionalNotes}
        onChange={(e) => setAdditionalNotes(e.target.value)}
        className="min-h-[100px] resize-y transition-colors focus:border-primary"
      />
    </div>
  );
};

export default AdditionalNotesField;
