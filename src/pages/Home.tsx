import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold">Home Page</h1>
        <Link to="/login" className="mt-4 bg-blue-500 text-white px-4 py-2">
          Login
        </Link>
      </div>
    </>
  );
};

export default Home;
