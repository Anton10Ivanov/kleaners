
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ColorSchemeTest from '@/components/contact/ColorSchemeTest';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    toast({
      title: "Message Sent",
      description: "We'll get back to you soon!"
    });
    setName('');
    setEmail('');
    setMessage('');
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
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Send Message
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

        {/* Color Scheme Test Section */}
        <div className="mt-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              New Color Scheme Preview
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Testing ground for the proposed website color palette
            </p>
          </div>
          <ColorSchemeTest />
        </div>
      </div>
    </div>
  );
};

export default Contact;
