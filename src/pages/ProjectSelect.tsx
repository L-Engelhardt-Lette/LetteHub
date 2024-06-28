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
  };

  const getGridTemplateColumns = () => {
    return 'repeat(3, min-content)';
  };

  return (
    <div className="project">
      <h1 className="title">
        {items.length > 0 ? (items.length > 1 ? 'My Projects' : 'My Project') : 'Create your project'}
      </h1>
      <div className="grid-container">
        <div className="grid" style={{ gridTemplateColumns: getGridTemplateColumns() }}>
          {items.map((item, index) => (
            <div key={index} className="grid-item">
              <div className="inner-grid-item">
                <div className="grid-item-content">Field {index + 1}</div>
                <div className="grid-item-title">
                  <strong>{item}</strong>
                </div>
              </div>
            </div>
          ))}
          <button className="grid-item add-button" onClick={handleOpenModal} title="Create project">
            +
          </button>
        </div>
      </div>
      <CreateProjectModal isOpen={isModalOpen} onClose={handleCloseModal} onCreateProject={handleCreateProject} />
    </div>
  );
};

export default Project;
