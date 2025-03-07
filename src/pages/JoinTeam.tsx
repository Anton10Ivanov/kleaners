
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const JoinTeam = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [experience, setExperience] = useState('');
  const [message, setMessage] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [availability, setAvailability] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Create provider application record
      const { data, error } = await supabase
        .from('provider_applications')
        .insert({
          full_name: name,
          email: email,
          phone: phone,
          position: position,
          experience_level: experience,
          availability: availability,
          message: message,
          // We'll handle file upload separately
        })
        .select('id')
        .single();
      
      if (error) throw error;

      // Handle resume upload if provided
      if (resume && data?.id) {
        const fileExt = resume.name.split('.').pop();
        const filePath = `provider_applications/${data.id}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('applications')
          .upload(filePath, resume);
          
        if (uploadError) {
          console.error('Resume upload error:', uploadError);
          // We don't throw here to avoid breaking the flow
        } else {
          // Update the record with the resume path
          await supabase
            .from('provider_applications')
            .update({ resume_path: filePath })
            .eq('id', data.id);
        }
      }
      
      toast({
        title: "Application Submitted",
        description: "We'll review your application and get back to you soon!",
      });
      
      // Redirect to provider signup page with email prefilled
      navigate(`/auth/signup?type=provider&email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error('Application submission error:', error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was a problem submitting your application. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const toggleAvailability = (value: string) => {
    setAvailability(current => 
      current.includes(value)
        ? current.filter(day => day !== value)
        : [...current, value]
    );
  };

  const goToProviderSignup = () => {
    navigate('/auth/signup?type=provider');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Join Our Team
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We're looking for passionate individuals to join our cleaning service. Apply today and become part of our growing team!
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <Card className="border-0 shadow-md md:col-span-3">
            <CardHeader>
              <CardTitle>Apply Now</CardTitle>
              <CardDescription>Fill out the form to apply for a position</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="position">Position of Interest</Label>
                  <Select onValueChange={setPosition} value={position}>
                    <SelectTrigger id="position">
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cleaner">Cleaner</SelectItem>
                      <SelectItem value="supervisor">Cleaning Supervisor</SelectItem>
                      <SelectItem value="customer-service">Customer Service</SelectItem>
                      <SelectItem value="admin">Administrative Staff</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Select onValueChange={setExperience} value={experience}>
                    <SelectTrigger id="experience">
                      <SelectValue placeholder="Select your experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5+">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Availability</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`day-${day}`} 
                          checked={availability.includes(day)}
                          onCheckedChange={() => toggleAvailability(day)}
                        />
                        <Label htmlFor={`day-${day}`} className="text-sm font-normal">{day}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="resume">Resume/CV</Label>
                  <Input
                    id="resume"
                    type="file"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                    accept=".pdf,.doc,.docx"
                  />
                  <p className="text-xs text-muted-foreground">Accepted formats: PDF, DOC, DOCX</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Why do you want to join our team?</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about yourself and why you're interested in this position"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="min-h-[120px]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center pt-2 pb-4">
              <p className="text-sm text-gray-500">
                Already have a provider account?{" "}
                <Button 
                  variant="link" 
                  className="h-auto p-0"
                  onClick={() => navigate('/auth/login')}
                >
                  Sign in
                </Button>
              </p>
            </CardFooter>
          </Card>

          <Card className="border-0 shadow-md md:col-span-2">
            <CardHeader>
              <CardTitle>Why Work With Us?</CardTitle>
              <CardDescription>Benefits of joining our team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Flexible Schedule</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  We offer flexible working hours to accommodate your personal needs.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Competitive Pay</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Fair compensation for your skills and experience.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Growth Opportunities</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Room for advancement and professional development.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Supportive Team</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Join a friendly, diverse, and supportive work environment.
                </p>
              </div>
              <div className="pt-4">
                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary/10"
                  onClick={goToProviderSignup}
                >
                  Skip to Provider Registration
                </Button>
                <p className="text-xs text-center mt-2 text-gray-500">
                  If you're already qualified and want to register directly
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JoinTeam;
