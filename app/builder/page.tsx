'use client';

import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FunnelBuilder from '@/components/FunnelBuilder';
import FunnelPreview from '@/components/FunnelPreview';
import { Button } from '@/components/ui/button';

export default function BuilderPage() {
  const [funnelSteps, setFunnelSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const addStep = () => {
    setFunnelSteps([...funnelSteps, { id: Date.now(), elements: [] }]);
  };

  const updateStep = (stepId, elements) => {
    setFunnelSteps(funnelSteps.map(step => 
      step.id === stepId ? { ...step, elements } : step
    ));
  };

  const handleSave = () => {
    // Hier würde die Logik zum Speichern des Funnels implementiert werden
    console.log('Funnel saved:', funnelSteps);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Funnel Builder</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex justify-between mb-4">
              <Button onClick={addStep}>Neuen Schritt hinzufügen</Button>
              <Button onClick={handleSave} variant="outline">Speichern</Button>
            </div>
            {funnelSteps.map((step, index) => (
              <FunnelBuilder
                key={step.id}
                stepId={step.id}
                stepIndex={index}
                elements={step.elements}
                updateStep={updateStep}
                setCurrentStep={setCurrentStep}
              />
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Vorschau</h2>
            <FunnelPreview steps={funnelSteps} currentStep={currentStep} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}