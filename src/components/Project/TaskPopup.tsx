import React, {
  useState,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  useEffect,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

// Interfaces (For type safety)
type ColumnType = "backlog" | "todo" | "doing" | "done" | `column${number}`;

interface Task {
  task_name: string;
  projectID: string;
  task_id: number;
  project_id: number;
  description: string;
  name: string;
  persons: string[];
  status: number;
  progress: number;
  startDate: string;
  finishDate: string;
  column: ColumnType; // Ensure 'column' is a ColumnType
}

interface TaskPopUpProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  task: Task;
  updateTask: (updatedTask: Task) => void;
}

const TaskPopUp: React.FC<TaskPopUpProps> = ({
  isOpen,
  setIsOpen,
  task,
  updateTask,
}) => {
  const [editableTask, setEditableTask] = useState<Task>({ ...task });
  const [personList, setPersonList] = useState<string[]>([]);

  useEffect(() => {
    setPersonList(["Person 1", "Person 2", "Person 3"]); // Replace with actual data
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (name === "persons" && index !== undefined) {
      const newPersons = [...editableTask.persons];
      newPersons[index] = value;
      setEditableTask((prevTask) => ({
        ...prevTask,
        persons: newPersons,
      }));
    } else {
      setEditableTask((prevTask) => ({
        ...prevTask,
        [name]: value,
      }));
    }
  };

  const handlePersonSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value && !editableTask.persons.includes(value)) {
      setEditableTask((prevTask) => ({
        ...prevTask,
        persons: [...prevTask.persons, value],
      }));
    }
  };

  const handlePersonRemove = (index: number) => {
    const newPersons = editableTask.persons.filter((_, i) => i !== index);
    setEditableTask((prevTask) => ({
      ...prevTask,
      persons: newPersons,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/tasks/${editableTask.task_id}`,
        editableTask
      );
      updateTask(response.data); // Update parent state with the updated task
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: 12.5 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-black p-6 rounded-lg w-full max-w-2xl shadow-xl cursor-default relative overflow-hidden"
          >
            {/* Task Form UI */}
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={handleClose}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskPopUp;
