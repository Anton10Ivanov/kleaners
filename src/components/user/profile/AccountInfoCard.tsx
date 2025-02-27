
import { useFormContext } from "react-hook-form";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AvatarSection from "./AvatarSection";
import type { User } from "@/types/supabase";

interface AccountInfoCardProps {
  user: User;
  avatarUrl: string | null;
  setAvatarUrl: (url: string | null) => void;
  onAvatarChange: (url: string | null) => void;
}

const AccountInfoCard = ({ user, avatarUrl, setAvatarUrl, onAvatarChange }: AccountInfoCardProps) => {
  const { watch } = useFormContext();

  return (
    <Card className="border-t-4 border-t-secondary">
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>Your account details</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center">
        <AvatarSection 
          user={user} 
          avatarUrl={avatarUrl} 
          setAvatarUrl={setAvatarUrl}
          onAvatarChange={onAvatarChange}
        />
        
        <h3 className="text-lg font-medium">{watch('first_name')} {watch('last_name')}</h3>
        <p className="text-sm text-muted-foreground mb-6">{user?.email}</p>
        
        <div className="w-full space-y-4">
          <div className="flex justify-between text-sm px-4 py-3 bg-muted rounded-md">
            <span className="text-muted-foreground">Member since:</span>
            <span className="font-medium">{new Date(user?.created_at || Date.now()).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between text-sm px-4 py-3 bg-muted rounded-md">
            <span className="text-muted-foreground">Last login:</span>
            <span className="font-medium">{new Date(user?.last_sign_in_at || Date.now()).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="w-full mt-6">
          <Button variant="outline" className="w-full" disabled>
            Change Password
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountInfoCard;
