
import React from 'react';
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Edit3, MapPin, Phone, Mail } from "lucide-react";

interface UserProfileCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    avatar?: string;
    verified?: boolean;
    memberSince?: string;
  };
  onEditClick: () => void;
  className?: string;
}

/**
 * User profile card component with design system integration
 * Mobile-first responsive design with touch-optimized interactions
 */
export function UserProfileCard({
  user,
  onEditClick,
  className,
}: UserProfileCardProps) {
  const { isMobile, getMobileSpacing, getMobileButtonSize } = useMobileOptimizations();

  return (
    <Card className={cn(
      "card-primary relative overflow-hidden",
      className
    )}>
      <CardHeader className={cn(
        "pb-3",
        getMobileSpacing('md')
      )}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              {user.avatar ? (
                <Image src={user.avatar} alt={user.name}
                  className="h-16 w-16 rounded-xl object-cover"
                / width={500} height={300} />
              ) : (
                <div className="h-16 w-16 rounded-xl bg-muted flex items-center justify-center">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              {user.verified && (
                <div className="absolute -top-1 -right-1 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-semibold text-foreground">
                  {user.name}
                </h3>
                {user.verified && (
                  <Badge variant="secondary" className="text-xs">
                    Verified
                  </Badge>
                )}
              </div>
              {user.memberSince && (
                <p className="text-sm text-muted-foreground">
                  Member since {user.memberSince}
                </p>
              )}
            </div>
          </div>
          
          <Button
            onClick={onEditClick}
            variant="outline"
            size={isMobile ? "sm" : "default"}
            className={cn(
              "touch-comfortable",
              getMobileButtonSize('sm')
            )}
          >
            <Edit3 className="h-4 w-4" />
            {!isMobile && <span className="ml-2">Edit</span>}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className={cn("form-spacing-normal", getMobileSpacing('md'))}>
        <div className="form-spacing-tight">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{user.email}</span>
          </div>
          
          {user.phone && (
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{user.phone}</span>
            </div>
          )}
          
          {user.address && (
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{user.address}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
