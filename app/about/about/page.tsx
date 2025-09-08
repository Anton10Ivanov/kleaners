import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, Award, Clock, ArrowRight, HelpCircle } from 'lucide-react';
import { UnifiedContainer } from '@/components/layout/UnifiedContainer';

const About = () => {
  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "50,000+", label: "Cleanings Completed" },
    { number: "99%", label: "Customer Satisfaction" },
    { number: "5 Years", label: "Experience" }
  ];

  const values = [
    {
      icon: CheckCircle,
      title: "Quality First",
      description: "Highest standards in every service"
    },
    {
      icon: Users,
      title: "Professional Team",
      description: "Trained and experienced staff"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to exceptional results"
    },
    {
      icon: Clock,
      title: "Reliable",
      description: "Always on time, every time"
    }
  ];

  return (
    <UnifiedContainer className="section-spacing-lg space-y-16">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Professional Cleaning Services You Can Trust
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          We provide comprehensive cleaning solutions for homes, offices, and commercial spaces. 
          Our commitment to quality and customer satisfaction sets us apart.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* About Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="form-spacing-loose">
          <h2 className="text-3xl font-bold">Who We Are</h2>
          <div className="form-spacing-relaxed text-muted-foreground leading-relaxed">
            <p>
              Founded with a simple mission: to provide exceptional cleaning services that exceed expectations. 
              We started as a small local business and have grown into a trusted service provider.
            </p>
            <p>
              Our professional team uses eco-friendly products and state-of-the-art equipment to ensure 
              the best results. Every service is backed by our quality guarantee.
            </p>
          </div>
        </div>
        
        <Card className="card-spacing-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-muted-foreground leading-relaxed">
              To provide exceptional cleaning services that create healthier, happier environments 
              while building lasting relationships based on trust and reliability.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Values Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
          These core principles guide everything we do and help us deliver exceptional service.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div key={index} className="text-center card-spacing-md">
              <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="card-spacing-md">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Award className="h-5 w-5 text-primary" />
              Company Values
            </CardTitle>
            <CardDescription>
              Learn more about our principles and commitment to excellence.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button asChild variant="outline" className="w-full">
              <Link href="/about/values" className="flex items-center gap-2">
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="card-spacing-md">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <HelpCircle className="h-5 w-5 text-primary" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>
              Find answers to common questions about our services.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button asChild variant="outline" className="w-full">
              <Link href="/about/faq" className="flex items-center gap-2">
                View FAQ
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-muted/30 rounded-lg card-spacing-lg">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          Experience the difference professional cleaning can make for your space.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/services">Browse Services</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Get Quote</Link>
          </Button>
        </div>
      </div>
    </UnifiedContainer>
  );
};

export default About;