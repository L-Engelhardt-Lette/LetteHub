import React, { useState } from 'react';

interface EditParticipantsModalProps {
  currentParticipants: string[];
  onSaveParticipants: (participants: string[]) => void;
  onClose: () => void;
}

const EditParticipantsModal: React.FC<EditParticipantsModalProps> = ({
  currentParticipants,
  onSaveParticipants,
  onClose
}) => {
  const [participants, setParticipants] = useState<string[]>(currentParticipants);

  const handleAddParticipant = () => {
    // Hinzufügen eines leeren Feldes für einen neuen Teilnehmer
    setParticipants([...participants, '']);
  };

  const handleRemoveParticipant = (index: number) => {
    // Entfernen eines Teilnehmers basierend auf dem Index
    const updatedParticipants = [...participants];
    updatedParticipants.splice(index, 1);
    setParticipants(updatedParticipants);
  };

  const handleChangeParticipant = (index: number, value: string) => {
    // Ändern eines Teilnehmers basierend auf dem Index
    const updatedParticipants = [...participants];
    updatedParticipants[index] = value;
    setParticipants(updatedParticipants);
  };

  const handleSave = () => {
    onSaveParticipants(participants.filter(p => p.trim() !== ''));
  };

  return (
    <div className="edit-participants-modal">
      <h2>Edit Participants</h2>
      {participants.map((participant, index) => (
        <div key={index}>
          <input
            type="text"
            value={participant}
            onChange={(e) => handleChangeParticipant(index, e.target.value)}
            placeholder="Participant Name"
          />
          <button onClick={() => handleRemoveParticipant(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddParticipant}>Add Participant</button>
      <div className="button-container">
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditParticipantsModal;
