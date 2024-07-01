import React, { useState } from 'react';
import '../scss/Components/CreateProjectModal.scss';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (name: string, startDate: string, endDate: string) => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ isOpen, onClose, onCreateProject }) => {
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState<string>('');

  const handleCreate = () => {
    if (projectName.trim() && startDate.trim() && endDate.trim()) {
      onCreateProject(projectName, startDate, endDate);
      setProjectName('');
      setStartDate('');
      setEndDate('');
      onClose();
    } else {
      setError('Please fill out all fields');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'projectName') {
      setProjectName(value);
    } else if (name === 'startDate') {
      setStartDate(value);
    } else if (name === 'endDate') {
      setEndDate(value);
    }
    if (error && value.trim() !== '') {
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
          name="projectName"
          value={projectName}
          onChange={handleInputChange}
          placeholder="Project Name"
        />
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={handleInputChange}
          placeholder="Start Date"
        />
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={handleInputChange}
          placeholder="End Date"
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
