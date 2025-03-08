
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const FAQ = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const faqs = [{
    question: "What services do you offer?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
  }, {
    question: "How do you ensure quality cleaning?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  }, {
    question: "What is your cancellation policy?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }, {
    question: "Do you provide cleaning supplies?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }, {
    question: "What are your payment methods?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat."
  }];

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
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center my-[18px] px-0">Frequently Asked Questions</h1>
      
      <Accordion type="single" collapsible className="w-full mb-8">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="font-medium text-2xl">{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="text-center mt-12">
        <h2 className="text-xl font-semibold mb-4">Didn't find what you're looking for?</h2>
        <Button 
          size="lg" 
          onClick={() => setDialogOpen(true)}
          className="px-8"
        >
          Ask Us
        </Button>
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
