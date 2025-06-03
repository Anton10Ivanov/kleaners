
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const ColorSchemeTest: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-4" style={{ backgroundColor: '#FAFAFA' }}>
      <Card className="border-2" style={{ borderColor: '#88d42a', backgroundColor: '#FAFAFA' }}>
        <CardHeader style={{ backgroundColor: '#88d42a' }}>
          <CardTitle className="text-white">
            New Color Scheme Test
          </CardTitle>
          <CardDescription className="text-white/90">
            Testing the proposed color palette
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 style={{ color: '#2C3E50' }} className="font-semibold">
              Color Palette Preview
            </h3>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded text-center text-white" style={{ backgroundColor: '#88d42a' }}>
                Primary
              </div>
              <div className="p-3 rounded text-center text-white" style={{ backgroundColor: '#2C3E50' }}>
                Secondary
              </div>
              <div className="p-3 rounded text-center border-2" style={{ backgroundColor: '#FAFAFA', color: '#2C3E50', borderColor: '#88d42a' }}>
                Background
              </div>
              <div className="p-3 rounded text-center text-white" style={{ backgroundColor: '#A2EF49' }}>
                Hover/Accent
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Input 
              placeholder="Test input field" 
              className="border-2"
              style={{ borderColor: '#88d42a', backgroundColor: '#FAFAFA' }}
            />
            
            <Button 
              className="w-full transition-all duration-200"
              style={{ 
                backgroundColor: '#88d42a',
                color: 'white',
                ...(isHovered && { backgroundColor: '#A2EF49' })
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Primary Button {isHovered ? '(Hovered)' : ''}
            </Button>

            <Button 
              variant="outline"
              className="w-full border-2"
              style={{ 
                borderColor: '#88d42a',
                color: '#2C3E50',
                backgroundColor: '#FAFAFA'
              }}
            >
              Secondary Button
            </Button>
          </div>

          <div className="space-y-2">
            <Badge style={{ backgroundColor: '#88d42a', color: 'white' }}>
              Primary Badge
            </Badge>
            <Badge variant="outline" style={{ borderColor: '#88d42a', color: '#2C3E50' }}>
              Outline Badge
            </Badge>
          </div>

          <div className="text-sm space-y-1">
            <p style={{ color: '#2C3E50' }}>
              <strong>Primary text</strong> in deep blue for readability
            </p>
            <p style={{ color: '#2C3E50', opacity: 0.7 }}>
              Secondary text with reduced opacity
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorSchemeTest;
