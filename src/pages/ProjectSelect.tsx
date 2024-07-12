import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateProjectModal from "../components/CreateProjectModal";
import "../scss/pages/ProjectSelect.scss";
import { motion } from "framer-motion";
import { FiTrash2, FiEye } from "react-icons/fi";
import axios from "axios";

type Project = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  participants: string[];
};

const ProjectSelect: React.FC = () => {
  const [items, setItems] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects", {
          withCredentials: true,
        });
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateProject = async (name: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/projects",
        { name },
        { withCredentials: true }
      );

      setItems([...items, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`, {
        withCredentials: true,
      });

      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
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
            {items.map((item) => (
              <motion.div
                key={item.id}
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
