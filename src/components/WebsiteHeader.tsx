import React from "react";
import { Link } from "react-router-dom";
import "../scss/Components/WebsiteHeader.scss";
import DarkLightModeSwitch from "./DarkLightModeSwitch";

const WebsiteHeader: React.FC = () => {
  return (
    <header className="website-header">
      <div className="logo">
        <h1>
          <Link to="/" id="HeaderTitle">
            LetteHub
          </Link>
        </h1>
        <div className="logo-divider"></div>
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
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <DarkLightModeSwitch></DarkLightModeSwitch>
    </header>
  );
};

export default WebsiteHeader;
