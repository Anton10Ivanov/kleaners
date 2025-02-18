import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <a href="tel:+491234567890" className="text-gray-600 dark:text-gray-300">
                  +49 123 456 789
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <a href="mailto:info@kleaners.de" className="text-gray-600 dark:text-gray-300">
                  info@kleaners.de
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Address</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Hauptstraße 123<br />
                  10115 Berlin, Germany
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we help you?"
                className="min-h-[150px]"
                required
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
