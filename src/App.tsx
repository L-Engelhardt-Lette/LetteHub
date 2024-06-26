import React, { useState } from "react";
import "./css/App.css";
import WebsiteHeader from "./components/WebsiteHeader.tsx"; // Passe den Pfad entsprechend deiner Ordnerstruktur an

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <WebsiteHeader />
      
      {/* Hier kannst du andere Inhalte deiner App hinzufügen */}
    </>
  );
}

export default App;
