import React, {
  useState,
  useEffect,
  useCallback,
  lazy,
  Suspense,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiTrash2, FiEye, FiPlusCircle } from "react-icons/fi";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/loader/Loader";
import SpringModal from "../../components/project/ProjectCreateModal";

// Lazy load CreateProjectModal
const CreateProjectModal = lazy(
  () => import("../../components/project/CreateProjectModal")
);

// Define the Project type
type Project = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  participants: string[];
};

const API_BASE_URL =
  import.meta.env.VITE_API_SERVER_URL || "http://localhost:8080";

// Custom Hook for Project Management
const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Fetch projects from the API
  const fetchProjects = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/project`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
        withCredentials: true, // Ensure credentials (cookies) are sent
      });
      setProjects(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Delete a project by ID
  const deleteProject = async (id: string | undefined) => {
    if (!id || !token) {
      console.error(
        "Error: Project ID is undefined or user is not authenticated"
      );
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
        withCredentials: true,
      });
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      );
    } catch (error) {
      console.error("Error deleting the project:", error);
    }
  };

  // Create a new project
  const createProject = async (
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    closeModal: () => void
  ) => {
    if (!token) {
      console.error("Error: User is not authenticated");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/projects`,
        { name, description, startDate, endDate },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
          withCredentials: true,
        }
      );
      setProjects((prevProjects) => [...prevProjects, response.data]);
      closeModal(); // Close modal after creating project
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  // Check authentication and fetch projects
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      fetchProjects();
    }
  }, [isAuthenticated, fetchProjects, navigate]);

  return { projects, createProject, deleteProject, loading };
};

// Main Component for Project Selection
const ProjectSelect: React.FC = () => {
  const { projects, createProject, deleteProject, loading } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Open and close modal handlers
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Determine grid column count based on project count
  const gridCols = useMemo(() => {
    if (projects.length === 1) return "grid-cols-1";
    if (projects.length === 2) return "grid-cols-2";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  }, [projects.length]);

  // Empty state component
  const emptyState = useMemo(
    () => (
      <div className="flex flex-col justify-center items-center h-full text-gray-500">
        <p className="italic text-lg mb-4">No projects found.</p>
        <button
          className="add-project-button bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl hover:bg-blue-700 transition transform hover:translate-y-1"
          onClick={handleOpenModal}
          title="Create new project"
        >
          <FiPlusCircle className="text-white w-8 h-8" />
        </button>
        <p className="mt-2 text-gray-600">Click to create your first project</p>
      </div>
    ),
    [handleOpenModal]
  );

  // Project cards
  const projectCards = useMemo(
    () =>
      projects.map((project) => (
        <motion.div
          key={project.id} // Ensure that key is present
          whileHover={{ scale: 1.05 }}
          className="grid-item p-6 border-2 border-gray-300 rounded-xl bg-gray-200 shadow-lg transition transform hover:translate-y-1 w-72 h-72 flex flex-col items-center justify-center"
        >
          <div className="inner-grid-item flex flex-col justify-between h-full text-center">
            <div className="grid-item-title text-2xl font-bold text-black mb-4">
              {project.name}
            </div>
            <div className="grid-item-actions flex justify-between mt-4 w-full">
              <button
                className="grid-item-action-button view-button bg-green-500 text-white rounded-md py-2 px-4 flex items-center justify-center transition hover:bg-green-600 w-1/2"
                onClick={() => navigate(`/project/${project.id}`)}
                title="View details"
              >
                <FiEye className="icon mr-2 text-lg" />
                View Details
              </button>
              <button
                className="grid-item-action-button delete-button bg-red-500 text-white rounded-md py-2 px-4 flex items-center justify-center transition hover:bg-red-600 w-1/2"
                onClick={() => deleteProject(project.id)} // Ensure project.id is passed
                title="Delete project"
              >
                <FiTrash2 className="icon mr-2 text-lg" />
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      )),
    [projects, deleteProject, navigate]
  );

  // Loading state
  if (loading) {
    return (
      <>
        <Loader />
        <div>Loading projects...</div>;
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 bg-backgroundlight dark:bg-backgrounddark">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="title text-4xl font-bold mt-24 mb-16 text-center text-black"
      >
        {projects.length > 0
          ? projects.length > 1
            ? "My Projects"
            : "My Project"
          : "Create your first project"}
      </motion.h1>
      <div className="grid-container flex-grow flex justify-center items-start w-full">
        <div className={`grid gap-5 ${gridCols}`}>
          {/* Render an empty div as a placeholder when there are no projects */}
          {projects.length === 0 && <div className="w-72 h-72"></div>}

          {projects.length === 0 ? emptyState : projectCards}

          {projects.length > 0 && (
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
      <Suspense fallback={<Loader />}>
        <CreateProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onCreateProject={(name, description, startDate, endDate) =>
            createProject(
              name,
              description,
              startDate,
              endDate,
              handleCloseModal
            )
          }
        />
        <SpringModal isOpen={isModalOpen} setIsOpen={handleCloseModal} />
      </Suspense>
    </div>
  );
};

export default React.memo(ProjectSelect);
