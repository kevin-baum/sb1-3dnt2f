'use client';

import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import ElementTypes from './ElementTypes';
import FunnelElement from './FunnelElement';
import { Button } from '@/components/ui/button';

const FunnelBuilder = ({ stepId, stepIndex, elements, updateStep, setCurrentStep }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'element',
    drop: (item) => addElementToStep(item.type),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addElementToStep = useCallback((type) => {
    const newElement = {
      id: Date.now(),
      type,
      content: `Neues ${type} Element`,
    };
    updateStep(stepId, [...elements, newElement]);
  }, [stepId, elements, updateStep]);

  const updateElement = useCallback((elementId, updatedElement) => {
    const updatedElements = elements.map(el =>
      el.id === elementId ? updatedElement : el
    );
    updateStep(stepId, updatedElements);
  }, [stepId, elements, updateStep]);

  const removeElement = useCallback((elementId) => {
    const updatedElements = elements.filter(el => el.id !== elementId);
    updateStep(stepId, updatedElements);
  }, [stepId, elements, updateStep]);

  return (
    <div className="mb-8 p-4 border rounded-lg bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Schritt {stepIndex + 1}</h3>
        <Button onClick={() => setCurrentStep(stepIndex)} variant="outline" size="sm">Vorschau</Button>
      </div>
      <div ref={drop} className={`min-h-[200px] p-4 border-2 border-dashed rounded-lg ${isOver ? 'bg-blue-100' : 'bg-white'}`}>
        {elements.map((element) => (
          <FunnelElement
            key={element.id}
            element={element}
            updateElement={updateElement}
            removeElement={removeElement}
          />
        ))}
        {elements.length === 0 && (
          <p className="text-gray-500 text-center">Ziehen Sie Elemente hierher</p>
        )}
      </div>
      <ElementTypes />
    </div>
  );
};

export default FunnelBuilder;