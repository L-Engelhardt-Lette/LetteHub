import React from "react";
import { GoPerson, GoPeople } from "react-icons/go";

//Components
import TaskFinishButton from "../TaskFinishButoon";
import TaskDeleteButton from "../TaskDeleteButton";

// SCSS
import "../../scss/test/TestTaskUi.scss";

// Interfaces (For type safety)
interface Task {
  name: string;
  persons: string[]; // Array of person names
  progress: number; // Percentage (e.g., 50 for 50%)
  finishDate: string; // In a suitable format
  description: string;
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
        <TaskFinishButton />
        <TaskDeleteButton />
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

export default TestTaskUi;
