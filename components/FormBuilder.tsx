'use client';

import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import QuestionTypes from './QuestionTypes';
import Question from './Question';

const FormBuilder = ({ stepId, stepIndex, questions, updateStep }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'question',
    drop: (item) => addQuestionToStep(item.type),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addQuestionToStep = useCallback((type) => {
    const newQuestion = {
      id: Date.now(),
      type,
      text: `Neue ${type} Frage`,
      options: type === 'multiple_choice' ? ['Option 1', 'Option 2'] : [],
    };
    updateStep(stepId, [...questions, newQuestion]);
  }, [stepId, questions, updateStep]);

  const updateQuestion = useCallback((questionId, updatedQuestion) => {
    const updatedQuestions = questions.map(q =>
      q.id === questionId ? updatedQuestion : q
    );
    updateStep(stepId, updatedQuestions);
  }, [stepId, questions, updateStep]);

  const removeQuestion = useCallback((questionId) => {
    const updatedQuestions = questions.filter(q => q.id !== questionId);
    updateStep(stepId, updatedQuestions);
  }, [stepId, questions, updateStep]);

  return (
    <div className="mb-8 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold mb-4">Schritt {stepIndex + 1}</h3>
      <div ref={drop} className={`min-h-[100px] p-4 border-2 border-dashed rounded-lg ${isOver ? 'bg-blue-100' : 'bg-white'}`}>
        {questions.map((question) => (
          <Question
            key={question.id}
            question={question}
            updateQuestion={updateQuestion}
            removeQuestion={removeQuestion}
          />
        ))}
        {questions.length === 0 && (
          <p className="text-gray-500 text-center">Ziehen Sie Fragetypen hierher</p>
        )}
      </div>
      <QuestionTypes />
    </div>
  );
};

export default FormBuilder;