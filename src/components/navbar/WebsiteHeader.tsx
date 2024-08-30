import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAvatar from "../User/UserAvatar";

const publicTabs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Impressum", path: "/impressum" },
];

const privateTabs = [{ name: "Project", path: "/projectSelect" }];

const WebsiteHeader: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selected, setSelected] = useState("Home");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("token") !== null;
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="p-4 flex flex-wrap justify-between items-center">
        <h1 className="text-primary dark:text-primary-light font-bold text-2xl">
          <Link to="/" id="HeaderTitle">
            LetteHub
          </Link>
        </h1>
        <div className="flex flex-wrap justify-center space-x-2 md:space-x-4 mt-2 md:mt-0">
          {publicTabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => {
                setSelected(tab.name);
                navigate(tab.path);
              }}
              className={`${
                selected === tab.name
                  ? "text-gray-800 dark:text-primary-light"
                  : "text-gray-600 dark:text-gray-400 hover:text-primary-light"
              } text-base transition-colors px-3 py-1 rounded-md relative`}
            >
              {tab.name}
            </button>
          ))}
          {isLoggedIn &&
            privateTabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => {
                  setSelected(tab.name);
                  navigate(tab.path);
                }}
                className={`${
                  selected === tab.name
                    ? "text-gray-800 dark:text-primary-light"
                    : "text-gray-600 dark:text-gray-400 hover:text-primary-light"
                } text-base transition-colors px-3 py-1 rounded-md relative`}
              >
                {tab.name}
              </button>
            ))}
        </div>
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleLogoutClick}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
              <button onClick={handleLoginClick} className="user-icon-button">
                <UserAvatar loggedIn={isLoggedIn} />
              </button>
            </>
          ) : (
            <button onClick={handleLoginClick} className="user-icon-button">
              <UserAvatar loggedIn={isLoggedIn} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default WebsiteHeader;
