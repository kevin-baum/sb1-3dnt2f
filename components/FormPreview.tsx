'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const FormPreview = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', answers);
    // Here you would typically send the answers to a server
  };

  const handleInputChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'text':
        return (
          <Input
            type="text"
            value={answers[question.id] || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            className="mt-1"
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            value={answers[question.id] || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            className="mt-1"
          />
        );
      case 'multiple_choice':
        return (
          <RadioGroup
            value={answers[question.id] || ''}
            onValueChange={(value) => handleInputChange(question.id, value)}
            className="mt-2"
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      default:
        return null;
    }
  };

  const currentStepQuestions = steps[currentStep]?.questions || [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Schritt {currentStep + 1} von {steps.length}</h3>
      <form onSubmit={handleSubmit}>
        {currentStepQuestions.map((question) => (
          <div key={question.id} className="mb-4">
            <Label htmlFor={question.id} className="font-medium">
              {question.text}
            </Label>
            {renderQuestion(question)}
          </div>
        ))}
        <div className="flex justify-between mt-6">
          <Button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="outline"
          >
            Zurück
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={handleNext}>
              Weiter
            </Button>
          ) : (
            <Button type="submit">Absenden</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormPreview;