import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAvatar from "../User/UserAvatar";

const tabs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Project", path: "/projectSelect" },
  { name: "Impressum", path: "/impressum" },
];

const WebsiteHeader: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selected, setSelected] = useState(tabs[0].name);
  const navigate = useNavigate();

  // Simple effect to check login status without fetching
  useEffect(() => {
    const loggedIn = localStorage.getItem("token") !== null;
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <header className="bg-backgroundlight dark:bg-backgrounddark text-foregroundlight dark:text-foregrounddark">
      <div className="p-4 flex flex-wrap justify-between items-center">
        <h1 className="text-primary dark:text-primary-light font-bold text-2xl">
          <Link to="/" id="HeaderTitle">
            LetteHub
          </Link>
        </h1>
        <div className="flex flex-wrap justify-center space-x-2 md:space-x-4 mt-2 md:mt-0">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => {
                setSelected(tab.name);
                navigate(tab.path);
              }}
              className={`${
                selected === tab.name
                  ? "text-foregroundlight dark:text-primary-light"
                  : "text-foregroundlight dark:text-foregrounddark hover:text-primary-light"
              } text-base transition-colors px-3 py-1 rounded-md relative`}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          <button onClick={handleLoginClick} className="user-icon-button">
            <UserAvatar loggedIn={isLoggedIn} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default WebsiteHeader;
