import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Clock, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare,
  MapPin,
  Calendar,
  Users
} from 'lucide-react';

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
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
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
    toggleSkill,
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
      setSearchParams({ tab: 'join' });
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
    const messageContent = `${name} ${email} ${subject} ${message}`.toLowerCase();
    const hasSpam = spamKeywords.some(keyword => messageContent.includes(keyword));
    
    if (hasSpam) {
      toast.error('Your message appears to contain spam content');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('customer_questions')
        .insert([
          {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim() || null,
            subject: subject.trim() || 'General Inquiry',
            message: message.trim(),
            status: 'new',
            priority: 'medium',
            source: 'website_contact_form'
          }
        ])
        .select();

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
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting question:', error);
      toast.error('There was an error sending your message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Get in touch via email',
      value: 'info@kleaners.de',
      action: () => window.location.href = 'mailto:info@kleaners.de'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our team',
      value: '+49 123 456 789',
      action: () => window.location.href = 'tel:+49123456789'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Chat with us on WhatsApp',
      value: 'Message Us',
      action: () => window.open('https://wa.me/49123456789', '_blank')
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Start a live conversation',
      value: 'Chat Now',
      action: () => {
        // Implement live chat integration here
        toast.info('Live chat will be available soon!');
      }
    }
  ];

  const supportFeatures = [
    'Quick response within 24 hours',
    'Professional consultation',
    'Free quotes and estimates',
    'Flexible scheduling options'
  ];

  // Handle join team application success
  if (applicationSubmitted) {
    return <SuccessSubmission email={teamEmail} applicationId={applicationId} />;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have questions about our services or interested in joining our team? We're here to help!
          </p>
        </div>

        {/* Tabbed Interface */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
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
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
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
                        placeholder="+49 123 456 789"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="What's this about?"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us how we can help you..."
                        className="min-h-[120px]"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Methods */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Other Ways to Reach Us</CardTitle>
                    <CardDescription>
                      Choose the method that works best for you
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {contactMethods.map((method, index) => (
                      <div
                        key={index}
                        onClick={method.action}
                        className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <method.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {method.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {method.description}
                          </p>
                          <p className="text-sm font-medium text-primary">
                            {method.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Business Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Business Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Monday - Friday</span>
                      <span className="font-medium">8:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Saturday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Sunday</span>
                      <span className="font-medium">10:00 AM - 4:00 PM</span>
                    </div>
                    <Separator className="my-3" />
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Emergency services available 24/7
                    </div>
                  </CardContent>
                </Card>

                {/* Support Features */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Why Choose Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {supportFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Join Team Tab */}
          <TabsContent value="join" className="mt-0">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Join Our Team
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
                  We're looking for passionate individuals to join our cleaning service. Apply today and become part of our growing team!
                </p>
                
                {!showApplicationForm && (
                  <Button 
                    size="lg" 
                    onClick={() => setShowApplicationForm(true)}
                    className="font-semibold text-base px-8 py-6 mb-8"
                  >
                    Apply Now
                  </Button>
                )}
              </div>

              {!showApplicationForm ? (
                <div className="space-y-12">
                  <BenefitsPanel className="border-0 shadow-md" />
                </div>
              ) : (
                <div className="w-full">
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
      </div>
    </div>
  );
};

export default Contact;