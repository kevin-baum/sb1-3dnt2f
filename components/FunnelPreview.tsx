'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const FunnelPreview = ({ steps, currentStep }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (elementId, value) => {
    setFormData({ ...formData, [elementId]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Hier würde die Logik zur Verarbeitung der Formulardaten implementiert werden
  };

  const renderElement = (element) => {
    switch (element.type) {
      case 'heading':
        return <h2 className="text-2xl font-bold mb-4">{element.content}</h2>;
      case 'paragraph':
        return <p className="mb-4">{element.content}</p>;
      case 'image':
        return <img src={element.content} alt="Funnel element" className="max-w-full h-auto mb-4" />;
      case 'button':
        return (
          <Button className="mb-4" onClick={() => console.log('Button clicked:', element.content)}>
            {element.content}
          </Button>
        );
      case 'input':
        return (
          <Input
            type="text"
            placeholder={element.placeholder || 'Eingabe'}
            value={formData[element.id] || ''}
            onChange={(e) => handleInputChange(element.id, e.target.value)}
            className="mb-4"
          />
        );
      default:
        return null;
    }
  };

  const currentStepElements = steps[currentStep]?.elements || [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Schritt {currentStep + 1} von {steps.length}</h3>
      <form onSubmit={handleSubmit}>
        {currentStepElements.map((element) => (
          <div key={element.id}>{renderElement(element)}</div>
        ))}
        {currentStepElements.length > 0 && (
          <Button type="submit">Weiter</Button>
        )}
      </form>
    </div>
  );
};

export default FunnelPreview;