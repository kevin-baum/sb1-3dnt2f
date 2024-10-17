'use client';

import { useDrag } from 'react-dnd';

const questionTypes = [
  { type: 'text', label: 'Text' },
  { type: 'number', label: 'Zahl' },
  { type: 'multiple_choice', label: 'Multiple Choice' },
];

const QuestionType = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'question',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 mb-2 bg-white border rounded cursor-move ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {label}
    </div>
  );
};

const QuestionTypes = () => {
  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold mb-2">Fragetypen</h4>
      {questionTypes.map((qt) => (
        <QuestionType key={qt.type} type={qt.type} label={qt.label} />
      ))}
    </div>
  );
};

export default QuestionTypes;