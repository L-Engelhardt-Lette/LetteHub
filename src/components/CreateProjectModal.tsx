import React, { useState } from 'react';
import '../scss/Components/CreateProjectModal.scss';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (name: string) => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ isOpen, onClose, onCreateProject }) => {
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState<string>('');

  const handleCreate = () => {
    if (projectName.trim()) {
      onCreateProject(projectName);
      setProjectName('');
      onClose();
    } else {
      setError('Project name cannot be empty');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
    if (error && e.target.value.trim() !== '') {
      setError('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create Project</h2>
        <input
          type="text"
          value={projectName}
          onChange={handleInputChange}
          placeholder="Project Name"
        />
        {error && <p className="error-message">{error}</p>}
        <div className="button-container">
          <button className="create-button" onClick={handleCreate}>
            Create
          </button>
          <button className="cancel-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
