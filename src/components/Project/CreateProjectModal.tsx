import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

type CreateProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (
    name: string,
    description: string,
    startDate: string,
    endDate: string
  ) => void;
};

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onCreateProject,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCreate = () => {
    onCreateProject(name, description, startDate, endDate);
    setName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New Project</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Project Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            rows={3}
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleCreate}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700"
          >
            Create Project
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateProjectModal;
