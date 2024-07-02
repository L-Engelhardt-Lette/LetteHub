import React from "react";
import "../../scss/Components/Project/DeleteButton.scss";
import { FaTrash } from "react-icons/fa6";

const TooltipButtonDelete = () => {
  return (
    <div className="TooltipButtonContainerDelete">
      <div className="flex-container" data-tooltip="Delete">
        <FaTrash id="icon" />
      </div>
    </div>
  );
};

export default TooltipButtonDelete;
