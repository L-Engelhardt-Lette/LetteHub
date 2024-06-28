// Project.tsx
import React, { useState } from 'react';
import CreateProjectModal from './CreateProjectModal.tsx';
import '../scss/pages/Project.scss';

const Project: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateProject = (name: string) => {
    setItems([...items, name]);
    setIsModalOpen(false); // Close modal after creating project
  };

  return (
    <div className="project">
      <h1 className="title">
        {items.length > 0
          ? items.length > 1
            ? "My Projects"
            : "My Project"
          : "Create your first project"}
      </h1>
      <div className="grid-container">
        <div className="grid">
          {items.length === 0 && (
            <div className="no-projects">
             
            </div>
          )}
          {items.map((item, index) => (
            <div key={index} className="grid-item">
              <div className="inner-grid-item">
                <div className="grid-item-content">Field {index + 1}</div>
                <div className="grid-item-title">
                  <strong>{item}</strong>
                </div>
                <button
                  className="grid-item-action-button"
                  onClick={() => console.log(`Button clicked for project: ${item}`)}
                  title="Action button"
                >
                  Action
                </button>
              </div>
            </div>
          ))}
          <button
            className="add-project-button"
            onClick={handleOpenModal}
            title="Create new project"
          >
            +
          </button>
        </div>
      </div>
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
};

export default Project;
