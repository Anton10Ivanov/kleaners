
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Users, Heart, Handshake, Award, Globe, Shield, Lightbulb } from 'lucide-react';

const CompanyValues = () => {
  const coreValues = [
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: "German Quality Standards",
      description: "We maintain the highest cleaning standards that Germany is known for worldwide. Every service meets or exceeds industry benchmarks while remaining accessible to all.",
      details: [
        "ISO-certified cleaning procedures",
        "Regular quality audits and inspections",
        "Professional-grade equipment and eco-friendly products",
        "Continuous training on German cleaning methodologies"
      ]
    },
    {
      icon: <Target className="h-8 w-8 text-green-600" />,
      title: "Perfect Price-Quality Balance",
      description: "Premium services at fair prices. We believe quality cleaning shouldn't be a luxury but an accessible service for every household and business.",
      details: [
        "Transparent pricing with no hidden fees",
        "Flexible packages for different budgets",
        "Value-driven service optimization",
        "Competitive rates without compromising quality"
      ]
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Fighting the Black Economy",
      description: "Our biggest mission is to eliminate undeclared work in the private cleaning sector by offering legitimate, insured, and fairly-paid employment.",
      details: [
        "All employees are properly registered and insured",
        "Fair wages above minimum wage standards",
        "Full tax compliance and social security contributions",
        "Transparent business practices and legal contracts"
      ]
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Integration & Opportunity",
      description: "We create pathways for international workers to integrate into the German system while building meaningful careers in the service industry.",
      details: [
        "German language support programs",
        "Cultural integration assistance",
        "Legal work permits and documentation help",
        "Career development and skill building opportunities"
      ]
    },
    {
      icon: <Globe className="h-8 w-8 text-teal-600" />,
      title: "Universal Accessibility",
      description: "Quality cleaning services should be available to people from all walks of life, regardless of their background or economic situation.",
      details: [
        "Flexible payment options and plans",
        "Services adapted to different cultural needs",
        "Multiple language customer support",
        "Special rates for seniors and students"
      ]
    },
    {
      icon: <Heart className="h-8 w-8 text-pink-600" />,
      title: "Social Responsibility",
      description: "We believe in giving back to the community and supporting those who need it most through our planned partnership programs.",
      details: [
        "Upcoming partnerships with disability support organizations",
        "Free services for households in need",
        "Portion of profits donated to social causes",
        "Employment opportunities for people with special needs"
      ]
    }
  ];

  const futurePlans = [
    {
      icon: <Handshake className="h-6 w-6 text-blue-500" />,
      title: "Special Needs Partnership Program",
      description: "Creating employment opportunities and support systems for individuals with disabilities."
    },
    {
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: "Community Support Initiative",
      description: "Donating a percentage of profits to local charities and social causes."
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
      title: "Skills Development Center",
      description: "Establishing training facilities for professional cleaning and life skills development."
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Our Company Values
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          At the heart of our company lies a commitment to excellence, fairness, and social impact. 
          We're not just a cleaning service—we're building a better future for the industry and society.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Badge variant="outline" className="text-sm px-4 py-2">German Quality</Badge>
          <Badge variant="outline" className="text-sm px-4 py-2">Fair Employment</Badge>
          <Badge variant="outline" className="text-sm px-4 py-2">Social Impact</Badge>
          <Badge variant="outline" className="text-sm px-4 py-2">Universal Access</Badge>
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        {coreValues.map((value, index) => (
          <Card key={index} className="border-2 border-gray-200 dark:border-gray-700 hover:border-primary/30 transition-colors duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  {value.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  {value.title}
                </CardTitle>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {value.description}
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {value.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{detail}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mission Statement */}
      <Card className="bg-gradient-to-r from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-950 border-primary/20 mb-16">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            To revolutionize the cleaning industry in Germany by providing exceptional services at fair prices, 
            creating legitimate employment opportunities, and building bridges between communities. We strive to 
            eliminate the black economy while ensuring that quality cleaning services are accessible to everyone, 
            regardless of their background or economic situation.
          </p>
        </CardContent>
      </Card>

      {/* Future Plans */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Looking Ahead: Our Future Initiatives
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          We're constantly working to expand our positive impact on society through innovative programs and partnerships.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {futurePlans.map((plan, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-full">
                    {plan.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {plan.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {plan.description}
                </p>
                <Badge variant="secondary" className="mt-4">
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="bg-primary text-white text-center">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4">
            Join Us in Building a Better Future
          </h2>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-6">
            Whether you're looking for quality cleaning services or want to be part of our mission as an employee, 
            we invite you to join our growing community of people who believe in fairness, quality, and social responsibility.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="bg-white text-primary">
              Quality Services
            </Badge>
            <Badge variant="secondary" className="bg-white text-primary">
              Fair Employment
            </Badge>
            <Badge variant="secondary" className="bg-white text-primary">
              Social Impact
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyValues;
