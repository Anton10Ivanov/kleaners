import { memo } from "react";
import { Input } from "@/components/ui/input";
interface PostalCodeInputProps {
  postalCode: string;
  setPostalCode: (value: string) => void;
  isMobile: boolean;
}
export const PostalCodeInput = memo(({
  postalCode,
  setPostalCode,
  isMobile
}: PostalCodeInputProps) => {
  if (isMobile) {
    return <div>
        <Input type="text" placeholder="City name or Postal code" value={postalCode} onChange={e => setPostalCode(e.target.value)} className="h-16 px-4 rounded-2xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-base font-medium shadow-sm hover:shadow-md" required />
      </div>;
  }
  return <div>
      <label className="block text-sm font-medium text-cyan-50 mb-2 text-center bg-transparent ">
        Your Postal code
      </label>
      <Input type="text" placeholder="City name or Postal code" value={postalCode} onChange={e => setPostalCode(e.target.value)} required className="h-14 px-4 rounded-2xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-base font-medium shadow-sm hover:shadow-md" />
    </div>;
});
PostalCodeInput.displayName = "PostalCodeInput";