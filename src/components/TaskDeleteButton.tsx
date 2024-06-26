import React from "react";
import { FaTrashCan } from "react-icons/fa6";

const TaskDeleteButton = ({ onclick }) => {
  return (
    <button>
      <FaTrashCan />
    </button>
  );
};

export default TaskDeleteButton;
