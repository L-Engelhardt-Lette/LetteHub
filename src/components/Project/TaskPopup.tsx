import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Dispatch, SetStateAction } from "react";
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
}

interface TestTaskUiProps {
  task: Task;
}

const TestTaskUi: React.FC<TestTaskUiProps> = ({ task }) => {
  // Determine the icon based on the number of people (with null check)
  const PersonIcon =
    task.persons && task.persons.length > 1 ? GoPeople : GoPerson;

  return (
    <div className="container taskCard">
      <div className="taskHeader">
        <h1 id="taskName">{task.name}</h1>
        <TaskFinishButton onclick={"FINISH"} />
        <TaskDeleteButton onclick={"DELETE"} />
      </div>

      <div id="personsWorkingOn">
        <div>
          <h2>Person Working on the Task</h2>
        </div>
        <div id="personsWorkingOn-inner">
          <PersonIcon />
          <ul>
            {task.persons.map((person, index) => (
              <li key={index}>{person}</li>
            ))}
          </ul>
        </div>
      </div>

      <div id="taskStatus">
        <h2>Progress of Task</h2>
        <div
          className="progressBar"
          style={{ width: `${task.progress}%` }}
        ></div>
      </div>

      <div id="taskFinishDate">
        <h2>Date to be Finished</h2>
        <p id="date">{task.finishDate}</p>
      </div>

      <div id="desciption">
        <h2>Description</h2>
        <p>{task.description}</p>
      </div>
    </div>
  );
};

const TaskPopUp = ({
  isOpen,
  setIsOpen,
  task,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  task: Task;
}) => {
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
            className="bg-black p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <TestTaskUi task={task} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskPopUp;
