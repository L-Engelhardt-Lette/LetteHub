// src/NotFound.jsx

import React from "react";
import { GoCloudOffline } from "react-icons/go";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-10 bg-white rounded-lg shadow-lg"
      >
        <div className="flex justify-center mb-4">
          <GoCloudOffline className="text-6xl text-blue-500" />
        </div>
        <h1 className="text-4xl font-bold mb-2">
          4 <span className="text-blue-500">0</span> 4 Error
        </h1>
        <h2 className="text-2xl text-gray-700 mb-4">Not Found</h2>
        <p className="text-gray-500">
          Oops! It looks like you've stumbled onto a page that doesn't exist.
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;
