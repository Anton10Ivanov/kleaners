import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Phone, MessageCircle, Clock, CheckCircle, Users } from 'lucide-react';
import { UnifiedContainer } from '@/components/layout/UnifiedContainer';

// Import Join Team components
import { useJoinTeamForm } from '@/hooks/useJoinTeamForm';
import { ApplicationForm } from '@/components/provider/application/ApplicationForm';
import { BenefitsPanel } from '@/components/provider/application/BenefitsPanel';
import { SuccessSubmission } from '@/components/provider/application/SuccessSubmission';
const Contact = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('contact');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  // Join Team form hook
  const {
    currentStep,
    formProgress,
    name: teamName,
    email: teamEmail,
    phone: teamPhone,
    position,
    experience,
    availability,
    skills,
    resume,
    backgroundCheckConsent,
    message: teamMessage,
    agreeToTerms,
    agreeToBackgroundCheck,
    agreeToTraining,
    isLoading,
    applicationSubmitted,
    applicationId,
    setName: setTeamName,
    setEmail: setTeamEmail,
    setPhone: setTeamPhone,
    setPosition,
    setExperience,
    setMessage: setTeamMessage,
    setAgreeToTerms,
    setAgreeToBackgroundCheck,
    setAgreeToTraining,
    setResume,
    setBackgroundCheckConsent,
    nextStep,
    prevStep,
    handleSubmit: handleTeamSubmit,
    handleFileChange,
    toggleAvailability,
    toggleSkill
  } = useJoinTeamForm();

  // Handle tab switching based on URL params
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'join') {
      setActiveTab('join');
    } else {
      setActiveTab('contact');
    }
  }, [searchParams]);
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'join') {
      setSearchParams({
        tab: 'join'
      });
    } else {
      setSearchParams({});
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Basic spam detection
    const spamKeywords = ['crypto', 'bitcoin', 'investment', 'forex', 'loan', 'casino'];
    const messageContent = `${name} ${email} ${message}`.toLowerCase();
    const hasSpam = spamKeywords.some(keyword => messageContent.includes(keyword));
    if (hasSpam) {
      toast.error('Your message appears to contain spam content');
      return;
    }
    setIsSubmitting(true);
    try {
      const {
        data,
        error
      } = await supabase.from('customer_questions').insert([{
        name: name.trim(),
        email: email.trim(),
        phone: null,
        subject: 'General Inquiry',
        message: message.trim(),
        status: 'new',
        priority: 'medium',
        source: 'website_contact_form'
      }]).select();
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      console.log('Question submitted successfully:', data);

      // Call edge function to capture IP address
      try {
        await supabase.functions.invoke('capture-question-metadata', {
          body: {
            questionId: data[0].id,
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'direct'
          }
        });
      } catch (ipError) {
        console.warn('Failed to capture metadata:', ipError);
        // Don't fail the whole submission for metadata capture
      }
      toast.success('Thank you for your message! We\'ll get back to you within 24 hours.');

      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting question:', error);
      toast.error('There was an error sending your message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const contactMethods = [{
    icon: Mail,
    title: 'Email Us',
    value: 'info@kleaners.de',
    action: () => window.location.href = 'mailto:info@kleaners.de'
  }, {
    icon: Phone,
    title: 'Call Us',
    value: '+49 123 456 789',
    action: () => window.location.href = 'tel:+49123456789'
  }, {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: 'Message Us',
    action: () => window.open('https://wa.me/49123456789', '_blank')
  }];
  

  // Handle join team application success
  if (applicationSubmitted) {
    return <SuccessSubmission email={teamEmail} applicationId={applicationId} />;
  }
  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <UnifiedContainer size="xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-heading-color mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-secondary-text max-w-3xl mx-auto">
            Have questions about our services or interested in joining our team? We're here to help!
          </p>
        </div>

        {/* Tabbed Interface */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6 bg-muted/50 border border-border/50 shadow-sm">
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Get in Touch
            </TabsTrigger>
            <TabsTrigger value="join" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Join Our Team
            </TabsTrigger>
          </TabsList>

          {/* Contact Tab */}
          <TabsContent value="contact" className="mt-0">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" type="text" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" placeholder="your.email@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea id="message" placeholder="Tell us how we can help you..." className="min-h-[120px]" value={message} onChange={e => setMessage(e.target.value)} required />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Methods */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Other Ways to Reach Us</h3>
                  <div className="space-y-3">
                    {contactMethods.map((method, index) => 
                      <div key={index} onClick={method.action} className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted cursor-pointer transition-colors">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <method.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{method.title}</h4>
                          <p className="text-sm font-medium text-primary">{method.value}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Business Hours */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Business Hours
                  </h3>
                  <div className="space-y-2 p-4 rounded-lg bg-muted/50">
                    <div className="flex justify-between items-center">
                      <span className="text-secondary-text">Weekdays</span>
                      <span className="font-medium">8:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary-text">Weekends</span>
                      <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Join Team Tab */}
          <TabsContent value="join" className="mt-0">
            <div className="space-y-6">
              {!showApplicationForm ? (
                <div className="space-y-6">
                  {/* Introduction */}
                  <div className="text-center max-w-2xl mx-auto">
                    <p className="text-lg text-secondary-text">
                      We're looking for passionate individuals to join our cleaning service. Discover the benefits of working with us!
                    </p>
                  </div>
                  
                  {/* Benefits Section */}
                  <BenefitsPanel className="border-0" />
                  
                  {/* Apply Button */}
                  <div className="text-center pt-4">
                    <Button 
                      size="lg" 
                      onClick={() => setShowApplicationForm(true)} 
                      className="px-8 py-3"
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="max-w-4xl mx-auto">
                  <ApplicationForm 
                    currentStep={currentStep} 
                    formProgress={formProgress} 
                    name={teamName} 
                    email={teamEmail} 
                    phone={teamPhone} 
                    position={position} 
                    experience={experience} 
                    availability={availability} 
                    skills={skills} 
                    resume={resume} 
                    backgroundCheckConsent={backgroundCheckConsent} 
                    message={teamMessage} 
                    agreeToTerms={agreeToTerms} 
                    agreeToBackgroundCheck={agreeToBackgroundCheck} 
                    agreeToTraining={agreeToTraining} 
                    isLoading={isLoading} 
                    setName={setTeamName} 
                    setEmail={setTeamEmail} 
                    setPhone={setTeamPhone} 
                    setPosition={setPosition} 
                    setExperience={setExperience} 
                    setMessage={setTeamMessage} 
                    setAgreeToTerms={setAgreeToTerms} 
                    setAgreeToBackgroundCheck={setAgreeToBackgroundCheck} 
                    setAgreeToTraining={setAgreeToTraining} 
                    setResume={setResume} 
                    setBackgroundCheckConsent={setBackgroundCheckConsent} 
                    handleFileChange={handleFileChange} 
                    toggleAvailability={toggleAvailability} 
                    toggleSkill={toggleSkill} 
                    prevStep={prevStep} 
                    handleSubmit={handleTeamSubmit} 
                  />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </UnifiedContainer>
    </div>
  );
};
export default Contact;