import { AnimatePresence, motion } from "framer-motion";
import React, { useState, Dispatch, SetStateAction, ChangeEvent } from "react";
import { GoPerson, GoPeople } from "react-icons/go";

// Components
import TaskFinishButton from "../TaskFinishButoon";
import TaskDeleteButton from "../TaskDeleteButton";

// SCSS
import "../../scss/test/TestTaskUi.scss";

// Interfaces (For type safety)
interface Task {
  task_name: string;
  projectID: string;
  task_id: number;
  project_id: number;
  description: string;
  name: string;
  persons: string[]; // Array of person names
  status: number; // Percentage (e.g., 50 for 50%)
  progress: number; // Percentage (e.g., 50 for 50%)
  startDate: string;
  finishDate: string; // In a suitable format
  //column: ColumnType; // Add column to Task type
}

interface TestTaskUiProps {
  task: Task;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => void;
  personList: string[]; // List of all possible persons
  handlePersonSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  handlePersonRemove: (index: number) => void;
}

const TestTaskUi: React.FC<TestTaskUiProps> = ({
  task,
  handleChange,
  personList,
  handlePersonSelect,
  handlePersonRemove,
}) => {
  // Determine the icon based on the number of people (with null check)
  const PersonIcon =
    task.persons && task.persons.length > 1 ? GoPeople : GoPerson;

  return (
    <div className="container taskCard">
      <div className="taskHeader">
        <input
          type="text"
          id="taskName"
          name="name"
          value={task.name}
          onChange={(e) => handleChange(e)}
        />
        <TaskFinishButton onclick={"FINISH"} />
        <TaskDeleteButton onclick={"DELETE"} />
      </div>

      <div id="personsWorkingOn">
        <div>
          <h2>Persons Working on the Task</h2>
        </div>
        <div id="personsWorkingOn-inner">
          <PersonIcon />
          <ul>
            {task.persons.map((person, index) => (
              <li key={index}>
                <input
                  type="text"
                  name="persons"
                  value={person}
                  onChange={(e) => handleChange(e, index)}
                />
                <button type="button" onClick={() => handlePersonRemove(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <select onChange={handlePersonSelect} value="">
            <option value="" disabled>
              Select a person
            </option>
            {personList.map((person, index) => (
              <option key={index} value={person}>
                {person}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div id="taskStatus">
        <h2>Progress of Task</h2>
        <input
          type="number"
          name="progress"
          value={task.progress}
          onChange={(e) => handleChange(e)}
          className="progressBar"
          style={{ width: `${task.progress}%` }}
        />
      </div>

      <div id="taskFinishDate">
        <h2>Date to be Finished</h2>
        <input
          type="date"
          name="finishDate"
          value={task.finishDate}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div id="description">
        <h2>Description</h2>
        <textarea
          name="description"
          value={task.description}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  );
};

const TaskPopUp = ({
  isOpen,
  setIsOpen,
  task,
  updateTask,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  task: Task;
  updateTask: (updatedTask: Task) => void;
}) => {
  const [editableTask, setEditableTask] = useState<Task>(task);
  const personList = ["Person 1", "Person 2", "Person 3"]; // Replace with your actual list

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
    setEditableTask((prevTask) => ({
      ...prevTask,
      persons: [...prevTask.persons, value],
    }));
  };

  const handlePersonRemove = (index: number) => {
    const newPersons = editableTask.persons.filter((_, i) => i !== index);
    setEditableTask((prevTask) => ({
      ...prevTask,
      persons: newPersons,
    }));
  };

  const handleSave = () => {
    updateTask(editableTask);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-black p-6 rounded-lg w-full max-w-2xl shadow-xl cursor-default relative overflow-hidden"
          >
            <TestTaskUi
              task={editableTask}
              handleChange={handleChange}
              personList={personList}
              handlePersonSelect={handlePersonSelect}
              handlePersonRemove={handlePersonRemove}
            />
            <button
              onClick={handleSave}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
              Save
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskPopUp;
