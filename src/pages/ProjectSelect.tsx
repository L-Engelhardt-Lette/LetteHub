import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateProjectModal from "../components/CreateProjectModal";
import "../scss/pages/ProjectSelect.scss";
import { motion, useInView } from "framer-motion";
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
    <div className="project relative mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen bg-background-dark text-foreground-dark p-8"
      >
        <h1 className="title text-3xl font-UnageoBold text-primary-content">
          {items.length > 0
            ? items.length > 1
              ? "My Projects"
              : "My Project"
            : "Create your first project"}
        </h1>
        <div className="grid-container mt-8">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {items.length === 0 && (
              <div className="no-projects col-span-full text-center text-secondary-content">
                <p>No projects found.</p>
              </div>
            )}
            {items.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="grid-item bg-primary-light bg-opacity-75 rounded-lg shadow-md p-4"
              >
                <div className="inner-grid-item ">
                  <div className="grid-item-title mt-2 text-lg font-UnageoBold text-primary-content">
                    <strong>{item.name}</strong>
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      className="grid-item-delete-button bg-green-500 text-white px-4 py-2 rounded font-UnageoRegular flex items-center justify-center w-full sm:w-auto"
                      onClick={() => navigate(`/project/${item.id}`)}
                      title="View details"
                    >
                      <FiEye className="mr-2" />
                      View Details
                    </button>
                    <button
                      className="grid-item-delete-button bg-red-500 text-white px-4 py-2 rounded font-UnageoRegular flex items-center justify-center w-full sm:w-auto"
                      onClick={() => handleDeleteProject(item.id)}
                      title="Delete project"
                    >
                      <FiTrash2 className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="add-project-button-container flex justify-center items-center bg-primary-light bg-opacity-75 rounded-lg shadow-md"
            >
              <button
                className="add-project-button bg-secondary text-white px-4 py-2 rounded-full font-UnageoBold"
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
