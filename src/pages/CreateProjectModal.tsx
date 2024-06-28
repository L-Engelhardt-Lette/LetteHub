// CreateProjectModal.tsx
import React, { useState, useEffect } from 'react';
import '../scss/Components/CreateProjectModal.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (name: string) => void;
}

const CreateProjectModal: React.FC<Props> = ({ isOpen, onClose, onCreateProject }) => {
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!isOpen) {
      // Reset input and error when modal is closed
      setProjectName('');
      setError('');
    }
  }, [isOpen]);

  const handleCreateProject = () => {
    if (projectName.trim() === '') {
      setError('Project name cannot be empty');
      return;
    }

    onCreateProject(projectName);
    setProjectName('');
    setError('');
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
    if (error && e.target.value.trim() !== '') {
      setError('');
    }
  };

  const handleCancel = () => {
    setProjectName(''); // Clear input field on cancel
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <h2>Enter Project Name</h2>
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={handleInputChange}
          />
          {error && <p className="error-message">{error}</p>}
          <div className="button-container">
            <button className="create-button" onClick={handleCreateProject}>
              Create Project
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
