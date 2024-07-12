import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateProjectModal from "../components/CreateProjectModal";
import "../scss/pages/ProjectSelect.scss";
import { motion } from "framer-motion";
import { FiTrash2, FiEye } from "react-icons/fi";

const projects = [
  {
    id: "1",
    name: "Project Alpha",
  },
  {
    id: "2",
    name: "Project Beta",
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

  const handleDeleteProject = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="project">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="content"
      >
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
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="grid-item"
              >
                <div className="inner-grid-item">
                  <div className="grid-item-title">
                    <strong>{item.name}</strong>
                  </div>
                  <div className="grid-item-actions">
                    <button
                      className="grid-item-action-button view-button"
                      onClick={() => navigate(`/project/${item.id}`)}
                      title="View details"
                    >
                      <FiEye className="icon" />
                      View Details
                    </button>
                    <button
                      className="grid-item-action-button delete-button"
                      onClick={() => handleDeleteProject(item.id)}
                      title="Delete project"
                    >
                      <FiTrash2 className="icon" />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`add-project-button-container ${
                items.length === 0 ? "empty" : ""
              }`}
            >
              <button
                className="add-project-button"
                onClick={handleOpenModal}
                title="Create new project"
              >
                +
              </button>
            </motion.div>
          </div>
        </div>
        <CreateProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onCreateProject={handleCreateProject}
        />
      </motion.div>
    </div>
  );
};

export default ProjectSelect;
