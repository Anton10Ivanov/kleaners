import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Phone, Clock, MapPin, MessageCircle, Users, Shield, CheckCircle } from 'lucide-react';
const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Get user agent for spam detection
      const userAgent = navigator.userAgent;

      // Insert the question
      const {
        data: insertedData,
        error
      } = await supabase.from('customer_questions').insert({
        name,
        email,
        question: message,
        user_agent: userAgent
      }).select('id').single();
      if (error) {
        // Check if it's a spam-related error
        if (error.message?.includes('spam') || error.message?.includes('rate limit')) {
          toast({
            title: 'Too many submissions',
            description: 'You can only submit 2 messages per week. Please wait before submitting another message.',
            variant: 'destructive'
          });
          return;
        }
        throw error;
      }

      // If the question was successfully inserted, call the edge function to capture IP
      if (insertedData?.id) {
        // Call edge function to capture IP address
        await supabase.functions.invoke('capture-question-metadata', {
          body: {
            questionId: insertedData.id
          }
        });
      }

      // Show success message
      toast({
        title: 'Message Sent',
        description: "We'll get back to you soon!"
      });

      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting message:', error);

      // Show error message with appropriate message based on the error
      const errorMessage = error.message?.includes('rate limit') ? 'Too many submissions. You can only submit 2 messages per week.' : 'There was an error sending your message. Please try again later.';
      toast({
        title: 'Submission Failed',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const contactMethods = [{
    icon: Mail,
    title: 'Email Us',
    description: 'Send us an email and we\'ll respond within 24 hours',
    value: 'contact@cleaningservice.com',
    action: 'mailto:contact@cleaningservice.com'
  }, {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak directly with our customer service team',
    value: '+49 123 456 789',
    action: 'tel:+491234567890'
  }, {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Get instant support through our live chat',
    value: 'Available 9 AM - 6 PM',
    action: '#'
  }, {
    icon: MapPin,
    title: 'Visit Us',
    description: 'Come to our office for in-person support',
    value: 'Berlin, Munich, Hamburg',
    action: '#'
  }];
  const supportFeatures = [{
    icon: Clock,
    title: 'Quick Response',
    description: 'We respond to all inquiries within 24 hours'
  }, {
    icon: Users,
    title: 'Expert Team',
    description: 'Our experienced support team is here to help'
  }, {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your information is safe and confidential'
  }];
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="pt-20 pb-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Get in Touch
            </h1>
            
          </div>
          
          {/* Support Features */}
          
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} required className="h-10 border-2 focus:border-primary" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} required className="h-10 border-2 focus:border-primary" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Tell us how we can help you..." value={message} onChange={e => setMessage(e.target.value)} required className="min-h-[120px] resize-none border-2 focus:border-primary" />
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-700 dark:text-blue-300">
                          <strong>Spam Protection:</strong> To ensure quality communication, we limit submissions to 2 messages per week per user.
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full h-10 text-sm font-semibold" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending Message...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Methods */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Contact Methods</CardTitle>
                  <CardDescription>Have questions about our cleaning services? We're here to help.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-1">
                  {contactMethods.map((method, index) => <div key={index} className="group">
                      <a href={method.action} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <method.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm">{method.title}</h4>
                          <p className="text-xs font-medium text-primary truncate">{method.value}</p>
                        </div>
                      </a>
                    </div>)}
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Business Hours - Full Width */}
          <div className="mt-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex justify-between items-center py-2 px-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Monday - Friday</span>
                    <span className="font-semibold text-gray-900 dark:text-white">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 px-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Saturday</span>
                    <span className="font-semibold text-gray-900 dark:text-white">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 px-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Sunday</span>
                    <span className="font-semibold text-gray-600 dark:text-gray-400">Closed</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    <strong>Emergency Support:</strong> 24/7 available for urgent cleaning needs
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
export default Contact;