import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../scss/Components/WebsiteHeader.scss";
import DarkLightModeSwitch from "./DarkLightModeSwitch";
import HeaderUserIcon from "./HeaderUserIcon";

const WebsiteHeader: React.FC = () => {
  const navigate = useNavigate();

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
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/projectSelect">Project</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div id="HeaderRightContent">
        <div className="Content">
          <button onClick={handleLoginClick} className="user-icon-button">
            <HeaderUserIcon />
          </button>
        </div>
        <div className="Content">
          <DarkLightModeSwitch />
        </div>
      </div>
    </header>
  );
};

export default WebsiteHeader;
