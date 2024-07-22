import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiTrash2, FiEye, FiPlusCircle } from "react-icons/fi";
import axios from "axios";

const CreateProjectModal = lazy(
  () => import("../components/Project/CreateProjectModal")
);

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

  const fetchProjects = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/projects", {
        withCredentials: true,
      });
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateProject = async (
    name: string,
    description: string,
    startDate: string,
    endDate: string
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/projects",
        { name, description, startDate, endDate },
        { withCredentials: true }
      );

      setItems((prevItems) => [...prevItems, response.data]);
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

      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div
      className={`project h-screen w-screen flex flex-col items-center justify-center p-4 ${
        items.length > 0 ? "overflow-y-auto" : ""
      }`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="content bg-gray-100 rounded-lg p-5 shadow-lg w-full max-w-4xl"
      >
        <h1 className="title text-3xl font-bold mb-4">
          {items.length > 0
            ? items.length > 1
              ? "My Projects"
              : "My Project"
            : "Create your first project"}
        </h1>
        <div className="grid-container grid gap-5">
          {items.length === 0 && (
            <div className="no-projects text-center p-10 flex flex-col items-center justify-center h-full">
              <p className="text-lg mb-4">No projects found.</p>
              <button
                className="add-project-button bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl hover:bg-blue-700"
                onClick={handleOpenModal}
                title="Create new project"
              >
                <FiPlusCircle className="text-white w-8 h-8" />
              </button>
              <p className="mt-2 text-gray-600">
                Click to create your first project
              </p>
            </div>
          )}
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              className="grid-item bg-white rounded-lg p-5 shadow-lg"
            >
              <div className="inner-grid-item flex flex-col justify-between h-full">
                <div className="grid-item-title font-bold text-lg mb-2">
                  {item.name}
                </div>
                <div className="grid-item-actions flex justify-between mt-4">
                  <button
                    className="grid-item-action-button view-button text-blue-500"
                    onClick={() => navigate(`/project/${item.id}`)}
                    title="View details"
                  >
                    <FiEye className="icon" />
                    View Details
                  </button>
                  <button
                    className="grid-item-action-button delete-button text-red-500"
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
          {items.length > 0 && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="add-project-button-container flex items-center justify-center"
            >
              <button
                className="add-project-button bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl hover:bg-blue-700"
                onClick={handleOpenModal}
                title="Create new project"
              >
                +
              </button>
            </motion.div>
          )}
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <CreateProjectModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onCreateProject={handleCreateProject}
          />
        </Suspense>
      </motion.div>
    </div>
  );
};

export default ProjectSelect;
