import React from "react";
import "../scss/Colors.scss";
import "../scss/Components/DarkLightModeSwitch.scss"; // Assuming your switch SCSS is in a Components subdirectory

const DarkLightModeSwitch = () => {
  return (
    <div className="switch">
      {" "}
      <label htmlFor="switch">
        <input type="checkbox" id="switch" /> <span className="slider"></span>
      </label>
    </div>
  );
};

export default DarkLightModeSwitch;
