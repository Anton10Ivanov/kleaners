
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle, XCircle, AlertCircle, FileText, User, Calendar } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

type VerificationStatus = 'pending' | 'in_progress' | 'approved' | 'rejected';

interface ProviderApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  position: string;
  experience_level: string;
  skills: string[];
  availability: string[];
  resume_path?: string;
  identification_path?: string;
  consent_form_path?: string;
  application_status: string;
  verification_status: VerificationStatus;
  verification_notes?: string;
  created_at: string;
}

interface ProviderVerificationProps {
  application: ProviderApplication;
  onClose: () => void;
}

export const ProviderVerification = ({ application, onClose }: ProviderVerificationProps) => {
  const [verificationTab, setVerificationTab] = useState("details");
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>(application.verification_status || 'pending');
  const [verificationNotes, setVerificationNotes] = useState(application.verification_notes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">Pending</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: VerificationStatus) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-secondary" />;
      case 'in_progress':
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleStatusChange = async () => {
    setIsSubmitting(true);
    
    try {
      // Update the verification status in the database
      const { error } = await supabase
        .from('provider_applications')
        .update({
          verification_status: verificationStatus,
          verification_notes: verificationNotes,
          updated_at: new Date().toISOString()
        })
        .eq('id', application.id);
        
      if (error) throw error;
      
      // If approved, update provider status or create provider account
      if (verificationStatus === 'approved') {
        // Check if provider already exists
        const { data: existingProvider } = await supabase
          .from('service_providers')
          .select('id')
          .eq('email', application.email)
          .single();
          
        if (existingProvider) {
          // Update existing provider status
          await supabase
            .from('service_providers')
            .update({
              status: 'active',
              verification_level: 'verified'
            })
            .eq('id', existingProvider.id);
        }
        
        // Send notification to the provider
        // This would typically connect to a notification system
        console.log(`Notification would be sent to ${application.email} about approval`);
      }
      
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['provider-applications'] });
      queryClient.invalidateQueries({ queryKey: ['providers'] });
      
      toast.success(`Provider verification status updated to ${verificationStatus}`);
      onClose();
    } catch (error) {
      console.error('Error updating verification status:', error);
      toast.error('Failed to update verification status');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDocumentView = (path?: string) => {
    if (!path) return;
    
    // Generate a signed URL for the document
    const getSignedUrl = async () => {
      try {
        const { data, error } = await supabase.storage
          .from('applications')
          .createSignedUrl(path, 60); // 60 seconds expiry
          
        if (error) throw error;
        
        // Open the signed URL in a new tab
        window.open(data.signedUrl, '_blank');
      } catch (error) {
        console.error('Error creating signed URL:', error);
        toast.error('Failed to access the document');
      }
    };
    
    getSignedUrl();
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback>{application.full_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{application.full_name}</CardTitle>
              <CardDescription>{application.position} - {application.experience_level} experience</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon(verificationStatus)}
            {getStatusBadge(verificationStatus)}
          </div>
        </div>
      </CardHeader>
      
      <Tabs value={verificationTab} onValueChange={setVerificationTab}>
        <div className="px-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="details">
              <User className="h-4 w-4 mr-2" />
              Details
            </TabsTrigger>
            <TabsTrigger value="documents">
              <FileText className="h-4 w-4 mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="verification">
              <CheckCircle className="h-4 w-4 mr-2" />
              Verification
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="details" className="pt-2">
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground">Email</Label>
                <p>{application.email}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Phone</Label>
                <p>{application.phone}</p>
              </div>
            </div>
            
            <div>
              <Label className="text-xs text-muted-foreground">Skills</Label>
              <div className="flex flex-wrap gap-1 mt-1">
                {application.skills?.map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
            
            <div>
              <Label className="text-xs text-muted-foreground">Availability</Label>
              <div className="flex flex-wrap gap-1 mt-1">
                {application.availability?.map((day) => (
                  <Badge key={day} variant="outline">{day}</Badge>
                ))}
              </div>
            </div>
            
            <div>
              <Label className="text-xs text-muted-foreground">Application Date</Label>
              <p>{new Date(application.created_at).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="documents" className="pt-2">
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Resume/CV</h3>
                    <p className="text-sm text-muted-foreground">
                      {application.resume_path ? 'Uploaded' : 'Not uploaded'}
                    </p>
                  </div>
                  {application.resume_path && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDocumentView(application.resume_path)}
                    >
                      View
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">ID Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      {application.identification_path ? 'Uploaded' : 'Not uploaded'}
                    </p>
                  </div>
                  {application.identification_path && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDocumentView(application.identification_path)}
                    >
                      View
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Background Check Consent</h3>
                    <p className="text-sm text-muted-foreground">
                      {application.consent_form_path ? 'Uploaded' : 'Not uploaded'}
                    </p>
                  </div>
                  {application.consent_form_path && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDocumentView(application.consent_form_path)}
                    >
                      View
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="verification" className="pt-2">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status">Verification Status</Label>
              <Select 
                value={verificationStatus} 
                onValueChange={(value) => setVerificationStatus(value as VerificationStatus)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Verification Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add notes about the verification process"
                value={verificationNotes}
                onChange={(e) => setVerificationNotes(e.target.value)}
                rows={4}
              />
            </div>
            
            <div className="rounded-md bg-muted p-4">
              <h4 className="text-sm font-medium mb-2">Verification Checklist</h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-center">
                  <div className="h-4 w-4 mr-2 flex items-center justify-center">
                    {application.resume_path ? <CheckCircle className="h-3 w-3 text-green-500" /> : <XCircle className="h-3 w-3 text-red-500" />}
                  </div>
                  Resume/CV reviewed
                </li>
                <li className="flex items-center">
                  <div className="h-4 w-4 mr-2 flex items-center justify-center">
                    {application.identification_path ? <CheckCircle className="h-3 w-3 text-green-500" /> : <XCircle className="h-3 w-3 text-red-500" />}
                  </div>
                  Identity verification
                </li>
                <li className="flex items-center">
                  <div className="h-4 w-4 mr-2 flex items-center justify-center">
                    {application.consent_form_path ? <CheckCircle className="h-3 w-3 text-green-500" /> : <XCircle className="h-3 w-3 text-red-500" />}
                  </div>
                  Background check authorization
                </li>
              </ul>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          onClick={handleStatusChange}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Status"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProviderVerification;
