import React, { useState } from 'react';

interface ChangeNameFormProps {
  currentName: string;
  sessionId: string;
  onChangeName: (newName: string) => void;
}

const ChangeNameForm: React.FC<ChangeNameFormProps> = ({ currentName, sessionId, onChangeName }) => {
  const [newName, setNewName] = useState(currentName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim() && newName !== currentName) {
      onChangeName(newName.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{  position: 'fixed',
        top: 50,
        right: 400,
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '8px 12px',
        borderRadius: 6,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        zIndex: 1000,  // 다른 요소 위에 표시되게
     }}>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Enter new name"
        style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button type="submit" style={{ padding: '6px 12px', cursor: 'pointer' }}>
        Change Name
      </button>
    </form>
  );
};

export default ChangeNameForm;
