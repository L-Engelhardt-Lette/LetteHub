import React, { useState } from "react";
import "../../scss/Components/Project/ColorChangeButton.scss"; // Ensure this path points to your SCSS file
import { FaPaintBrush } from "react-icons/fa";
import { SketchPicker } from "react-color";

const TooltipButton = ({ currentColor, onColorChange }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [temporaryColor, setTemporaryColor] = useState(currentColor);

  const handleClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleColorChange = (color) => {
    setTemporaryColor(color.hex);
  };

  const handleSave = () => {
    onColorChange(temporaryColor);
    setShowColorPicker(false);
  };

  return (
    <div className="relative TooltipButtonContainer">
      <div className="flex-container" data-tooltip="Color Change">
        <FaPaintBrush id="icon" onClick={handleClick} />
      </div>
      {showColorPicker && (
        <div className="absolute z-20 mt-2">
          <SketchPicker
            color={temporaryColor}
            onChangeComplete={handleColorChange}
          />
          <button
            onClick={handleSave}
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default TooltipButton;
