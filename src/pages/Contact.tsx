
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get user agent for spam detection
      const userAgent = navigator.userAgent;
      
      // Insert the question
      const { data: insertedData, error } = await supabase
        .from('customer_questions')
        .insert({
          name,
          email,
          question: message,
          user_agent: userAgent,
        })
        .select('id')
        .single();

      if (error) {
        // Check if it's a spam-related error
        if (error.message?.includes('spam') || error.message?.includes('rate limit')) {
          toast({
            title: 'Too many submissions',
            description: 'You can only submit 2 messages per week. Please wait before submitting another message.',
            variant: 'destructive',
          });
          return;
        }
        throw error;
      }

      // If the question was successfully inserted, call the edge function to capture IP
      if (insertedData?.id) {
        // Call edge function to capture IP address
        await supabase.functions.invoke('capture-question-metadata', {
          body: { questionId: insertedData.id }
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
      const errorMessage = error.message?.includes('rate limit') 
        ? 'Too many submissions. You can only submit 2 messages per week.'
        : 'There was an error sending your message. Please try again later.';
        
      toast({
        title: 'Submission Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Contact Us
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Get in touch with us for any queries or concerns
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>Fill out the form and we'll get back to you</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message" value={message} onChange={e => setMessage(e.target.value)} required className="min-h-[120px]" />
                </div>

                <div className="text-xs text-gray-500 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                  <strong>Note:</strong> To prevent spam, we limit submissions to 2 messages per week per user.
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Other ways to reach us</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  contact@cleaningservice.com
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Phone</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  +49 123 456 789
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Hours</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
