import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Award, Clock, ArrowRight, HelpCircle, Heart } from 'lucide-react';
import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { FAQSection } from '@/components/faq/FAQSection';

const About = () => {
  const values = [
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description: "We maintain the highest standards in every cleaning service we provide."
    },
    {
      icon: Users,
      title: "Professional Team",
      description: "Our trained and experienced staff deliver reliable, consistent results."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our cleaning services."
    },
    {
      icon: Clock,
      title: "Reliability",
      description: "Punctual, dependable service you can count on every time."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "50,000+", label: "Cleanings Completed" },
    { number: "99%", label: "Customer Satisfaction" },
    { number: "24/7", label: "Customer Support" }
  ];

  return (
    <UnifiedContainer className="py-layout-section">
      {/* Hero Section */}
      <div className="text-center mb-layout-section">
        <Badge variant="outline" className="mb-4">
          About Kleaners
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Professional Cleaning Services You Can Trust
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          With years of experience in the cleaning industry, we provide comprehensive cleaning solutions 
          for homes, offices, and commercial spaces. Our commitment to quality and customer satisfaction 
          sets us apart.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-layout-section">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Our Story Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-layout-section items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Founded with a simple mission: to provide exceptional cleaning services that exceed expectations. 
              We started as a small local business and have grown into a trusted cleaning service provider, 
              serving thousands of satisfied customers.
            </p>
            <p>
              Our team of professional cleaners is trained to handle all types of cleaning challenges, 
              from regular home maintenance to specialized commercial cleaning. We use eco-friendly products 
              and state-of-the-art equipment to ensure the best results.
            </p>
            <p>
              What sets us apart is our attention to detail, reliability, and commitment to customer satisfaction. 
              Every cleaning service is backed by our quality guarantee.
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To provide exceptional cleaning services that create healthier, happier environments 
                for our customers while building lasting relationships based on trust and reliability.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To be the leading cleaning service provider, known for our professionalism, 
                innovation, and commitment to environmental sustainability.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-layout-section">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These values guide everything we do and help us deliver exceptional service to our customers.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{value.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-layout-section">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Learn More About Our Values
            </CardTitle>
            <CardDescription>
              Discover the principles that guide our work and commitment to excellence.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/about/values" className="flex items-center gap-2">
                Company Values
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Have Questions?
            </CardTitle>
            <CardDescription>
              Find answers to common questions about our services and booking process.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/about/faq" className="flex items-center gap-2">
                View FAQ
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <div className="text-center mt-layout-section">
        <Card className="p-8">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
            <CardDescription className="text-lg">
              Experience the difference professional cleaning can make for your space.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/services">Browse Services</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </UnifiedContainer>
  );
};

export default About;