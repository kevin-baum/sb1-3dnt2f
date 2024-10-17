'use client';

import { useDrag } from 'react-dnd';

const elementTypes = [
  { type: 'heading', label: 'Überschrift' },
  { type: 'paragraph', label: 'Textabsatz' },
  { type: 'image', label: 'Bild' },
  { type: 'button', label: 'Button' },
  { type: 'input', label: 'Eingabefeld' },
];

const ElementType = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'element',
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

const ElementTypes = () => {
  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold mb-2">Elementtypen</h4>
      {elementTypes.map((et) => (
        <ElementType key={et.type} type={et.type} label={et.label} />
      ))}
    </div>
  );
};

export default ElementTypes;