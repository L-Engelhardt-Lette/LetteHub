import React, { useState, useEffect } from "react";
import "../scss/Colors.scss";
import "../scss/Components/DarkLightModeSwitch.scss";

const DarkLightModeSwitch: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "light";
    setIsDarkMode(currentTheme === "dark");
    document.body.classList.toggle("dark-mode", currentTheme === "dark");
  }, []);

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="switch">
      <label htmlFor="switch">
        <input
          type="checkbox"
          id="switch"
          checked={isDarkMode}
          onChange={toggleDarkMode}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default DarkLightModeSwitch;
