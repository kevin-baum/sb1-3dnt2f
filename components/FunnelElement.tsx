'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const FunnelElement = ({ element, updateElement, removeElement }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedElement, setEditedElement] = useState(element);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateElement(element.id, editedElement);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedElement(element);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedElement({ ...editedElement, [name]: value });
  };

  const renderEditForm = () => {
    switch (element.type) {
      case 'heading':
      case 'paragraph':
        return (
          <Textarea
            name="content"
            value={editedElement.content}
            onChange={handleChange}
            className="mb-2"
          />
        );
      case 'image':
        return (
          <Input
            type="text"
            name="content"
            value={editedElement.content}
            onChange={handleChange}
            placeholder="Bild-URL"
            className="mb-2"
          />
        );
      case 'button':
        return (
          <>
            <Input
              type="text"
              name="content"
              value={editedElement.content}
              onChange={handleChange}
              placeholder="Button-Text"
              className="mb-2"
            />
            <Input
              type="text"
              name="link"
              value={editedElement.link || ''}
              onChange={handleChange}
              placeholder="Button-Link"
              className="mb-2"
            />
          </>
        );
      case 'input':
        return (
          <Input
            type="text"
            name="placeholder"
            value={editedElement.placeholder || ''}
            onChange={handleChange}
            placeholder="Platzhaltertext"
            className="mb-2"
          />
        );
      default:
        return null;
    }
  };

  const renderElement = () => {
    switch (element.type) {
      case 'heading':
        return <h2 className="text-2xl font-bold">{element.content}</h2>;
      case 'paragraph':
        return <p>{element.content}</p>;
      case 'image':
        return <img src={element.content} alt="Funnel element" className="max-w-full h-auto" />;
      case 'button':
        return <Button>{element.content}</Button>;
      case 'input':
        return <Input type="text" placeholder={element.placeholder || 'Eingabe'} />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-4 p-4 bg-white border rounded-lg">
      {isEditing ? (
        <>
          {renderEditForm()}
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
          {renderElement()}
          <div className="flex justify-end space-x-2 mt-2">
            <Button onClick={handleEdit} variant="outline" size="sm">
              Bearbeiten
            </Button>
            <Button onClick={() => removeElement(element.id)} variant="destructive" size="sm">
              Entfernen
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default FunnelElement;