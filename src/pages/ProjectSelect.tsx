// Project.tsx
import React, { useState } from 'react';
import CreateProjectModal from '../components/CreateProjectModal.tsx';
import '../scss/pages/Project.scss';

const Project: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateProject = (name: string) => {
    setItems([...items, name]);
  };

  const handleProjectClick = (name: string) => {
    console.log(`${name} wurde angeklickt`); // Konsolenausgabe

    // Beispiel: Hier könntest du eine Aktion ausführen, die bei einem Klick auf ein Projekt ausgeführt werden soll
    // Zum Beispiel: Navigieren zu einer Projektseite oder Anzeigen von weiteren Details
    setSelectedProject(name);
  };

  const getGridTemplateColumns = () => {
    return 'repeat(3, min-content)';
  };

  return (
    <div className="project">
      <h1 className="title">{items.length > 0 ? (items.length > 1 ? "My Projects" : "My Project") : "Create your project"}</h1>
      <div className="grid-container">
        <div className="grid" style={{ gridTemplateColumns: getGridTemplateColumns() }}>
          {items.length === 0 && (
            <div className="no-projects">
             
            </div>
          )}
          {items.map((item, index) => (
            <div key={index} className="grid-item" onClick={() => handleProjectClick(item)}>
              <div className="inner-grid-item">
                <div className="grid-item-content">Field {index + 1}</div>
                <div className="grid-item-title"><strong>{item}</strong></div>
              </div>
            </div>
          ))}
          <button
            className="grid-item add-button"
            onClick={handleOpenModal}
            title="Create project" // Tooltip für den Button
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
