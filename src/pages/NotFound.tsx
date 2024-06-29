// src/NotFound.tsx

import React from "react";
import "../scss/pages/NotFound.scss";
import { GoCloudOffline } from "react-icons/go";

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <div id="container">
        <div id="title-container">
          <GoCloudOffline id="icon" />
          <h1 id="title">
            4 <span id="zero">0</span> 4 Error
          </h1>
        </div>
        <h2 id="undertitle">Not Found</h2>
        <p id="text">
          Oops! It looks like you've stumbled onto a page that doesn't exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
