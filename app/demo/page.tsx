'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import FunnelPreview from '@/components/FunnelPreview';

const demoFunnel = [
  {
    id: 1,
    elements: [
      { id: 1, type: 'heading', content: 'Willkommen zum Demo-Funnel' },
      { id: 2, type: 'paragraph', content: 'Dies ist eine Demonstration unseres Funnel-Builders.' },
      { id: 3, type: 'button', content: 'Starten', link: '#' },
    ],
  },
  {
    id: 2,
    elements: [
      { id: 4, type: 'heading', content: 'Schritt 2: Informationen sammeln' },
      { id: 5, type: 'input', placeholder: 'Ihre E-Mail-Adresse' },
      { id: 6, type: 'button', content: 'Weiter', link: '#' },
    ],
  },
  {
    id: 3,
    elements: [
      { id: 7, type: 'heading', content: 'Vielen Dank!' },
      { id: 8, type: 'paragraph', content: 'Sie haben den Demo-Funnel abgeschlossen.' },
      { id: 9, type: 'button', content: 'Zurück zum Start', link: '/' },
    ],
  },
];

export default function Demo() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < demoFunnel.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Demo-Funnel</h1>
      <div className="max-w-md mx-auto">
        <FunnelPreview steps={demoFunnel} currentStep={currentStep} />
        <div className="flex justify-between mt-6">
          <Button onClick={handlePrevious} disabled={currentStep === 0}>
            Zurück
          </Button>
          <Button onClick={handleNext} disabled={currentStep === demoFunnel.length - 1}>
            Weiter
          </Button>
        </div>
      </div>
    </div>
  );
}