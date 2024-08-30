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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/projects", {
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
        "http://localhost:3001/api/projects",
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
      await axios.delete(`http://localhost:3001/api/projects/${id}`, {
        withCredentials: true,
      });

      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="project max-w-7xl mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="title text-4xl font-bold mt-24 mb-16 text-center text-black"
      >
        {items.length > 0
          ? items.length > 1
            ? "My Projects"
            : "My Project"
          : "Create your first project"}
      </motion.h1>
      <div className="grid-container flex justify-center items-start">
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.length === 0 && (
            <div className="no-projects text-center p-10 flex flex-col items-center justify-center h-full text-gray-500">
              <p className="italic text-lg mb-4">No projects found.</p>
              <button
                className="add-project-button bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl hover:bg-blue-700 transition transform hover:translate-y-1"
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
              className="grid-item p-6 border-2 border-gray-300 rounded-xl bg-gray-200 shadow-lg transition transform hover:translate-y-1 w-72 h-72 flex flex-col items-center justify-center"
            >
              <div className="inner-grid-item flex flex-col justify-between h-full text-center">
                <div className="grid-item-title text-2xl font-bold text-black mb-4">
                  {item.name}
                </div>
                <div className="grid-item-actions flex justify-between mt-4 w-full">
                  <button
                    className="grid-item-action-button view-button bg-green-500 text-white rounded-md py-2 px-4 flex items-center justify-center transition hover:bg-green-600 w-1/2"
                    onClick={() => navigate(`/project/${item.id}`)}
                    title="View details"
                  >
                    <FiEye className="icon mr-2 text-lg" />
                    View Details
                  </button>
                  <button
                    className="grid-item-action-button delete-button bg-red-500 text-white rounded-md py-2 px-4 flex items-center justify-center transition hover:bg-red-600 w-1/2"
                    onClick={() => handleDeleteProject(item.id)}
                    title="Delete project"
                  >
                    <FiTrash2 className="icon mr-2 text-lg" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          {items.length > 0 && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="add-project-button-container flex items-center justify-center w-72 h-72 bg-blue-500 rounded-xl shadow-lg transition transform hover:translate-y-1"
            >
              <button
                className="add-project-button text-white text-4xl w-16 h-16 rounded-full transition hover:bg-gray-200 hover:text-blue-800 transform hover:translate-y-1"
                onClick={handleOpenModal}
                title="Create new project"
              >
                +
              </button>
            </motion.div>
          )}
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <CreateProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onCreateProject={handleCreateProject}
        />
      </Suspense>
    </div>
  );
};

export default ProjectSelect;
