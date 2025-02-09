import { useState } from 'react';
import Navbar from '../components/Navbar';
import { ArrowRight, ArrowLeft, Feather, Shield, Clock, Phone, Check, Minus, Plus, Info, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { toast } from "sonner";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [frequency, setFrequency] = useState('');
  const [hours, setHours] = useState(3);
  const [extras, setExtras] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hasPets, setHasPets] = useState(false);
  const [hasCleaningSupplies, setHasCleaningSupplies] = useState(false);

  const validatePostalCode = (code: string) => code === "1";

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!validatePostalCode(postalCode)) {
        toast.error("Service not available in your area");
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleBackStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const calculatePrice = (basePrice: number) => {
    let price = basePrice;
    if (frequency === 'weekly') {
      price *= 0.8;
    } else if (frequency === 'biweekly') {
      price *= 0.9;
    }
    return price;
  };

  const currentPrice = calculatePrice(frequency === 'weekly' ? 29 : frequency === 'biweekly' ? 32 : 34);

  const renderProgressBar = () => (
    <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
          <Check className="w-5 h-5" />
        </div>
        <div className="ml-2">Ihre Postleitzahl</div>
      </div>
      <div className="h-1 w-24 bg-gray-200 mx-4">
        <div className="h-full bg-primary" style={{ width: `${(currentStep / 3) * 100}%` }} />
      </div>
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center`}>
          2
        </div>
        <div className="ml-2">Reinigungsinformation</div>
      </div>
      <div className="h-1 w-24 bg-gray-200 mx-4">
        <div className="h-full bg-primary" style={{ width: `${Math.max(0, (currentStep - 2) / 1) * 100}%` }} />
      </div>
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full ${currentStep === 3 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center`}>
          3
        </div>
        <div className="ml-2">Kasse</div>
      </div>
    </div>
  );

  const renderServiceOptions = () => (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
      <h3 className="text-xl font-semibold mb-6">Wie oft sollen wir reinigen?</h3>
      <div className="grid grid-cols-3 gap-6">
        <div 
          className={`p-6 rounded-lg border cursor-pointer transition-all ${frequency === 'onetime' ? 'border-primary' : 'border-gray-200'}`}
          onClick={() => setFrequency('onetime')}
        >
          <h4 className="font-semibold mb-2">Ein Mal</h4>
          <p className="text-gray-600">{34.00} €/Stunde</p>
        </div>
        <div 
          className={`p-6 rounded-lg border cursor-pointer transition-all relative ${frequency === 'weekly' ? 'border-primary' : 'border-gray-200'}`}
          onClick={() => setFrequency('weekly')}
        >
          {frequency === 'weekly' && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-sm">
              Beliebteste
            </div>
          )}
          <h4 className="font-semibold mb-2">Wöchentlich</h4>
          <p className="text-gray-600">{29.00} €/Stunde</p>
          <p className="text-sm text-gray-500 mt-2">Sie bekommen die selbe Reinigungskraft</p>
        </div>
        <div 
          className={`p-6 rounded-lg border cursor-pointer transition-all ${frequency === 'biweekly' ? 'border-primary' : 'border-gray-200'}`}
          onClick={() => setFrequency('biweekly')}
        >
          <h4 className="font-semibold mb-2">Alle 2 Wochen</h4>
          <p className="text-gray-600">{32.00} €/Stunde</p>
          <p className="text-sm text-gray-500 mt-2">Sie bekommen die selbe Reinigungskraft</p>
        </div>
      </div>
    </div>
  );

  const renderExtras = () => (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
      <h3 className="text-xl font-semibold mb-6">Für welche Extras würden Sie sich interessieren?</h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="p-4 border rounded-lg cursor-pointer hover:border-primary">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </div>
          <span>Fenster</span>
          <span className="text-sm text-gray-500">Hinzufügen</span>
        </div>
        {/* Add other extra options similarly */}
      </div>
    </div>
  );

  const renderHoursSelection = () => (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Wie viel Zeit würden Sie benötigen?</h3>
        <Button variant="link" className="text-primary">
          Zeit berechnen
        </Button>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setHours(prev => Math.max(1, prev - 0.5))}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="text-xl font-semibold min-w-[100px] text-center">{hours} Stunden</span>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setHours(prev => prev + 0.5)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
        <Info className="w-4 h-4 mr-2" />
        Empfohlen für: 2 Schlafzimmer, 1 Badezimmer
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
      <h3 className="text-xl font-semibold mb-6">Wählen Sie ein Datum und eine Uhrzeit für die erste Reinigung</h3>
      <div className="flex flex-col md:flex-row gap-8">
        <div>
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold mb-4">Verfügbare Zeiten</h4>
          <div className="grid grid-cols-3 gap-2">
            {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'].map((time) => (
              <Button
                key={time}
                variant="outline"
                className="w-full"
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-start gap-2">
          <Checkbox
            id="pets"
            checked={hasPets}
            onCheckedChange={(checked) => setHasPets(checked as boolean)}
          />
          <label htmlFor="pets" className="text-sm">
            Ich habe Haustiere
          </label>
        </div>
        <div className="flex items-start gap-2 mt-4">
          <Checkbox
            id="supplies"
            checked={hasCleaningSupplies}
            onCheckedChange={(checked) => setHasCleaningSupplies(checked as boolean)}
          />
          <label htmlFor="supplies" className="text-sm">
            Ich bestätige, dass ich alle erforderlichen Reinigungsmaterialien zu Hause habe.
          </label>
        </div>
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-80 fixed right-8 top-32">
      <h3 className="text-xl font-semibold mb-6">Zusammenfassung</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-gray-400" />
          <span>{frequency === 'weekly' ? 'Wöchentlich' : frequency === 'biweekly' ? 'Alle 2 Wochen' : 'Ein Mal'}</span>
          <span className="ml-auto">{currentPrice.toFixed(2)} €/h</span>
        </div>
        <div className="flex items-center gap-3">
          <Feather className="w-5 h-5 text-gray-400" />
          <span>Hausreinigung</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-gray-400" />
          <span>{hours} Reinigungsstunden</span>
        </div>
        {date && (
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span>{date.toLocaleDateString('de-DE', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
        )}
        <div className="border-t pt-4 mt-6">
          <div className="flex justify-between font-semibold">
            <span>GESAMTSUMME</span>
            <span>{(currentPrice * hours).toFixed(2)} €</span>
          </div>
          <div className="text-sm text-gray-500">pro Reinigung</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-raleway bg-gray-50">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          {renderProgressBar()}
          
          <div className="relative">
            {currentStep === 1 && renderServiceOptions()}
            {currentStep === 2 && (
              <>
                {renderHoursSelection()}
                {renderExtras()}
              </>
            )}
            {currentStep === 3 && renderCalendar()}
            {renderSummary()}
          </div>

          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <Button 
                onClick={handleBackStep}
                variant="outline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
              </Button>
            )}
            <div className="ml-auto">
              <Button 
                onClick={handleNextStep}
                className="bg-primary hover:bg-primary/90"
              >
                Weiter <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
