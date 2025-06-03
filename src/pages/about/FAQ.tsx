
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const faqs = [
    {
      question: "How much does a cleaning service cost?",
      answer: "Our pricing depends on the service type, property size, and frequency. Home cleaning starts from €27 for weekly service, €30 for bi-weekly, and €35 for one-time cleaning. You'll get an instant price quote on step 3 of our booking process.",
      category: "Pricing"
    },
    {
      question: "Are your cleaners insured and background checked?",
      answer: "Yes, all our cleaners are fully insured up to €5M and undergo thorough background checks. We only work with licensed and certified professionals to ensure your safety and peace of mind.",
      category: "Safety"
    },
    {
      question: "What cleaning supplies do you use?",
      answer: "We use eco-friendly, professional-grade cleaning products that are safe for your family and pets. If you have specific preferences or allergies, please let us know in the special instructions during booking.",
      category: "Service"
    },
    {
      question: "How far in advance should I book?",
      answer: "You can book as little as 24 hours in advance, but we recommend booking 2-3 days ahead for the best availability. Same-day booking may be available depending on cleaner availability in your area.",
      category: "Booking"
    },
    {
      question: "What if I'm not satisfied with the cleaning?",
      answer: "We guarantee your satisfaction. If you're not completely happy with our service, contact us within 24 hours and we'll return to re-clean the areas you're not satisfied with at no extra cost.",
      category: "Service"
    },
    {
      question: "Do I need to be home during the cleaning?",
      answer: "No, you don't need to be home. Many customers provide access instructions or leave keys in a secure location. Our cleaners are fully trusted and insured professionals.",
      category: "Service"
    },
    {
      question: "Can I cancel or reschedule my booking?",
      answer: "Yes, you can cancel or reschedule up to 24 hours before your scheduled appointment without any fees. For cancellations with less than 24 hours notice, a small fee may apply.",
      category: "Booking"
    },
    {
      question: "What areas do you serve?",
      answer: "We provide cleaning services in major German cities including Berlin, Munich, Hamburg, Cologne, Frankfurt, and surrounding areas. Enter your postal code to check availability in your location.",
      category: "Coverage"
    },
    {
      question: "What services do you offer?",
      answer: "We offer various cleaning services including regular home cleaning, deep cleaning, move-in/out cleaning, post-construction cleaning, and office cleaning. Each service is tailored to your specific needs and requirements.",
      category: "Service"
    },
    {
      question: "How do you ensure quality cleaning?",
      answer: "We maintain quality through rigorous cleaner training, standardized checklists, customer feedback systems, and regular quality inspections. All our cleaners are experienced professionals who follow our detailed cleaning protocols.",
      category: "Service"
    },
    {
      question: "What is your cancellation policy?",
      answer: "You can cancel your booking up to 24 hours before the scheduled time without any penalty. Cancellations within 24 hours may incur a fee of 50% of the service cost. Emergency cancellations are handled case by case.",
      category: "Booking"
    },
    {
      question: "Do you provide cleaning supplies?",
      answer: "Yes, our cleaners come fully equipped with all necessary cleaning supplies and equipment. We use professional-grade, eco-friendly products. If you prefer us to use your own supplies, please mention this during booking.",
      category: "Service"
    },
    {
      question: "What are your payment methods?",
      answer: "We accept various payment methods including credit cards, debit cards, PayPal, and bank transfers. Payment is processed securely through our platform after the service is completed to your satisfaction.",
      category: "Pricing"
    },
    {
      question: "How long does a typical cleaning take?",
      answer: "Cleaning duration depends on your property size and service type. Regular cleaning typically takes 2-4 hours, while deep cleaning may take 4-8 hours. You can specify your preferred duration during booking.",
      category: "Service"
    },
    {
      question: "Can I request the same cleaner for regular service?",
      answer: "Absolutely! We try to assign the same cleaner for recurring bookings to ensure consistency and familiarity. If your regular cleaner is unavailable, we'll assign a qualified substitute and notify you in advance.",
      category: "Service"
    }
  ];

  const handleSubmitQuestion = async () => {
    if (!question.trim()) {
      toast({
        title: "Question is required",
        description: "Please enter your question before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // First insert the question to get the ID
      const { data, error } = await supabase
        .from('customer_questions')
        .insert({
          name,
          email,
          question,
          status: 'pending'
        })
        .select('id')
        .single();

      if (error) throw error;

      // Call the edge function to capture metadata
      if (data?.id) {
        await supabase.functions.invoke('capture-question-metadata', {
          body: { questionId: data.id }
        });
      }

      toast({
        title: "Question submitted",
        description: "Thank you! We'll get back to you soon.",
      });

      // Reset form
      setName("");
      setEmail("");
      setQuestion("");
      setDialogOpen(false);
    } catch (error) {
      console.error("Error submitting question:", error);
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your question. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-6 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <HelpCircle className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Find answers to the most common questions about our cleaning services, booking process, and policies.
        </p>
      </div>
      
      <Accordion type="single" collapsible className="w-full mb-8">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="font-medium text-left">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {faq.category}
                </span>
                <span>{faq.question}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="text-center mt-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Didn't find what you're looking for?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our customer support team is here to help you with any additional questions.
          </p>
          <Button 
            size="lg" 
            onClick={() => setDialogOpen(true)}
            className="px-8"
          >
            Ask Us
          </Button>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ask a Question</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Your name (optional)"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Your email (optional)"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="question">Your Question *</Label>
              <Textarea 
                id="question" 
                value={question} 
                onChange={(e) => setQuestion(e.target.value)} 
                placeholder="Type your question here..."
                rows={4}
                required
              />
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={handleSubmitQuestion} 
              disabled={isSubmitting || !question.trim()}
            >
              {isSubmitting ? "Submitting..." : "Submit Question"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FAQ;
