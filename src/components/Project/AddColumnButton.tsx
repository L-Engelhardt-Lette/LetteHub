import React from "react";
import { FaPlus } from "react-icons/fa6";
import "../../scss/Components/Project/AddColumnButton.scss";

const ColumnAddButton = () => {
  return (
    <>
      <div className="TooltipButtonContainerAdd">
        <div className="flex-container" data-tooltip="Add New Column">
          <FaPlus id="icon" />
        </div>
      </div>
    </>
  );
};

export default ColumnAddButton;
