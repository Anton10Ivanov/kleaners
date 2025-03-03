
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, User, Clock, Edit2, CheckCircle2 } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const { userData, isLoading, updateProfile } = useProfile();
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const handleSave = async () => {
    try {
      await updateProfile();
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-6 w-full max-w-md" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-full max-w-xs" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-32 w-32 rounded-full mx-auto" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-full max-w-sm mx-auto" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
              </div>
            </div>
            
            <div className="grid gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 flex-grow" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">View and manage your personal information</p>
      </div>

      {isMobile ? (
        // Mobile layout with tabs
        <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-6">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="account">Account Info</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Personal Information</span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsEditing(!isEditing)}
                    className="h-8 w-8"
                  >
                    {isEditing ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" onClick={handleSave} />
                    ) : (
                      <Edit2 className="h-4 w-4" />
                    )}
                  </Button>
                </CardTitle>
                <CardDescription>Your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                {/* Avatar section */}
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={userData?.avatarUrl || ""} alt={userData?.firstName || "User"} />
                    <AvatarFallback className="text-lg bg-primary/10 text-primary">
                      {userData?.firstName?.charAt(0) || userData?.email?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{userData?.firstName} {userData?.lastName}</h3>
                    <p className="text-muted-foreground text-sm">{userData?.email}</p>
                  </div>
                  
                  {!isEditing && (
                    <Button variant="outline" size="sm" className="mt-2">
                      Change Photo
                    </Button>
                  )}
                </div>
                
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid gap-3">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue={userData?.firstName || ""} />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue={userData?.lastName || ""} />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue={userData?.phone || ""} />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="address">Address</Label>
                      <Textarea id="address" rows={3} defaultValue={userData?.address || ""} />
                    </div>
                    <Button onClick={handleSave} className="w-full">Save Changes</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Name</p>
                        <p className="text-sm text-muted-foreground">
                          {userData?.firstName && userData?.lastName 
                            ? `${userData.firstName} ${userData.lastName}` 
                            : "Not provided"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Phone</p>
                        <p className="text-sm text-muted-foreground">{userData?.phone || "Not provided"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Address</p>
                        <p className="text-sm text-muted-foreground">{userData?.address || "Not provided"}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Account Information</CardTitle>
                <CardDescription>Your account details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Email</p>
                    <p className="text-sm text-muted-foreground">{userData?.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Account Created</p>
                    <p className="text-sm text-muted-foreground">
                      {userData?.createdAt 
                        ? new Date(userData.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : "Unknown"}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Change Password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        // Desktop layout with side-by-side cards
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your personal details</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" onClick={handleSave} />
                  ) : (
                    <Edit2 className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar section */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={userData?.avatarUrl || ""} alt={userData?.firstName || "User"} />
                  <AvatarFallback className="text-lg bg-primary/10 text-primary">
                    {userData?.firstName?.charAt(0) || userData?.email?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{userData?.firstName} {userData?.lastName}</h3>
                  <p className="text-muted-foreground text-sm">{userData?.email}</p>
                </div>
                
                {!isEditing && (
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                )}
              </div>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue={userData?.firstName || ""} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue={userData?.lastName || ""} />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue={userData?.phone || ""} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" rows={3} defaultValue={userData?.address || ""} />
                  </div>
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Name</p>
                      <p className="text-muted-foreground">
                        {userData?.firstName && userData?.lastName 
                          ? `${userData.firstName} ${userData.lastName}` 
                          : "Not provided"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">{userData?.phone || "Not provided"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-muted-foreground">{userData?.address || "Not provided"}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">{userData?.email}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Account Created</p>
                  <p className="text-muted-foreground">
                    {userData?.createdAt 
                      ? new Date(userData.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : "Unknown"}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Change Password</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
