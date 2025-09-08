import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Clock, 
  Euro, 
  CheckCircle, 
  ChevronRight, 
  Star, 
  Sparkles, 
  Heart, 
  Zap
} from 'lucide-react';
import { FlowType22 } from '../../types/HomeCleaning22Types';

interface ServiceSelectionStepProps {
  onFlowTypeSelect: (flowType: FlowType22) => void;
}

export const ServiceSelectionStep: React.FC<ServiceSelectionStepProps> = ({ onFlowTypeSelect }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 section-spacing-md">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-heading-color mb-4 tracking-tight">
          Professional Home Cleaning
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the cleaning service that fits your lifestyle and budget
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* One-time Cleaning */}
        <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardHeader className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Popular
              </Badge>
            </div>
            <CardTitle className="text-2xl font-bold text-heading-color mb-2">
              One-time Cleaning
            </CardTitle>
            <p className="text-muted-foreground">
              Perfect for special occasions, moving, or when you need extra help
            </p>
          </CardHeader>
          <CardContent className="relative space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">Customized cleaning plan</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">Flexible scheduling</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">Professional equipment</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">Satisfaction guarantee</span>
              </div>
            </div>

            <Separator />

            <div className="text-center">
              <div className="text-3xl font-bold text-heading-color mb-1">
                From €50/hour
              </div>
              <p className="text-sm text-muted-foreground">
                Based on property size and requirements
              </p>
            </div>

            <Button 
              onClick={() => onFlowTypeSelect('one-time')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:bg-blue-700 transition-colors"
            >
              Choose One-time
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Recurring Cleaning */}
        <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardHeader className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Best Value
              </Badge>
            </div>
            <CardTitle className="text-2xl font-bold text-heading-color mb-2">
              Recurring Cleaning
            </CardTitle>
            <p className="text-muted-foreground">
              Regular cleaning service with flexible scheduling and great discounts
            </p>
          </CardHeader>
          <CardContent className="relative space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">10% recurring discount</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">Flexible frequency options</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">Priority scheduling</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">Consistent quality</span>
              </div>
            </div>

            <Separator />

            <div className="text-center">
              <div className="text-3xl font-bold text-heading-color mb-1">
                From €45/hour
              </div>
              <p className="text-sm text-muted-foreground">
                With recurring discount applied
              </p>
            </div>

            <Button 
              onClick={() => onFlowTypeSelect('recurring')}
              className="w-full bg-green-600 hover:bg-green-700 text-white group-hover:bg-green-700 transition-colors"
            >
              Choose Recurring
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-heading-color mb-8">
          Why Choose Our Cleaning Service?
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center p-6">
            <div className="p-4 bg-blue-100 rounded-full mb-4">
              <Star className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Professional Team</h4>
            <p className="text-muted-foreground text-center">
              Trained and experienced cleaners with attention to detail
            </p>
          </div>
          <div className="flex flex-col items-center p-6">
            <div className="p-4 bg-green-100 rounded-full mb-4">
              <Sparkles className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Eco-Friendly</h4>
            <p className="text-muted-foreground text-center">
              Safe, environmentally friendly cleaning products
            </p>
          </div>
          <div className="flex flex-col items-center p-6">
            <div className="p-4 bg-purple-100 rounded-full mb-4">
              <Heart className="h-8 w-8 text-purple-600" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Satisfaction Guarantee</h4>
            <p className="text-muted-foreground text-center">
              100% satisfaction or we'll make it right
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
