import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../scss/Components/WebsiteHeader.scss";

import UserAvatar from "./User/UserAvatar";

const WebsiteHeader: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("/api/check-login");
        const data = await response.json();
        setIsLoggedIn(data.loggedIn);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <header className="website-header">
      <div className="logo">
        <h1>
          <Link to="/" id="HeaderTitle">
            LetteHub
          </Link>
        </h1>
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/projectSelect">Project</Link>
          </li>
          <li>
            <Link to="/impressum">Impressum</Link>
          </li>
        </ul>
      </nav>
      <div id="HeaderRightContent">
        <div className="Content">
          {isLoggedIn ? (
            <button onClick={handleLoginClick} className="user-icon-button">
              <UserAvatar loggedIn={true} />
            </button>
          ) : (
            <button onClick={handleLoginClick} className="user-icon-button">
              <UserAvatar loggedIn={false} />
            </button>
          )}
        </div>
        <div className="Content">{/*<DarkLightModeSwitch /> */}</div>
      </div>
    </header>
  );
};

export default WebsiteHeader;
