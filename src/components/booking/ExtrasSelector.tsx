import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Clock, Euro, Settings, Info } from 'lucide-react';
import { ServiceType } from '@/schemas/booking';
import { 
  ExtraConfig, 
  SelectedExtra, 
  getExtrasByCategory, 
  calculateExtraPrice, 
  calculateExtraTime 
} from '@/types/extras';

interface ExtrasSelectorProps {
  serviceType: ServiceType;
  selectedExtras: SelectedExtra[];
  onExtrasChange: (extras: SelectedExtra[]) => void;
}

const ExtrasSelector: React.FC<ExtrasSelectorProps> = ({
  serviceType,
  selectedExtras,
  onExtrasChange
}) => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [tempOptions, setTempOptions] = useState<Record<string, any>>({});

  const extrasByCategory = getExtrasByCategory(serviceType);

  const isExtraSelected = (extraId: string) => {
    return selectedExtras.some(selected => selected.id === extraId);
  };

  const handleExtraToggle = (extra: ExtraConfig) => {
    if (extra.requiresPopup) {
      setOpenDialog(extra.id);
      setTempOptions({});
    } else {
      toggleSimpleExtra(extra);
    }
  };

  const toggleSimpleExtra = (extra: ExtraConfig) => {
    const isSelected = isExtraSelected(extra.id);
    
    if (isSelected) {
      onExtrasChange(selectedExtras.filter(selected => selected.id !== extra.id));
    } else {
      const newExtra: SelectedExtra = {
        id: extra.id,
        finalPrice: extra.basePrice,
        estimatedTime: extra.timeEstimate
      };
      onExtrasChange([...selectedExtras, newExtra]);
    }
  };

  const handleOptionsConfirm = (extra: ExtraConfig) => {
    const finalPrice = calculateExtraPrice(extra, tempOptions);
    const estimatedTime = calculateExtraTime(extra, tempOptions);
    
    const newExtra: SelectedExtra = {
      id: extra.id,
      selectedOptions: tempOptions,
      finalPrice,
      estimatedTime
    };

    const updatedExtras = selectedExtras.filter(selected => selected.id !== extra.id);
    onExtrasChange([...updatedExtras, newExtra]);
    setOpenDialog(null);
    setTempOptions({});
  };

  const handleOptionsCancel = () => {
    setOpenDialog(null);
    setTempOptions({});
  };

  const getSelectedExtra = (extraId: string) => {
    return selectedExtras.find(selected => selected.id === extraId);
  };

  const getTotalPrice = () => {
    return selectedExtras.reduce((total, extra) => total + extra.finalPrice, 0);
  };

  const getTotalTime = () => {
    return selectedExtras.reduce((total, extra) => total + extra.estimatedTime, 0);
  };

  const ExtraCard = ({ extra }: { extra: ExtraConfig }) => {
    const isSelected = isExtraSelected(extra.id);
    const selectedExtra = getSelectedExtra(extra.id);

    return (
      <Card 
        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
          isSelected ? 'ring-2 ring-primary border-primary' : ''
        }`}
        onClick={() => handleExtraToggle(extra)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Checkbox 
                checked={isSelected}
                onChange={() => {}}
                className="pointer-events-none"
              />
              <div className="flex-1">
                <h4 className="font-medium text-sm">{extra.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{extra.description}</p>
                
                <div className="flex items-center space-x-3 mt-2">
                  <div className="flex items-center space-x-1">
                    <Euro className="h-3 w-3 text-primary" />
                    <span className="text-xs font-medium">
                      {selectedExtra ? selectedExtra.finalPrice.toFixed(2) : extra.basePrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs">
                      {selectedExtra ? selectedExtra.estimatedTime : extra.timeEstimate}min
                    </span>
                  </div>
                  {extra.requiresPopup && (
                    <Badge variant="secondary" className="text-xs">
                      <Settings className="h-3 w-3 mr-1" />
                      Options
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const OptionsDialog = ({ extra }: { extra: ExtraConfig }) => {
    if (!extra.options) return null;

    return (
      <Dialog open={openDialog === extra.id} onOpenChange={(open) => !open && handleOptionsCancel()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <span>{extra.title}</span>
              <Badge variant="outline">Options</Badge>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{extra.description}</p>
            
            <div className="space-y-3">
              {extra.options.map((option) => (
                <div key={option.id} className="flex items-start space-x-3">
                  <Checkbox
                    id={option.id}
                    checked={tempOptions[option.id] || false}
                    onCheckedChange={(checked) => {
                      setTempOptions(prev => ({
                        ...prev,
                        [option.id]: checked
                      }));
                    }}
                  />
                  <div className="flex-1">
                    <Label htmlFor={option.id} className="text-sm font-medium cursor-pointer">
                      {option.label}
                    </Label>
                    {option.description && (
                      <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                    )}
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-primary">
                        +€{option.priceModifier.toFixed(2)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        +{option.timeModifier}min
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="flex items-center justify-between text-sm">
              <span>Total:</span>
              <div className="flex items-center space-x-2">
                <span className="font-medium">€{calculateExtraPrice(extra, tempOptions).toFixed(2)}</span>
                <span className="text-muted-foreground">
                  {calculateExtraTime(extra, tempOptions)}min
                </span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleOptionsCancel} className="flex-1">
                Cancel
              </Button>
              <Button onClick={() => handleOptionsConfirm(extra)} className="flex-1">
                Add Service
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  if (Object.keys(extrasByCategory).length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Info className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No additional services available for this service type.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Additional Services</h3>
        {selectedExtras.length > 0 && (
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Euro className="h-4 w-4 text-primary" />
              <span className="font-medium">+€{getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>+{getTotalTime()}min</span>
            </div>
          </div>
        )}
      </div>

      {Object.entries(extrasByCategory).map(([category, extras]) => (
        <Card key={category}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base capitalize">{category.replace('_', ' ')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {extras.map((extra) => (
              <div key={extra.id}>
                <ExtraCard extra={extra} />
                <OptionsDialog extra={extra} />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ExtrasSelector;