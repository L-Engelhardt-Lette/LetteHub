// src/App.tsx
import React, { useState, useEffect } from "react";
import "./scss/App.scss";
import WebsiteHeader from "./components/WebsiteHeader";
import Loader from "./components/Loader";
import "./styles.scss";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return <>{loading ? <Loader /> : <WebsiteHeader />}</>;
};

export default App;
