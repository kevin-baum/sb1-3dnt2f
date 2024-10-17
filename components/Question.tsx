'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Question = ({ question, updateQuestion, removeQuestion }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(question);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateQuestion(question.id, editedQuestion);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedQuestion(question);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedQuestion({ ...editedQuestion, [name]: value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...editedQuestion.options];
    newOptions[index] = value;
    setEditedQuestion({ ...editedQuestion, options: newOptions });
  };

  const addOption = () => {
    setEditedQuestion({
      ...editedQuestion,
      options: [...editedQuestion.options, `Option ${editedQuestion.options.length + 1}`],
    });
  };

  const removeOption = (index) => {
    const newOptions = editedQuestion.options.filter((_, i) => i !== index);
    setEditedQuestion({ ...editedQuestion, options: newOptions });
  };

  return (
    <div className="mb-4 p-4 bg-white border rounded-lg">
      {isEditing ? (
        <>
          <Input
            type="text"
            name="text"
            value={editedQuestion.text}
            onChange={handleChange}
            className="mb-2"
          />
          {editedQuestion.type === 'multiple_choice' && (
            <div className="mb-2">
              {editedQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="mr-2"
                  />
                  <Button onClick={() => removeOption(index)} variant="destructive" size="sm">
                    Entfernen
                  </Button>
                </div>
              ))}
              <Button onClick={addOption} variant="outline" size="sm">
                Option hinzufügen
              </Button>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button onClick={handleSave} variant="default" size="sm">
              Speichern
            </Button>
            <Button onClick={handleCancel} variant="outline" size="sm">
              Abbrechen
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="font-semibold">{question.text}</p>
          {question.type === 'multiple_choice' && (
            <ul className="list-disc list-inside mt-2">
              {question.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          )}
          <div className="flex justify-end space-x-2 mt-2">
            <Button onClick={handleEdit} variant="outline" size="sm">
              Bearbeiten
            </Button>
            <Button onClick={() => removeQuestion(question.id)} variant="destructive" size="sm">
              Entfernen
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Question;