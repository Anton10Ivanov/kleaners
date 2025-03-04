
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordStrength } from '@/hooks/useUserProfileData';
import { Progress } from '@/components/ui/progress';

interface SecuritySettingsProps {
  /** Current password strength */
  passwordStrength: PasswordStrength;
  
  /** Function to check password strength */
  onPasswordCheck: (password: string) => void;
  
  /** Function to change password */
  onPasswordChange: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

/**
 * SecuritySettings Component
 * 
 * Manages password changes and security settings
 * 
 * @param {SecuritySettingsProps} props Component props
 * @returns {JSX.Element} Security settings component
 */
export function SecuritySettings({
  passwordStrength,
  onPasswordCheck,
  onPasswordChange
}: SecuritySettingsProps): JSX.Element {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  const getStrengthValue = () => {
    switch (passwordStrength) {
      case 'weak': return 33;
      case 'medium': return 67;
      case 'strong': return 100;
      default: return 0;
    }
  };
  
  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
      default: return 'bg-gray-200';
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'newPassword') {
      onPasswordCheck(value);
    }
    
    // Clear form error when user types
    if (formError) {
      setFormError(null);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.newPassword !== formData.confirmPassword) {
      setFormError("New passwords don't match");
      return;
    }
    
    if (formData.newPassword.length < 8) {
      setFormError("Password must be at least 8 characters");
      return;
    }
    
    setIsSaving(true);
    
    try {
      const success = await onPasswordChange(formData.currentPassword, formData.newPassword);
      if (success) {
        setIsChangingPassword(false);
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>
          Manage your password and account security
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {isChangingPassword ? (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
                
                {formData.newPassword && (
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Password Strength:</span>
                      <span className="capitalize">{passwordStrength || 'None'}</span>
                    </div>
                    <Progress value={getStrengthValue()} className={getStrengthColor()} />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {formError && (
                <div className="text-red-500 text-sm mt-2">{formError}</div>
              )}
            </div>
          </form>
        ) : (
          <div className="py-2">
            Your password was last changed on {new Date().toLocaleDateString()}.
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-end">
        {isChangingPassword ? (
          <>
            <Button 
              variant="outline" 
              onClick={() => setIsChangingPassword(false)} 
              className="mr-2"
              type="button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isSaving}
            >
              {isSaving ? "Changing..." : "Change Password"}
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsChangingPassword(true)}>
            Change Password
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
