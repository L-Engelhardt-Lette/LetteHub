import React from "react";
import "../../scss/Components/Project/ColorChangeButton.scss"; // Ensure this path points to your SCSS file
import { FaPaintbrush } from "react-icons/fa6";

const TooltipButton = () => {
  return (
    <div className="TooltipButtonContainer">
      <div className="flex-container" data-tooltip="Color Change">
        <FaPaintbrush id="icon" />
      </div>
    </div>
  );
};

export default TooltipButton;
