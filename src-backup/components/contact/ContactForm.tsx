
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/utils/logging';

// Define validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  question: z.string().min(10, { message: 'Question must be at least 10 characters' })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      question: ''
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // Get user agent for spam detection
      const userAgent = navigator.userAgent;
      
      // Insert the question
      const { data: insertedData, error } = await supabase
        .from('customer_questions')
        .insert({
          name: data.name,
          email: data.email,
          question: data.question,
          user_agent: userAgent,
        })
        .select('id')
        .single();

      if (error) {
        // Check if it's a spam-related error
        if (error.message?.includes('spam') || error.message?.includes('rate limit')) {
          toast({
            title: 'Too many submissions',
            description: 'Please wait before submitting another question. If you think this is an error, contact us directly.',
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
        title: 'Question Submitted',
        description: 'Thank you for your question. We will get back to you soon!',
        variant: 'default',
      });

      // Reset form
      form.reset();
    } catch (error) {
      logger.error('Failed to submit contact form', { 
        error: error instanceof Error ? error.message : 'Unknown error',
        email: data.email 
      }, "ContactForm");
      
      // Show error message with appropriate message based on the error
      const errorMessage = error.message?.includes('rate limit') 
        ? 'Too many submissions. Please try again later.'
        : 'There was an error submitting your question. Please try again later.';
        
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
    <div className="w-full max-w-md mx-auto card-spacing-md bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Contact Us</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="form-spacing-relaxed">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Question</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="How can we help you?" 
                    className="min-h-[120px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-xs text-gray-500 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
            <strong>Note:</strong> To prevent spam, we limit submissions to 3 per hour and 10 per day per user.
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Question'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
