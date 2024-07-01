// src/pages/ProjectSelect.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateProjectModal from '../components/CreateProjectModal';
import '../scss/pages/ProjectSelect.scss';

// Mock data as an example. Replace this with your actual data source or API call.
const projects = [
  {
    id: '1',
    name: 'Project Alpha',
  },
  {
    id: '2',
    name: 'Project Beta',
  },
  // Weitere Projekte hier hinzufügen
];

const ProjectSelect: React.FC = () => {
  const [items, setItems] = useState(projects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateProject = (name: string) => {
    const newProject = {
      id: (items.length + 1).toString(),
      name,
    };
    setItems([...items, newProject]);
    setIsModalOpen(false);
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
              <p>No projects found.</p>
            </div>
          )}
          {items.map((item, index) => (
            <div key={index} className="grid-item">
              <div className="inner-grid-item">
                <div className="grid-item-content">Field {index + 1}</div>
                <div className="grid-item-title">
                  <strong>{item.name}</strong>
                </div>
                <button
                  className="grid-item-action-button"
                  onClick={() => navigate(`/project/${item.id}`)}
                  title="Action button"
                >
                  View Details
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

export default ProjectSelect;
