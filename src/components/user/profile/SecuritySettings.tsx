
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface SecuritySettingsProps {
  passwordStrength: number;
  onPasswordCheck: (password: string) => void;
  onPasswordChange: (currentPassword: string, newPassword: string) => Promise<void>;
}

export function SecuritySettings({
  passwordStrength,
  onPasswordCheck,
  onPasswordChange,
}: SecuritySettingsProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChanging, setIsChanging] = useState(false);
  
  const getPasswordStrengthColor = () => {
    if (passwordStrength < 30) return 'bg-red-500';
    if (passwordStrength < 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  const getPasswordStrengthText = () => {
    if (passwordStrength < 30) return 'Weak';
    if (passwordStrength < 60) return 'Moderate';
    return 'Strong';
  };
  
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (passwordStrength < 30) {
      toast.error('Password is too weak');
      return;
    }
    
    setIsChanging(true);
    try {
      await onPasswordChange(currentPassword, newPassword);
      toast.success('Password changed successfully');
      // Reset fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to change password');
      }
    } finally {
      setIsChanging(false);
    }
  };
  
  return (
    <form onSubmit={handlePasswordChange} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="current-password" className="text-foreground">Current Password</Label>
        <Input 
          id="current-password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className="border-input bg-background text-foreground"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="new-password" className="text-foreground">New Password</Label>
        <Input 
          id="new-password"
          type="password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            onPasswordCheck(e.target.value);
          }}
          required
          className="border-input bg-background text-foreground"
        />
        
        {newPassword && (
          <div className="space-y-1 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Password Strength:</span>
              <span className="text-xs font-medium">{getPasswordStrengthText()}</span>
            </div>
            <Progress 
              value={passwordStrength} 
              max={100} 
              className="h-1.5"
              indicatorClassName={getPasswordStrengthColor()}
            />
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirm-password" className="text-foreground">Confirm Password</Label>
        <Input 
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="border-input bg-background text-foreground"
        />
        
        {confirmPassword && newPassword !== confirmPassword && (
          <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
        )}
      </div>
      
      <div className="pt-2">
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={isChanging || !currentPassword || !newPassword || !confirmPassword}
        >
          {isChanging ? 'Changing Password...' : 'Change Password'}
        </Button>
      </div>
    </form>
  );
}
