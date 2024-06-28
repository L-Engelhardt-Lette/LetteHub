// Project.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateProjectModal from "../components/CreateProjectModal";
import "../scss/pages/Project.scss";

const Project: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const navigate = useNavigate();

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
    navigate(`/project/${encodeURIComponent(name)}`);
  };

  const getGridTemplateColumns = () => {
    return "repeat(3, min-content)";
  };

  return (
    <div className="project">
      <h1 className="title">
        {items.length > 0
          ? items.length > 1
            ? "My Projects"
            : "My Project"
          : "Create your project"}
      </h1>
      <div className="grid-container">
        <div
          className="grid"
          style={{ gridTemplateColumns: getGridTemplateColumns() }}
        >
          {items.length === 0 && (
            <div className="no-projects">
              {/* Hier könnte eine Nachricht angezeigt werden, wenn keine Projekte vorhanden sind */}
            </div>
          )}
          {items.map((item, index) => (
            <div
              key={index}
              className="grid-item"
              onClick={() => handleProjectClick(item)}
            >
              <div className="inner-grid-item">
                <div className="grid-item-content">Field {index + 1}</div>
                <div className="grid-item-title">
                  <strong>{item}</strong>
                </div>
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
    </div>
  );
};

export default Project;
